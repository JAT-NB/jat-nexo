// Native REST client. Only the public publishable key belongs in this file.
const BASE='https://xwdqzuxwlqxbgkzwjakd.supabase.co';
const KEY='sb_publishable_bCdK7kJXagxLbWxTLouIkw_4tuVJ0h-';
const BUCKET='propiedades', MAX=5*1024*1024, LIMIT=6;
const SESSION='jat-nexo-supabase-session', JOURNAL='jat-nexo-photo-cleanup-v1';
const uuid='[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}';
const pathPattern=new RegExp('^[0-9a-f-]{36}/[A-Za-z0-9_-]{1,128}/'+uuid+'\\.(jpg|jpeg|png|webp)$');
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let session=null, refreshing=null, draft=null, callback=()=>{}, readProperty=null, cleanupFlight=null, working=false;
const urls=new Map();
function emit(){document.querySelectorAll('[data-photo-path]').forEach(n=>{if(n.dataset.loaded==='failed')delete n.dataset.loaded;});callback();hydrate();}
function storeSession(){try{session?sessionStorage.setItem(SESSION,JSON.stringify(session)):sessionStorage.removeItem(SESSION);}catch{}}
function clear(){session=null;storeSession();urls.clear();document.querySelectorAll('[data-photo-path] img').forEach(i=>i.remove());document.querySelectorAll('[data-photo-path] .photo-placeholder').forEach(n=>n.removeAttribute('hidden'));document.querySelectorAll('[data-photo-path]').forEach(n=>{delete n.dataset.loaded;});emit();}
async function request(endpoint,{method='GET',body,token,headers={}}={}){
 const r=await fetch(BASE+endpoint,{method,headers:{apikey:KEY,...(token?{Authorization:'Bearer '+token}:{}),...(body&&!(body instanceof Blob)?{'Content-Type':'application/json'}:{}),...headers},body:body instanceof Blob?body:body?JSON.stringify(body):undefined});
 const data=await r.json().catch(()=>null);
 if(!r.ok){const e=new Error(r.status===401?'La sesión venció. Ingresá nuevamente.':r.status===403?'No tenés permiso para esta fotografía.':r.status===400&&endpoint.includes('/auth/v1/token')?'Email o contraseña incorrectos.':r.status===413?'La imagen supera el tamaño permitido.':'No se pudo completar la operación. Revisá la conexión y los permisos.');e.status=r.status;e.duplicate=r.status===409||data?.error==='Duplicate'||String(data?.statusCode)==='409';throw e;}
 return data;
}
async function accept(data){
 const user=await request('/auth/v1/user',{token:data.access_token});
 if(!/^[0-9a-f-]{36}$/.test(user.id))throw new Error('La sesión no contiene un UID válido.');
 session={access_token:data.access_token,refresh_token:data.refresh_token,expires_at:Math.floor(Date.now()/1000)+(data.expires_in||3600),user:{id:user.id,email:user.email}};storeSession();emit();return session;
}
async function token(){
 if(!session)throw new Error('Ingresá con tu cuenta de agente para usar fotografías.');
 if(session.expires_at>Date.now()/1000+60)return session.access_token;
 if(!refreshing)refreshing=request('/auth/v1/token?grant_type=refresh_token',{method:'POST',body:{refresh_token:session.refresh_token}}).then(accept).catch(e=>{clear();throw e;}).finally(()=>{refreshing=null;});
 await refreshing;return session.access_token;
}
function valid(photo,pid){return photo&&typeof photo.ruta==='string'&&pathPattern.test(photo.ruta)&&photo.ruta.split('/')[1]===pid&&photo.id===photo.ruta.split('/')[2].split('.')[0];}
function photos(p){return Array.isArray(p?.fotos)?p.fotos.filter(x=>valid(x,p.id)):[];}
function ownPath(path){return !!session&&pathPattern.test(path)&&path.split('/')[0]===session.user.id;}
function assertOwner(p){
 if((p?.fotos?.length||0)!==photos(p).length)throw new Error('Las referencias de fotos son inválidas. No se modificaron.');
 if(photos(p).length&&!session)throw new Error('Ingresá para modificar o eliminar una propiedad con fotografías.');
 if(photos(p).some(x=>!ownPath(x.ruta)))throw new Error('Las fotos pertenecen a otro agente. No se modificaron.');
}
function journal(){try{return JSON.parse(localStorage.getItem(JOURNAL)||'[]').filter(x=>pathPattern.test(x.ruta)&&x.pid===x.ruta.split('/')[1]);}catch{throw new Error('No se pudo leer la cola de limpieza. No se modificaron fotos.');}}
function queue(items){const entries=journal();items.forEach(x=>{if(!entries.some(e=>e.ruta===x.ruta))entries.push({ruta:x.ruta,pid:x.ruta.split('/')[1]});});localStorage.setItem(JOURNAL,JSON.stringify(entries));}
function unqueue(path){localStorage.setItem(JOURNAL,JSON.stringify(journal().filter(x=>x.ruta!==path)));}
async function list(prefix){return request('/storage/v1/object/list/'+BUCKET,{method:'POST',token:await token(),body:{prefix,limit:100,offset:0}});}
async function remove(path){
 if(!ownPath(path))throw new Error('Ruta fuera de la carpeta del agente.');
 await request('/storage/v1/object/'+BUCKET,{method:'DELETE',token:await token(),body:{prefixes:[path]}});
 const slash=path.lastIndexOf('/');const entries=await list(path.slice(0,slash));
 if(entries.some(x=>x.name===path.slice(slash+1)))throw new Error('La eliminación todavía no pudo confirmarse.');
 urls.delete(path);
}
function withWriteLock(fn){return navigator.locks?navigator.locks.request('jat-nexo-photo-write',fn):fn();}
async function reconcile(){
 if(!session||!readProperty)return 0;
 if(cleanupFlight){await cleanupFlight;return journal().filter(e=>ownPath(e.ruta)).length;}
 if(working)return journal().filter(e=>ownPath(e.ruta)).length;
 const entries=journal().filter(e=>ownPath(e.ruta));
 if(!entries.length)return 0;
 if(!confirm('¿Eliminar los archivos pendientes de limpieza de tu cuenta? Solo se borrarán los que ya no estén referenciados por una propiedad. Esta acción no se puede deshacer.\n'+entries.map(e=>e.ruta).join('\n')))return entries.length;
 cleanupFlight=(async()=>{
  let pending=0;
  await withWriteLock(async()=>{for(const e of entries){
   if(draft?.items.some(x=>x.ruta===e.ruta)){pending++;continue;}
   try{const p=await readProperty(e.pid);if(p?.fotos?.some(x=>x.ruta===e.ruta)){unqueue(e.ruta);continue;}await remove(e.ruta);unqueue(e.ruta);}catch{pending++;}
  }});
  return pending;
 })();
 const current=cleanupFlight;
 try{return await current;}finally{if(cleanupFlight===current)cleanupFlight=null;}
}
async function signed(path){
 if(!ownPath(path))throw new Error('Ingresá con el agente propietario para ver esta foto.');
 const cached=urls.get(path);if(cached?.until>Date.now())return cached.url;
 const data=await request('/storage/v1/object/sign/'+BUCKET+'/'+path,{method:'POST',token:await token(),body:{expiresIn:300}});
 const raw=data.signedURL||data.signedUrl;const url=new URL(raw,BASE+'/storage/v1/');
 // Supabase returns a path beginning /object/sign rather than /storage/v1.
 if(url.pathname.startsWith('/object/'))url.pathname='/storage/v1'+url.pathname;
 if(url.origin!==BASE||!url.pathname.startsWith('/storage/v1/object/sign/'+BUCKET+'/'))throw new Error('URL firmada inválida.');
 urls.set(path,{url:url.href,until:Date.now()+240000});return url.href;
}
function cover(p,cls='photo-cover'){
 const items=photos(p),photo=items.find(x=>x.id===p.fotoPrincipalId)||items[0];
 return `<div class="${esc(cls)}" ${photo?`data-photo-path="${esc(photo.ruta)}"`:''}><span class="photo-placeholder">${photo?'Ingresá para ver la fotografía':'Sin fotografía'}</span></div>`;
}
async function hydrate(){
 for(const node of document.querySelectorAll('[data-photo-path]')){
  const path=node.dataset.photoPath;if(node.dataset.loaded||!ownPath(path))continue;node.dataset.loaded='pending';
  try{const src=await signed(path);if(!node.isConnected||!ownPath(path))continue;const img=new Image();img.alt=node.dataset.photoAlt||'Fotografía de la propiedad';img.loading='lazy';img.src=src;img.onload=()=>{node.querySelector('.photo-placeholder')?.setAttribute('hidden','');};img.onerror=()=>{node.querySelector('.photo-placeholder')?.removeAttribute('hidden');img.remove();node.dataset.loaded='failed';urls.delete(path);};node.append(img);node.dataset.loaded='yes';}catch{node.dataset.loaded='failed';node.querySelector('.photo-placeholder')?.replaceChildren(document.createTextNode('Fotografía no disponible. Reintentá al ingresar.'));}
 }
}
function reset(){if(draft)draft.items.forEach(x=>{if(x.preview)URL.revokeObjectURL(x.preview);});draft=null;}
function editor(p,key){
 if(draft?.key!==key){reset();draft={key,original:{...p,id:p.id||''},items:photos(p).map(x=>({...x})),cover:p.fotoPrincipalId||photos(p)[0]?.id||'',changed:false};}
 return `<section id="photoEditor" class="photo-editor" aria-label="Fotografías"><h3>Fotografías de la propiedad</h3><p class="muted">Hasta 6 fotos (1 portada y 5 adicionales) · JPG, PNG o WebP · máximo 5 MB por foto. Los cambios se aplican al guardar la propiedad.</p><div data-photo-session></div><label class="photo-picker" for="photoFiles">Agregar fotografías desde PC o celular<input id="photoFiles" type="file" accept="image/jpeg,image/png,image/webp" multiple></label><div id="photoFeedback" role="status" aria-live="polite"></div><div id="photoDraft" class="photo-grid"></div></section>`;
}
function paintEditor(){
 const box=document.getElementById('photoDraft');if(!box||!draft)return;
 box.innerHTML=draft.items.map((x,i)=>`<article class="photo-item"><div class="photo-thumb" ${x.ruta?`data-photo-path="${esc(x.ruta)}"`:''}>${x.preview?`<img src="${esc(x.preview)}" alt="Vista previa de la foto ${i+1}">`:'<span class="photo-placeholder">Ingresá para ver la fotografía</span>'}</div><p>${i+1} · ${x.id===draft.cover?'Portada':'Fotografía'}</p><div class="photo-controls"><button type="button" data-photo="cover" data-index="${i}" aria-pressed="${x.id===draft.cover}">Portada</button><button type="button" data-photo="up" data-index="${i}" aria-label="Mover foto ${i+1} antes" ${i===0?'disabled':''}>↑</button><button type="button" data-photo="down" data-index="${i}" aria-label="Mover foto ${i+1} después" ${i===draft.items.length-1?'disabled':''}>↓</button><button type="button" data-photo="remove" data-index="${i}" aria-label="Quitar foto ${i+1}">Quitar</button></div></article>`).join('');hydrate();
}
function paintSession(){document.querySelectorAll('[data-photo-session]').forEach(n=>{n.innerHTML=session?`<p class="photo-account">Fotos privadas · ${esc(session.user.email)} <button type="button" data-photo="logout">Cerrar sesión</button> <button type="button" data-photo="cleanup">Eliminar archivos pendientes…</button></p>`:'<p class="photo-account">Para cargar y ver fotos privadas <button type="button" data-photo="login">Ingresar como agente</button></p>';});}
function feedback(message){const n=document.getElementById('photoFeedback');if(n)n.textContent=message;}
async function add(files){
 if(working)return;working=true;
 try{await token();assertOwner(draft.original);if(draft.items.length+files.length>LIMIT)throw new Error('Podés guardar como máximo 6 fotos por propiedad.');
 const next=[];
 try{for(const file of files){
  if(!['image/jpeg','image/png','image/webp'].includes(file.type))throw new Error('Usá imágenes JPG, PNG o WebP.');
  if(!file.size||file.size>MAX)throw new Error('Cada imagen debe pesar como máximo 5 MB.');
  const preview=URL.createObjectURL(file);const img=new Image();img.src=preview;
  try{await img.decode();}catch{URL.revokeObjectURL(preview);throw new Error('El archivo no contiene una imagen válida.');}
  next.push({id:crypto.randomUUID(),file,preview,mime:file.type,bytes:file.size,ancho:img.naturalWidth,alto:img.naturalHeight});
 }}catch(e){next.forEach(x=>URL.revokeObjectURL(x.preview));throw e;}
 draft.items.push(...next);draft.cover=draft.cover||next[0]?.id||'';draft.changed=true;feedback('Fotos preparadas. Guardá la propiedad para subirlas.');paintEditor();
 }catch(e){feedback(e.message);}finally{working=false;const input=document.getElementById('photoFiles');if(input)input.value='';}
}
function canonical(v){return Array.isArray(v)?v.map(canonical):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,canonical(v[k])])):v;}
function assertUnchanged(p){if(JSON.stringify(canonical(p?.fotos||[]))!==JSON.stringify(canonical(draft?.original.fotos||[]))||(p?.fotoPrincipalId||'')!==(draft?.original.fotoPrincipalId||''))throw new Error('Las fotos cambiaron en otra sesión. Reabrí la propiedad antes de guardar.');}
async function prepare(pid){
 if(!draft?.changed)return null;if(working)throw new Error('Esperá a que termine la lectura de las fotos.');
 if(draft.items.length>LIMIT)throw new Error('Podés guardar como máximo 6 fotos por propiedad.');assertOwner(draft.original);await token();if(draft.items.some(x=>x.ruta&&!ownPath(x.ruta)))throw new Error('Las fotos preparadas pertenecen a otra sesión. Cancelá y reabrí la propiedad.');working=true;
 try{for(const x of draft.items){if(x.ruta)continue;
  const extension={'image/jpeg':'jpg','image/png':'png','image/webp':'webp'}[x.mime];const path=session.user.id+'/'+pid+'/'+x.id+'.'+extension;
  queue([{ruta:path}]);
  try{await request('/storage/v1/object/'+BUCKET+'/'+path,{method:'POST',token:await token(),body:x.file,headers:{'Content-Type':x.mime,'x-upsert':'false'}});x.ruta=path;}
  catch(e){if(e.duplicate){const old=x.id;x.id=crypto.randomUUID();if(draft.cover===old)draft.cover=x.id;}throw e;}
 }
 queue(photos(draft.original).filter(x=>!draft.items.some(y=>y.ruta===x.ruta)));
 return {fotos:draft.items.map(({id,ruta,mime,bytes,ancho,alto})=>({id,ruta,mime,bytes,ancho:ancho||0,alto:alto||0})),fotoPrincipalId:draft.cover};
 }finally{working=false;}
}
function gallery(p){
 const items=photos(p);return `<section class="photo-gallery" aria-label="Galería de fotografías"><div data-photo-session></div>${cover(p,'photo-main')}<div class="photo-gallery-strip">${items.map(x=>`<button type="button" data-photo="view" data-path="${esc(x.ruta)}" aria-label="Ver fotografía">${cover({id:p.id,fotos:[x]},'photo-thumb')}</button>`).join('')}</div></section>`;
}
function dialog(){
 if(document.getElementById('photoAuth'))return;
 const d=document.createElement('dialog');d.id='photoAuth';d.className='photo-auth';
 d.innerHTML='<form id="photoAuthForm" method="dialog"><h2>Cuenta de agente</h2><p class="muted">La cuenta de Supabase protege tus fotos privadas.</p><label for="photoEmail">Email</label><input id="photoEmail" type="email" autocomplete="username" required><label for="photoPassword">Contraseña</label><input id="photoPassword" type="password" autocomplete="current-password" required><p id="photoAuthMessage" role="status" aria-live="polite"></p><div class="photo-auth-actions"><button type="submit">Ingresar</button><button type="button" id="photoRecover">Olvidé mi contraseña</button><button type="button" id="photoClose">Cerrar</button></div></form>';
 document.body.append(d);d.showModal();d.addEventListener('close',()=>d.remove());d.querySelector('#photoClose').onclick=()=>d.close();
 d.querySelector('#photoRecover').onclick=()=>{d.close();d.remove();window.JatRecuperacion?.solicitar();};
 d.querySelector('form').onsubmit=async e=>{
  e.preventDefault();const buttons=d.querySelectorAll('button');buttons.forEach(b=>b.disabled=true);
  try{await accept(await request('/auth/v1/token?grant_type=password',{method:'POST',body:{email:d.querySelector('#photoEmail').value.trim(),password:d.querySelector('#photoPassword').value}}));d.querySelector('#photoPassword').value='';d.close();paintSession();paintEditor();}
  catch(e){d.querySelector('#photoAuthMessage').textContent=e.message;}finally{buttons.forEach(b=>b.disabled=false);}
 };
}
function busy(){return working;}
async function init(onchange,reader){
 if(window.JatRecuperacion?.activa()){window.addEventListener('jat-recovery-closed',()=>init(onchange,reader),{once:true});return;}
 callback=onchange;readProperty=reader;
 document.addEventListener('click',async e=>{
  const b=e.target.closest('[data-photo]');if(!b||b.disabled||working)return;
  const action=b.dataset.photo;try{
   if(action==='login')return dialog();
   if(action==='cleanup'){const pending=await reconcile();paintSession();alert(pending?'Quedan archivos pendientes; no se borraron o no se pudo confirmar su eliminación.':'Limpieza finalizada. No quedan archivos pendientes de tu cuenta.');return;}
   if(action==='logout'){if(draft?.changed)throw new Error('Guardá o cancelá los cambios de fotos antes de cerrar sesión.');await request('/auth/v1/logout?scope=local',{method:'POST',token:await token()});clear();return;}
   if(action==='view'){const main=document.querySelector('.photo-main');main.innerHTML='<span class="photo-placeholder">Cargando fotografía…</span>';main.dataset.photoPath=b.dataset.path;delete main.dataset.loaded;hydrate();return;}
   if(!draft)return;await token();assertOwner(draft.original);const i=Number(b.dataset.index),x=draft.items[i];if(!x)return;
   if(action==='cover')draft.cover=x.id;
   if(action==='up'&&i>0)[draft.items[i-1],draft.items[i]]=[draft.items[i],draft.items[i-1]];
   if(action==='down'&&i<draft.items.length-1)[draft.items[i+1],draft.items[i]]=[draft.items[i],draft.items[i+1]];
   if(action==='remove'){draft.items.splice(i,1);if(x.preview)URL.revokeObjectURL(x.preview);if(draft.cover===x.id)draft.cover=draft.items[0]?.id||'';}
   draft.changed=true;paintEditor();
  }catch(err){feedback(err.message);}
 });
 document.addEventListener('change',e=>{if(e.target.id==='photoFiles')add(Array.from(e.target.files));});
 new MutationObserver(()=>{paintSessionIfEmpty();hydrate();}).observe(document.getElementById('pantalla'),{subtree:true,childList:true});
 function paintSessionIfEmpty(){if(document.querySelector('[data-photo-session]:empty'))paintSession();}
 try{const saved=JSON.parse(sessionStorage.getItem(SESSION)||'null');if(saved){session=saved;await token();await accept({...session,expires_in:Math.max(0,session.expires_at-Date.now()/1000)});}}catch{clear();}
 paintSession();paintEditor();
 setInterval(()=>{urls.clear();document.querySelectorAll('[data-photo-path]').forEach(n=>{n.querySelector('img')?.remove();n.querySelector('.photo-placeholder')?.removeAttribute('hidden');delete n.dataset.loaded;});hydrate();},240000);
 // Reconnection never starts deletion. Cleanup requires the explicit button.
}
export const Fotos={withWriteLock,assertUnchanged,init,editor,paintEditor,paintSession,cover,gallery,prepare,reset,reconcile,assertOwner,queue,busy};
