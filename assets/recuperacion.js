/* Recuperación independiente: solo Supabase Auth, sin Firestore ni Storage. */
(() => {
'use strict';
const BASE='https://xwdqzuxwlqxbgkzwjakd.supabase.co';
const KEY='sb_publishable_bCdK7kJXagxLbWxTLouIkw_4tuVJ0h-';
const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
let context=null, active=false, busy=false, generation=0, modal=null, pendingHash=null;
const ready=()=>document.body?Promise.resolve():new Promise(resolve=>{const observer=new MutationObserver(()=>{if(document.body){observer.disconnect();resolve();}});observer.observe(document.documentElement,{childList:true,subtree:true});});
async function api(path,{method='GET',body,token}={}){
 let response;
 try{response=await fetch(BASE+path,{method,cache:'no-store',referrerPolicy:'no-referrer',headers:{apikey:KEY,...(token?{Authorization:'Bearer '+token}:{}),...(body?{'Content-Type':'application/json'}:{})},body:body?JSON.stringify(body):undefined});}
 catch{throw new Error('No se pudo conectar con Supabase. Revisá tu conexión y reintentá.');}
 const data=await response.json().catch(()=>null);
 if(!response.ok){
  if(response.status===429)throw new Error('Supabase limitó los intentos. Esperá unos minutos antes de reintentar.');
  if(response.status===401||response.status===403)throw new Error('El enlace venció o la sesión no es válida. Solicitá un enlace nuevo.');
  if(method==='PUT'&&response.status===422)throw new Error('Supabase rechazó la contraseña. Usá una contraseña nueva que cumpla los requisitos de tu cuenta.');
  throw new Error('No se pudo completar la operación. Podés reintentar o solicitar un enlace nuevo.');
 }
 return data;
}
function release(){context=null;active=false;generation++;if(modal){modal.close();modal.remove();modal=null;}window.dispatchEvent(new Event('jat-recovery-closed'));}
function message(text){const n=modal?.querySelector('[data-message]');if(n)n.textContent=text;}
function disabled(value){busy=value;modal?.querySelectorAll('input,button').forEach(n=>n.disabled=value);if(!value&&pendingHash){const next=pendingHash;pendingHash=null;consume(next).catch(()=>{});}}
async function frame(title){
 await ready();if(modal){modal.close();modal.remove();}
 modal=document.createElement('dialog');modal.id='jatRecovery';modal.setAttribute('aria-labelledby','jatRecoveryTitle');
 modal.innerHTML='<style>#jatRecovery{box-sizing:border-box;border:1px solid #dbe3ed;border-radius:16px;padding:24px;width:calc(100% - 28px);max-width:440px;max-height:90dvh;overflow:auto;color:#183242;background:white;font:14px/1.5 system-ui}#jatRecovery::backdrop{background:#102a3999}#jatRecovery *{box-sizing:border-box}#jatRecovery h2{font-size:24px;margin:0 0 10px}#jatRecovery p{margin:10px 0;overflow-wrap:anywhere}#jatRecovery label{display:block;margin-top:14px}#jatRecovery input{width:100%;min-width:0;min-height:48px;margin-top:6px;padding:10px;border:1px solid #ccd8e3;border-radius:8px;font:16px system-ui}#jatRecovery button{min-height:44px;padding:10px 14px;border:0;border-radius:8px;background:#006be8;color:white;font:14px system-ui;cursor:pointer}#jatRecovery button:disabled{opacity:.5;cursor:wait}#jatRecovery .jr-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:18px}#jatRecovery .jr-secondary{background:#edf2f6;color:#183242}#jatRecovery form{margin:0;padding:0;border:0;background:transparent;box-shadow:none}#jatRecovery [data-message]{min-height:24px}</style><h2 id="jatRecoveryTitle"></h2><div data-content></div><p data-message role="status" aria-live="polite"></p>';
 modal.querySelector('h2').textContent=title;document.body.append(modal);modal.addEventListener('cancel',e=>{e.preventDefault();if(!busy)release();});modal.showModal();return modal.querySelector('[data-content]');
}
async function requestRecovery(note=''){
 if(busy)return;context=null;active=true;generation++;
 const content=await frame('Recuperar contraseña');
 content.innerHTML='<p>Recibí un enlace para establecer una contraseña nueva en tu cuenta existente.</p><form method="dialog"><label for="jrEmail">Email de tu cuenta</label><input id="jrEmail" name="email" type="email" autocomplete="username" required maxlength="254"><div class="jr-actions"><button type="submit">Enviar enlace</button><button type="button" class="jr-secondary" data-close>Cerrar</button></div></form>';
 message(note);content.querySelector('[data-close]').onclick=()=>{if(!busy)release();};
 content.querySelector('form').onsubmit=async e=>{
  e.preventDefault();if(busy)return;const email=content.querySelector('input').value.trim();if(!content.querySelector('form').reportValidity())return;disabled(true);
  try{await api('/auth/v1/recover?redirect_to='+encodeURIComponent(location.origin+location.pathname),{method:'POST',body:{email}});message('Si la cuenta existe, recibirás un correo de Supabase. Abrí el enlace más reciente.');}
  catch(error){message(error.message);}finally{disabled(false);}
 };
}
async function passwordForm(identity,ticket){
 if(ticket!==generation)return;
 const content=await frame('Establecer contraseña');if(ticket!==generation)return;
 const account=document.createElement('p');account.textContent='Cuenta: '+identity.email;content.append(account);
 const form=document.createElement('form');form.method='dialog';form.innerHTML='<p>Esta operación conserva tu usuario y todos sus datos.</p><label for="jrPassword">Nueva contraseña</label><input id="jrPassword" type="password" autocomplete="new-password" minlength="8" required><label for="jrConfirm">Repetir contraseña</label><input id="jrConfirm" type="password" autocomplete="new-password" minlength="8" required><div class="jr-actions"><button type="submit">Guardar contraseña</button><button type="button" class="jr-secondary" data-close>Cancelar</button></div>';
 content.append(form);form.querySelector('[data-close]').onclick=()=>{if(!busy)release();};
 form.onsubmit=async e=>{
  e.preventDefault();if(busy||!form.reportValidity())return;
  let password=form.querySelector('#jrPassword').value;
  if(password!==form.querySelector('#jrConfirm').value){message('Las contraseñas no coinciden.');return;}
  if(!context||context.expires<=Date.now()){password='';await requestRecovery('El enlace venció. Solicitá otro para continuar.');return;}
  disabled(true);const original=context.user.id;
  try{
   const before=await api('/auth/v1/user',{token:context.token});
   if(before?.id!==original)throw new Error('No se pudo confirmar la identidad de la cuenta. Solicitá un enlace nuevo.');
   await api('/auth/v1/user',{method:'PUT',token:context.token,body:{password}});password='';
   form.querySelectorAll('input').forEach(n=>n.value='');
   const after=await api('/auth/v1/user',{token:context.token});
   if(after?.id!==original)throw new Error('No se pudo confirmar que se conservó la identidad. No se informó éxito.');
   context=null;
   content.replaceChildren();const p=document.createElement('p');p.textContent='Contraseña actualizada. Se comprobó que tu UID sigue siendo el mismo. Ya podés ingresar con tu email y la contraseña nueva.';content.append(p);
   const close=document.createElement('button');close.type='button';close.textContent='Volver a JAT Nexo';close.onclick=()=>{release();location.assign(location.pathname);};content.append(close);message('Cambio confirmado.');
  }catch(error){message(error.message);}finally{password='';disabled(false);}
 };
}
async function consume(incoming){
 const hash=incoming||new URLSearchParams(location.hash.slice(1));
 const recovery=hash.get('type')==='recovery';const invalid=hash.has('error_description')||hash.get('error_code')==='otp_expired';
 if(!recovery&&!invalid)return false;
 // Remove URL credentials before loading the CRM or displaying any form.
 const access=hash.get('access_token');const lifetime=Number(hash.get('expires_in'));const expiresAt=Number(hash.get('expires_at'));
 history.replaceState(null,'',location.pathname+location.search);if(busy){pendingHash=hash;return true;}context=null;active=true;const ticket=++generation;
 if(modal){modal.close();modal.remove();modal=null;}
 if(invalid||!access){await requestRecovery('El enlace venció o está incompleto. Solicitá uno nuevo.');return true;}
 try{
  const user=await api('/auth/v1/user',{token:access});if(ticket!==generation)return true;
  if(!UUID.test(user?.id||'')||!user.email)throw new Error('La sesión no identifica una cuenta existente válida.');
  const expires=expiresAt>0?expiresAt*1000:Date.now()+Math.min(lifetime>0?lifetime:3600,3600)*1000;
  if(expires<=Date.now())throw new Error('Enlace vencido.');
  context={token:access,user:{id:user.id,email:user.email},expires};
  await passwordForm(user,ticket);
 }catch{if(ticket===generation)await requestRecovery('No se pudo validar el enlace. Solicitá uno nuevo.');}
 return true;
}
window.JatRecuperacion=Object.freeze({solicitar:requestRecovery,activa:()=>active});
window.addEventListener('hashchange',()=>{consume().catch(()=>{});});
consume().then(handled=>{if(!handled&&new URLSearchParams(location.search).get('recuperar')==='1')requestRecovery().catch(()=>{});}).catch(()=>{});
})();
