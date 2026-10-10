# JAT Nexo V1.3 — fotografías, candidata local

Sin push ni publicación. Se reutiliza el módulo existente. Compatible con GitHub Pages, Firebase Spark y Supabase Free; sin instalación, backend nuevo ni claves administrativas.

## Funcionalidad

Hasta seis fotos por propiedad, incluida una portada. JPG/PNG/WebP, máximo 5 MiB por archivo; la configuración real del bucket sigue siendo autoritativa. Selección múltiple, vista previa, portada, orden, galería y eliminación. Guardar aplica los cambios; cancelar conserva fotos anteriores. No se agregan fotografías ficticias.

El módulo REST usa publishable key y login normal de Supabase. UID obtenido y validado desde `/auth/v1/user`; sesión en sessionStorage, sin guardar contraseña. Recuperación permanece en `assets/recuperacion.js`, sin cambios respecto al commit publicado 13e6927. El login real fue confirmado por el propietario.

## Persistencia y seguridad

Bucket privado propiedades. Rutas `<UID>/<ID_PROPIEDAD_FIRESTORE>/<UUID_V4>.<jpg|png|webp>`. INSERT con x-upsert false; SELECT/signed URLs y DELETE. No se usan UPDATE de archivos ni se necesitan políticas nuevas para portada/orden.

Solo al guardar cambios de fotos se agregan `fotos` (array de id, ruta, mime, bytes, ancho, alto) y `fotoPrincipalId` al documento correspondiente. Firestore no almacena imágenes, tokens o URLs firmadas. Las propiedades anteriores no requieren migración. Las transacciones protegen las referencias frente a ediciones concurrentes.

Las fotos nuevas se suben antes de guardar metadatos. Las retiradas se eliminan después. La cola contiene rutas e IDs; antes de DELETE se consulta Firestore desde servidor y se conserva cualquier archivo aún referenciado. Se verifica ausencia con listado. No hay transacción distribuida: una limpieza interrumpida necesita reingreso, conexión y almacenamiento local conservado. Web Locks coordina pestañas compatibles, no dispositivos.

RLS continúa siendo la seguridad efectiva. Cada usuario opera en su carpeta. Firestore conserva su esquema y reglas actuales; no se afirma aislamiento comercial por agente. URLs firmadas duran cinco minutos; cerrar sesión retira imágenes de la interfaz pero no revoca una URL ya emitida.

No se modificó ninguna política. La arquitectura utiliza las políticas SELECT/INSERT/DELETE existentes; UPDATE sigue sin política. Su funcionamiento real aún debe validarse autenticadamente, incluyendo compatibilidad de ID/UUID y tamaño. No relajar RLS ante un rechazo. El límite de seis es de la aplicación, no una cuota server-side.

## Backups

`index-backup-v1.2.1-certified.html`: V1.2.1 previa a recuperación, intacta.
`index-backup-v1.2.1-recovery-certified.html`: HTML publicado 13e6927, cotejado byte por byte con GitHub Pages. Archivo completo del commit publicado en `/workspace/backups/jat-nexo-published-13e6927.tar.gz`, fuera del repositorio.

Resultados actuales y pendientes en QA-FOTOS-SUPABASE.md. Requiere autorización posterior antes de push/publicación.
