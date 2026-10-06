# Validación JAT Nexo V1.2.1

Fecha: 2026-10-06. Alcance: rediseño exclusivamente visual basado en el mockup del usuario. **La aprobación visual final queda pendiente de la revisión del usuario en la versión publicada.**

## Backup e invariantes

`index-backup-v1.2-certified.html` se creó antes del primer cambio y se verificó byte a byte contra el index.html de V1.2 certificada (`a62fbc9`, aplicación `389e808`). SHA-256: `de407b3a1edc07ce14bcaaeaae4aaad89749e85e8a24472582c89ae96ddd2435`. Todos los backups anteriores permanecen idénticos a los guardados en Git.

El bloque JavaScript completo es idéntico al backup, exceptuando tres funciones de presentación: dashboard, renderizar y listaPropiedades. Formularios, selector único de operación, ficha de consulta/Editar cliente, búsqueda directa y fechas DD/MM/AAAA permanecen funcionalmente sin cambios. Firebase, esquema, colecciones, algoritmo, lecturas/escrituras, validaciones y handlers no se modificaron.

## Cambios visuales

- Lateral azul marino y encabezado limpio con acceso al buscador existente de Clientes. El acceso superior navega al buscador; no agrega búsqueda global ni nuevos criterios.
- Hero de interior inmobiliario, título serif y cuatro accesos integrados. La imagen generada es decorativa, identificada como “Imagen ambiental ilustrativa”, y no representa ningún inmueble del catálogo.
- Cuatro métricas compactas con sus mismos valores reales. Cartera inmobiliaria junto a agenda comercial; clientes recientes y relación Cliente ↔ Propiedad debajo, obtenidos de los datos existentes.
- Propiedades con dirección, barrio, tipo, operación, ambientes, precio y estado. Cabeceras “Sin fotografía”: no se agregaron fotos, superficie, datos ficticios ni campos nuevos.
- Clientes y ficha de consulta con información compacta, etiquetas y jerarquía visual. Editar cliente sigue siendo explícito.
- Coincidencias con relación Cliente ↔ Propiedad y los mismos criterios. La etiqueta Compatible refleja únicamente el resultado booleano existente; no hay porcentajes inventados.
- Agenda con fecha, cliente, próxima acción y estado. Sin horas inventadas ni cambios de lógica.
- Móvil 390 × 844 con agenda prioritaria, propiedades horizontales, accesos 2 × 2, controles táctiles y navegación inferior existente.

No se incorporaron reportes, configuración, login/avatar, notificaciones, favoritos, IA ni nuevas funcionalidades de negocio.

## Validación

**Versión publicada: 17 E2E PASS / 0 FAIL + 22 UAT PASS / 0 FAIL = 39 PASS / 0 FAIL.**

Chromium 151, escritorio 1363 × 900 y móvil 390 × 844, con Firestore real. Los flujos se ejecutaron desde la interfaz. Las lecturas REST completas y paginadas verificaron inventario, unicidad y conservación. WhatsApp se interceptó antes de conectar: no se enviaron mensajes. Los escenarios y sus aserciones se conservaron; solo cambiaron URL y carpeta de evidencia de los runners V1.2.

### 17 E2E

| Caso | Escenario | Resultado | Obtenido | Evidencia |
|---|---|---|---|---|
| 1 | Alta de comprador | PASS | Comprador con email opcional, teléfono, dos tipos, Palermo + Belgrano, USD 100.000 y 2 ambientes guardado. | [Captura](/workspace/v1.2.1-published-e2e-evidence/case-01.png) |
| 2 | Clientes guardados | PASS | Resultado esperado comprobado desde la interfaz. | [Captura](/workspace/v1.2.1-published-e2e-evidence/case-02.png) |
| 3 | Alta de vendedor | PASS | Resultado esperado comprobado desde la interfaz. | [Captura](/workspace/v1.2.1-published-e2e-evidence/case-03.png) |
| 4 | Propiedad vinculada | PASS | Resultado esperado comprobado desde la interfaz. | [Captura](/workspace/v1.2.1-published-e2e-evidence/case-04.png) |
| 5 | Listado de propiedades | PASS | Resultado esperado comprobado desde la interfaz. | [Captura](/workspace/v1.2.1-published-e2e-evidence/case-05.png) |
| 6 | Datos compatibles | PASS | Resultado esperado comprobado desde la interfaz. | [Captura](/workspace/v1.2.1-published-e2e-evidence/case-06.png) |
| 7 | Coincidencia correcta | PASS | Resultado esperado comprobado desde la interfaz. | [Captura](/workspace/v1.2.1-published-e2e-evidence/case-07.png) |
| 8 | Seguimiento | PASS | Resultado esperado comprobado desde la interfaz. | [Captura](/workspace/v1.2.1-published-e2e-evidence/case-08.png) |
| 9 | Editar cliente y persistencia | PASS | Resultado esperado comprobado desde la interfaz. | [Captura](/workspace/v1.2.1-published-e2e-evidence/case-09.png) |
| 10 | Editar propiedad y persistencia | PASS | Resultado esperado comprobado desde la interfaz. | [Captura](/workspace/v1.2.1-published-e2e-evidence/case-10.png) |
| 11 | Navegación y Volver | PASS | Resultado esperado comprobado desde la interfaz. | [Captura](/workspace/v1.2.1-published-e2e-evidence/case-11.png) |
| 12 | Nuevo cliente limpio | PASS | Resultado esperado comprobado desde la interfaz. | [Captura](/workspace/v1.2.1-published-e2e-evidence/case-12.png) |
| 13 | Campos obligatorios | PASS | Resultado esperado comprobado desde la interfaz. | [Captura](/workspace/v1.2.1-published-e2e-evidence/case-13.png) |
| 14 | Presupuesto negativo | PASS | Resultado esperado comprobado desde la interfaz. | [Captura](/workspace/v1.2.1-published-e2e-evidence/case-14.png) |
| 15 | Ambientes negativos | PASS | Resultado esperado comprobado desde la interfaz. | [Captura](/workspace/v1.2.1-published-e2e-evidence/case-15.png) |
| 16 | Precio negativo | PASS | Resultado esperado comprobado desde la interfaz. | [Captura](/workspace/v1.2.1-published-e2e-evidence/case-16.png) |
| 17 | Doble clic en Guardar | PASS | Doble clic real en cliente, propiedad y seguimiento; un documento por alta en las tres colecciones. | [Captura](/workspace/v1.2.1-published-e2e-evidence/case-17.png) |

