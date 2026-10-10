# Validación actual de JAT Nexo V1.3

Candidata local, sin publicar. Se ejecutaron nuevamente:

- **Fotografías: 23 PASS / 0 FAIL**, navegador local y Supabase simulado. Seis aceptadas, portada única, séptima rechazada sin alterar las seis, guardado rechaza siete referencias sin uploads; orden, galería, cancelar, eliminación verificada, reintento, sesión y móvil 390×844.
- **Recuperación: 24 PASS / 0 FAIL**, Supabase Auth simulado. El componente no cambió respecto a producción. Incluye conservación de UID, rechazo de errores, concurrencia, separación del módulo de fotos y móvil.
- Sintaxis JavaScript y diff: PASS.
- Backup publicado y componente de recuperación cotejados con 13e6927: PASS.
- Inventario real Firestore en lectura: siete documentos iguales al baseline completo (4 clientes, 2 propiedades, 1 seguimiento), sin nuevos registros QA.

**47 PASS / 0 FAIL en las suites simuladas repetidas.** No sustituye certificación real de Supabase.

## Regresión comercial pendiente

Los 17 E2E y 22 UAT tienen 39 PASS históricos. No se repitieron en esta ejecución: el preflight de Chromium sobre la candidata local no pudo importar Firebase desde www.gstatic.com por ERR_CERT_AUTHORITY_INVALID. No se desactivó HTTPS ni se modificaron certificados. No presentar los 39 anteriores como validación de esta candidata final.

## Seguridad real pendiente

No se efectuaron login, upload, DELETE o cambios de contraseña reales. El propietario confirmó LOGIN PASS previamente. Falta certificar Storage/RLS real con una sesión normal, signed URLs, UPDATE/upsert negativos y limpieza QA. Aislamiento completo entre agentes requiere una segunda cuenta autorizada. No cambiar políticas para aprobar tests.

0 escrituras Supabase reales, 0 correos enviados y 0 registros QA reales creados en esta preparación. Objetos simulados restantes: 0.

Evidencia fuera del repositorio: `/workspace/v13-final-evidence/photos/results.json`, `/workspace/v13-final-evidence/recovery/results.json`, `crm-preflight.json`, `data-audit.json`, `backup-check.json`. No se incluyen datos personales ni credenciales privadas en el commit.

## Revalidación de eliminación manual

Suite fotos: **24 PASS / 0 FAIL**; recuperación: **24 PASS / 0 FAIL**. Total: **48 PASS / 0 FAIL**, con Supabase simulado. Caso nuevo: un archivo pendiente sobrevive a reset, online, recarga y login; cancelar la confirmación lo conserva, confirmar el botón lo elimina. Las demás pruebas fueron adaptadas para invocar y confirmar limpieza explícita. 0 objetos simulados restantes y 0 escrituras Supabase reales. Revisión estática confirma que el único llamador interno de limpieza es el botón manual y que el HTML no la invoca. Evidencias en `/workspace/v13-manual-cleanup-evidence`. Los 17 E2E/22 UAT y Storage real siguen pendientes por los límites documentados; no se da por certificada su repetición. No se cambiaron certificados, políticas, usuarios ni datos reales.