### 22 UAT

| Caso | Escenario | Resultado | Obtenido | Evidencia |
|---|---|---|---|---|
| 1 | Comprador | PASS | Comprador único, encontrado por búsqueda y campos exactos después de recargar. | [Captura](/workspace/v1.2.1-published-uat-evidence/case-01.png) |
| 2 | Inquilino | PASS | Inquilino diferenciado por operación, zona y presupuesto; formulario correcto. | [Captura](/workspace/v1.2.1-published-uat-evidence/case-02.png) |
| 3 | Vendedor | PASS | Vendedor e inmueble guardados con los seis datos solicitados. | [Captura](/workspace/v1.2.1-published-uat-evidence/case-03.png) |
| 4 | Cargar propiedad del vendedor | PASS | Precarga correcta, Venta y propietario vinculado; catálogo y edición confirmados. | [Captura](/workspace/v1.2.1-published-uat-evidence/case-04.png) |
| 5 | Buscar cliente existente | PASS | Búsqueda exacta devolvió un solo comprador; todos los campos originales coinciden. | [Captura](/workspace/v1.2.1-published-uat-evidence/case-05.png) |
| 6 | Primera coincidencia | PASS | Coincidencia visible con comprador, propiedad y seis criterios explicados. | [Captura](/workspace/v1.2.1-published-uat-evidence/case-06.png) |
| 7 | Segunda propiedad compatible | PASS | Dos coincidencias del comprador: Gorriti y Cabildo. | [Captura](/workspace/v1.2.1-published-uat-evidence/case-07.png) |
| 8 | Propiedad no compatible | PASS | Libertador aparece en catálogo pero no coincide con el comprador. | [Captura](/workspace/v1.2.1-published-uat-evidence/case-08.png) |
| 9 | Edición que genera coincidencia | PASS | Cliente adicional: presupuesto USD 100.000 → USD 115.000; pasó de 0 a 1 coincidencia (Gorriti) automáticamente. | [Captura](/workspace/v1.2.1-published-uat-evidence/case-09.png) |
| 10 | Edición que elimina coincidencia | PASS | Cabildo USD 115.000 → USD 130.000 eliminó la coincidencia; restaurar USD 115.000 la recuperó. | [Captura](/workspace/v1.2.1-published-uat-evidence/case-10.png) |
| 11 | Edición de cliente | PASS | USD 125.000 persistió tras guardar, recargar y buscar de nuevo. | [Captura](/workspace/v1.2.1-published-uat-evidence/case-11.png) |
| 12 | Edición de propiedad | PASS | Gorriti USD 112.000 persistente; coincidencia conservada. | [Captura](/workspace/v1.2.1-published-uat-evidence/case-12.png) |
| 13 | Seguimiento comercial | PASS | Cliente, Gorriti, fecha 08/10/2026, Contactado y nota persistieron después de recargar. | [Captura](/workspace/v1.2.1-published-uat-evidence/case-13.png) |
| 14 | Evolución del seguimiento | PASS | Visita agendada y nota actualizada persistieron después de recargar. | [Captura](/workspace/v1.2.1-published-uat-evidence/case-14.png) |
| 15 | WhatsApp | PASS | Botón abrió wa.me/12025550101 con mensaje del comprador; navegación cancelada antes de conectar, sin envío. | [Captura](/workspace/v1.2.1-published-uat-evidence/case-15.png) |
| 16 | Cambio entre clientes | PASS | Formularios independientes; Nuevo cliente vacío. Sin sugerencias de autocompletado visibles en perfil limpio; valores DOM comprobados. | [Captura](/workspace/v1.2.1-published-uat-evidence/case-16.png) |
| 17 | Persistencia general | PASS | Cuatro clientes QA, tres propiedades y seguimiento conservados; comprador con dos coincidencias y cliente adicional con una. | [Captura](/workspace/v1.2.1-published-uat-evidence/case-17.png) |
| 18 | Dashboard | PASS | Dashboard contrastado con inventario completo Firestore y listados: [8, 5, 7, 2]. Seguimientos representa abiertos, según etiqueta. | [Captura](/workspace/v1.2.1-published-uat-evidence/case-18.png) |
| 19 | Navegación | PASS | Circuito de navegación completo sin superposición, botones sin respuesta ni errores JavaScript. | [Captura](/workspace/v1.2.1-published-uat-evidence/case-19.png) |
| 20 | Validaciones de usuario | PASS | Seis guardados inválidos intentados con botón y rechazados; inventario sin cambios. Doble clic creó exactamente un cliente QA. | [Captura](/workspace/v1.2.1-published-uat-evidence/case-20.png) |
| 21 | Uso desde celular | PASS | Circuito completo a 390×844: búsqueda, alta y consulta de cliente, alta y consulta de propiedad, coincidencia y seguimiento. 12 controles comprobados visibles, no tapados y altura ≥40 px; sin overflow; navegación inferior activa. | [Captura](/workspace/v1.2.1-published-uat-evidence/case-21.png) |
| 22 | Día completo del agente | PASS | Jornada completa desde el dashboard hasta contacto preparado, seguimiento evolucionado a visita y revisión de todos los vínculos después de recargar. Sin comunicación externa. | [Captura](/workspace/v1.2.1-published-uat-evidence/case-22.png) |

## Escritorio, celular y observaciones

Revisión visual de las cinco secciones y de la ficha, formularios, coincidencias y agenda durante los escenarios. Sin overflow horizontal en 1363 px y 390 px ni errores JavaScript de página. Formularios móviles de 16 px; los controles comprobados no quedan tapados y conservan áreas táctiles. La prueba usa viewport de Chromium, no dispositivo físico. Revisión adicional de las cinco secciones a 320, 760 y 1024 px: sin overflow horizontal. Se comprobaron nuevamente el acceso superior al buscador y las cuatro operaciones de cliente sin efectuar escrituras.

[Escritorio publicado sin QA](/workspace/v1.2.1-published-visual-evidence/1363-inicio.png) · [Móvil publicado sin QA](/workspace/v1.2.1-published-visual-evidence/390-inicio.png) · [Comprobaciones responsive](/workspace/v1.2.1-published-visual-evidence/checks.json).

**Bugs funcionales encontrados:** ninguno en las baterías completas aprobadas.

**UX-OBSERVATION:** la imagen del hero aproxima la composición del mockup. Las propiedades reales siguen sin fotografías ni superficie; la agenda no muestra horas, porque esos datos no existen en la V1.2. Por eso se muestran estados vacíos explícitos en lugar de completar información ficticia. El encabezado ofrece acceso al buscador de Clientes, no un buscador global nuevo. No se agregó actividad reciente independiente de las funciones existentes. El resultado visual requiere revisión y aprobación del usuario; 39 PASS no constituye aprobación visual.

## QA y datos reales

| Batería | Clientes QA | Propiedades QA | Seguimientos QA | Borrados interfaz | Borrados API de emergencia |
|---|---:|---:|---:|---:|---:|
| E2E publicado | 3 | 2 | 2 | 7 | 0 |
| UAT publicada | 6 | 4 | 3 | 13 | 0 |

Solo se escribieron y eliminaron registros propios QA-E2E / QA-UAT, con IDs y contenido verificados contra cada baseline. Después de cada batería: **0 QA restantes** y **datos reales intactos**, mediante igualdad exacta de documentos, IDs, campos y metadatos antes/después. El inventario actual de esta ejecución es **4 clientes reales / 2 propiedades reales / 1 seguimiento real**; no se reutilizó el inventario histórico de V1.2.

Antes de publicar también se ejecutaron 39 casos locales: 39 PASS / 0 FAIL. Entre ambas rondas se crearon y eliminaron **40 registros QA**, todos desde la interfaz. La auditoría final comparó también el inventario completo contra el baseline de la primera batería local: idéntico durante toda la ejecución. El escaneo final de todos los prefijos QA- devolvió cero en las tres colecciones. [Auditoría final](/workspace/v121-final-audit.json).

## Publicación

Aplicación publicada en https://jat-nb.github.io/jat-nexo/ mediante commit `61d58ac`. Archivo servido y asset del hero comparados byte a byte con los locales. Ambas baterías repetidas sobre `https://jat-nb.github.io/jat-nexo/?v=61d58ac`.

SHA-256 del index.html: `83b579a1d29607105aa8729712996fcb9f003268ececa34792a949e7aedf57a4`.

Archivos de V1.2.1: index.html, assets/hero-interior.png, index-backup-v1.2-certified.html, README.md y QA-V1.2.1.md. Los informes históricos no se modificaron.
