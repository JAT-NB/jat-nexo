# UAT JAT Nexo V1.1

Fecha: 2026-10-06 (America/Buenos_Aires). Ejecución `20261006140012`.

## Resultado

**22 escenarios ejecutados: 22 PASS / 0 FAIL.** Se retomó la UAT después de publicar el permiso de red de GitHub Pages. El informe provisional de casos bloqueados queda reemplazado por esta ejecución real.

Aplicación utilizada: https://jat-nb.github.io/jat-nexo/ . Navegador: Chromium 151 mediante Playwright. Firestore real, proyecto `jat-nexo`. El contenido publicado coincidió byte a byte con el `index.html` del checkout al comenzar, SHA-256 `621486eeee82f365bf0836d683141262840af03d4f47d62d059412697db359b0`.

Las altas y ediciones se realizaron escribiendo en formularios, seleccionando opciones y pulsando los botones de la aplicación publicada. Se usaron búsquedas, navegación, recargas completas y consultas visuales de formularios y tarjetas. No se invocaron funciones internas de JAT Nexo ni se escribieron documentos manualmente en Firestore para aprobar casos. Las evaluaciones DOM solo leyeron valores, validez, medidas y visibilidad de controles. Las lecturas auxiliares de Firestore se limitaron al inventario de seguridad, contraste de indicadores, unicidad y limpieza; no sustituyeron las operaciones de usuario.

Las 22 capturas por caso y sus textos, los resultados estructurados y el ejecutor de la prueba se conservan en `/workspace/uat-v1.1-evidence/`, fuera del checkout. Se revisaron visualmente capturas de formularios, coincidencias, seguimiento, dashboard de escritorio y dashboard móvil. Esta UAT complementa la batería técnica previa de 17 casos; no la reemplaza ni cambia sus resultados.

## Casos de aceptación

| Caso | Escenario | PASS/FAIL | Resultado esperado | Resultado obtenido | Evidencia/observación |
|---|---|---|---|---|---|
| 1 | Comprador | PASS | Alta con todos los datos solicitados, una sola aparición y persistencia. | Comprador único, encontrado por búsqueda y campos exactos después de recargar. | [Captura](/workspace/uat-v1.1-evidence/case-01.png) · [Texto visible](/workspace/uat-v1.1-evidence/case-01.txt) |
| 2 | Inquilino | PASS | Alta Departamento, Belgrano, alquiler USD 1.000, 2 ambientes diferenciada del comprador. | Inquilino diferenciado por operación, zona y presupuesto; formulario correcto. | [Captura](/workspace/uat-v1.1-evidence/case-02.png) · [Texto visible](/workspace/uat-v1.1-evidence/case-02.txt) |
| 3 | Vendedor | PASS | Alta de vendedor con inmueble Gorriti 4500 correcto. | Vendedor e inmueble guardados con los seis datos solicitados. | [Captura](/workspace/uat-v1.1-evidence/case-03.png) · [Texto visible](/workspace/uat-v1.1-evidence/case-03.txt) |
| 4 | Cargar propiedad del vendedor | PASS | Precarga, propietario y catálogo correctos. | Precarga correcta, Venta y propietario vinculado; catálogo y edición confirmados. | [Captura](/workspace/uat-v1.1-evidence/case-04.png) · [Texto visible](/workspace/uat-v1.1-evidence/case-04.txt) |
| 5 | Buscar cliente existente | PASS | Encontrar únicamente el comprador y todos sus datos originales. | Búsqueda exacta devolvió un solo comprador; todos los campos originales coinciden. | [Captura](/workspace/uat-v1.1-evidence/case-05.png) · [Texto visible](/workspace/uat-v1.1-evidence/case-05.txt) |
| 6 | Primera coincidencia | PASS | Comprador ↔ Gorriti con criterios comprensibles. | Coincidencia visible con comprador, propiedad y seis criterios explicados. | [Captura](/workspace/uat-v1.1-evidence/case-06.png) · [Texto visible](/workspace/uat-v1.1-evidence/case-06.txt) |
| 7 | Segunda propiedad compatible | PASS | Cabildo 1500 genera la segunda coincidencia. | Dos coincidencias del comprador: Gorriti y Cabildo. | [Captura](/workspace/uat-v1.1-evidence/case-07.png) · [Texto visible](/workspace/uat-v1.1-evidence/case-07.txt) |
| 8 | Propiedad no compatible | PASS | Libertador 9999 no debe generar coincidencia falsa. | Libertador aparece en catálogo pero no coincide con el comprador. | [Captura](/workspace/uat-v1.1-evidence/case-08.png) · [Texto visible](/workspace/uat-v1.1-evidence/case-08.txt) |
| 9 | Edición que genera coincidencia | PASS | Cambio por interfaz debe crear automáticamente una coincidencia. | Cliente adicional: presupuesto USD 100.000 → USD 115.000; pasó de 0 a 1 coincidencia (Gorriti) automáticamente. | [Captura](/workspace/uat-v1.1-evidence/case-09.png) · [Texto visible](/workspace/uat-v1.1-evidence/case-09.txt) |
| 10 | Edición que elimina coincidencia | PASS | Cambio por interfaz elimina coincidencia y restauración la recupera. | Cabildo USD 115.000 → USD 130.000 eliminó la coincidencia; restaurar USD 115.000 la recuperó. | [Captura](/workspace/uat-v1.1-evidence/case-10.png) · [Texto visible](/workspace/uat-v1.1-evidence/case-10.txt) |
| 11 | Edición de cliente | PASS | Presupuesto USD 120.000 → USD 125.000 persistente. | USD 125.000 persistió tras guardar, recargar y buscar de nuevo. | [Captura](/workspace/uat-v1.1-evidence/case-11.png) · [Texto visible](/workspace/uat-v1.1-evidence/case-11.txt) |
| 12 | Edición de propiedad | PASS | Precio USD 110.000 → USD 112.000 persistente y compatible. | Gorriti USD 112.000 persistente; coincidencia conservada. | [Captura](/workspace/uat-v1.1-evidence/case-12.png) · [Texto visible](/workspace/uat-v1.1-evidence/case-12.txt) |
| 13 | Seguimiento comercial | PASS | Guardar vínculos, fecha, Contactado y nota correcta con persistencia. | Cliente, Gorriti, fecha 08/10/2026, Contactado y nota persistieron después de recargar. | [Captura](/workspace/uat-v1.1-evidence/case-13.png) · [Texto visible](/workspace/uat-v1.1-evidence/case-13.txt) |
| 14 | Evolución del seguimiento | PASS | Contactado → Visita agendada, nota nueva y persistencia. | Visita agendada y nota actualizada persistieron después de recargar. | [Captura](/workspace/uat-v1.1-evidence/case-14.png) · [Texto visible](/workspace/uat-v1.1-evidence/case-14.txt) |
| 15 | WhatsApp | PASS | Preparar contacto del cliente QA correcto y cancelar sin enviar. | Botón abrió wa.me/12025550101 con mensaje del comprador; navegación cancelada antes de conectar, sin envío. | [Captura](/workspace/uat-v1.1-evidence/case-15.png) · [Texto visible](/workspace/uat-v1.1-evidence/case-15.txt) |
| 16 | Cambio entre clientes | PASS | No arrastrar datos entre comprador, inquilino, vendedor y formulario nuevo. | Formularios independientes; Nuevo cliente vacío. Sin sugerencias de autocompletado visibles en perfil limpio; valores DOM comprobados. | [Captura](/workspace/uat-v1.1-evidence/case-16.png) · [Texto visible](/workspace/uat-v1.1-evidence/case-16.txt) |
| 17 | Persistencia general | PASS | Recargar y confirmar módulos y relaciones QA. | Cuatro clientes QA, tres propiedades y seguimiento conservados; comprador con dos coincidencias y cliente adicional con una. | [Captura](/workspace/uat-v1.1-evidence/case-17.png) · [Texto visible](/workspace/uat-v1.1-evidence/case-17.txt) |
| 18 | Dashboard | PASS | Indicadores corresponden a Firestore y coincidencias/seguimientos reales. | Dashboard contrastado con inventario completo Firestore y listados: [5, 3, 3, 1]. Seguimientos representa abiertos, según etiqueta. | [Captura](/workspace/uat-v1.1-evidence/case-18.png) · [Texto visible](/workspace/uat-v1.1-evidence/case-18.txt) |
| 19 | Navegación | PASS | Circuito con Volver y módulos sin pérdida de navegación. | Circuito de navegación completo sin superposición, botones sin respuesta ni errores JavaScript. | [Captura](/workspace/uat-v1.1-evidence/case-19.png) · [Texto visible](/workspace/uat-v1.1-evidence/case-19.txt) |
| 20 | Validaciones de usuario | PASS | Rechazar nombre/dirección/nota vacíos, negativos y duplicados por doble clic. | Seis guardados inválidos intentados con botón y rechazados; inventario sin cambios. Doble clic creó exactamente un cliente QA. | [Captura](/workspace/uat-v1.1-evidence/case-20.png) · [Texto visible](/workspace/uat-v1.1-evidence/case-20.txt) |
| 21 | Uso desde celular | PASS | Circuito completo a 390 px con controles accesibles y datos persistentes. | Circuito completo a 390×844: búsqueda, alta y consulta de cliente, alta y consulta de propiedad, coincidencia y seguimiento. 11 controles comprobados visibles, no tapados y altura ≥40 px; sin overflow; navegación inferior activa. | [Captura](/workspace/uat-v1.1-evidence/case-21.png) · [Texto visible](/workspace/uat-v1.1-evidence/case-21.txt) |
| 22 | Día completo del agente | PASS | Circuito comercial consistente desde Inicio hasta visita y recarga. | Jornada completa desde el dashboard hasta contacto preparado, seguimiento evolucionado a visita y revisión de todos los vínculos después de recargar. Sin comunicación externa. | [Captura](/workspace/uat-v1.1-evidence/case-22.png) · [Texto visible](/workspace/uat-v1.1-evidence/case-22.txt) |

## Datos y decisiones de la prueba

Comprador: `QA-UAT-Comprador-Palermo`, Busca comprar, Departamento, Palermo + Belgrano, USD 120.000, 2 ambientes. Inquilino: `QA-UAT-Inquilino-Belgrano`, Busca alquilar, Departamento, Belgrano, USD 1.000, 2 ambientes. Vendedor: `QA-UAT-Vendedor-Palermo`, Quiere vender, inmueble Gorriti 4500, Palermo, Departamento, 3 ambientes y USD 110.000. Contacto ficticio del comprador: `+1 202 555 0101` y `qa-uat-comprador@example.invalid`; no se enviaron comunicaciones.

Se normalizó el prefijo de las notas a `QA-UAT-` para cumplir la identificación obligatoria: `QA-UAT-Cliente interesado en coordinar visita.` y `QA-UAT-Visita coordinada con el cliente.`. Se utilizó la fecha válida `2026-10-08`.

Cambios comprobados por interfaz:

- Caso 9: cliente adicional inicialmente incompatible, presupuesto USD 100.000 → USD 115.000, Departamento en Palermo; pasó de cero coincidencias a Gorriti.
- Caso 10: Cabildo USD 115.000 → USD 130.000; desapareció la coincidencia del comprador. Se restauró USD 115.000 y reapareció.
- Caso 11: comprador USD 120.000 → USD 125.000; persistió después de recargar.
- Caso 12: Gorriti USD 110.000 → USD 112.000; persistió y mantuvo coincidencia.
- Caso 14: Contactado → Visita agendada con la nota de visita coordinada; persistió.

## Bugs encontrados

No se encontraron fallos funcionales en los 22 escenarios ejecutados. No hubo errores JavaScript de la aplicación durante los 22 escenarios. Los errores de automatización durante la limpieza se explican por separado abajo. No se modificó código para lograr resultados aprobados. Este resultado se limita a los datos, recorridos y navegador probados.

## UX-OBSERVATION

Estas observaciones no impidieron completar los casos y **no se corrigieron** durante la UAT.

| ID | Observación | Experiencia e impacto | Evidencia |
|---|---|---|---|
| UX-01 | Elección de operación duplicada | El formulario presenta un selector “¿Qué necesita el cliente?” y cuatro botones de perfil. Ambos están sincronizados, pero un agente debe interpretar dos controles para la misma decisión. | [Formulario comprador](/workspace/uat-v1.1-evidence/case-01.png) |
| UX-02 | Consultar un cliente abre su edición | Para revisar todos los requisitos desde el listado se usa “Editar”; el formulario incluye “Guardar cambios” aunque la intención sea solo consultar. Hace menos clara la diferencia entre lectura y modificación. | Casos 1, 5, 16 y 22; [formulario](/workspace/uat-v1.1-evidence/case-05.png) |
| UX-03 | Acceso al buscador requiere un paso intermedio | Desde Clientes se entra primero a “Clientes guardados” y luego se busca. El flujo funciona, pero agrega una pantalla a una tarea frecuente de recuperación de contactos. | Casos 5, 21 y 22; recorridos registrados en el ejecutor. |
| UX-04 | Fecha nativa ambigua en este navegador | En el control de fecha, Chromium muestra `10/08/2026` para el valor ISO `2026-10-08`, mientras el listado lo presenta como `08/10/2026`. El dato persiste correctamente; la presentación del control depende del navegador y puede confundir a un agente que espera día/mes/año. | [Edición de seguimiento](/workspace/uat-v1.1-evidence/case-14.png), [dashboard con fecha del seguimiento](/workspace/uat-v1.1-evidence/case-18.png) |

## Escritorio y celular

Escritorio: viewport de 1363 × 900 px; formularios, tarjetas, coincidencias y seguimientos funcionales. Circuito de jornada comercial aprobado desde dashboard hasta contacto preparado, seguimiento evolucionado y comprobación de cliente/propiedad/coincidencia/seguimiento después de recargar. No hubo pantallas superpuestas ni botones sin respuesta en el recorrido probado.

Celular: viewport de 390 × 844 px. Se buscó el comprador existente, se creó y consultó un cliente móvil, se creó y consultó una propiedad, se encontró la coincidencia correspondiente y se creó un seguimiento antes de volver a Inicio y recargar. Se verificaron once controles: visibles después de desplazarse, dentro del viewport, sin otro elemento sobre su centro y con altura de al menos 40 px. Navegación inferior accesible; input de nombre a 16 px; sin desbordamiento horizontal en los puntos comprobados. Captura: [dashboard móvil](/workspace/uat-v1.1-evidence/mobile-dashboard.png).

La prueba móvil usó viewport de Chromium, no un dispositivo físico ni teclado virtual. No constituye una prueba exhaustiva de accesibilidad o de otros navegadores.

## WhatsApp sin comunicación externa

En los casos 15 y 22 se pulsó el botón real de WhatsApp. El navegador capturó los destinos preparados por JAT Nexo, verificó teléfono, comprador y —en el caso 22— dirección y precio de Gorriti. La navegación a `wa.me` fue cancelada antes de realizar la conexión externa y se cerraron las ventanas abiertas. No se envió ningún mensaje.

## Dashboard y Firestore

En el caso 18 los indicadores fueron **5 clientes / 3 propiedades / 3 coincidencias / 1 seguimiento abierto**. Se contrastaron con el inventario completo de Firestore, los listados y un cálculo independiente de compatibilidad. Las tres coincidencias eran las dos del comprador y una del cliente adicional. La etiqueta de seguimiento indica abiertos, no total histórico.

En el circuito móvil, después de incorporar datos adicionales, el dashboard mostró **7 / 4 / 10 / 2**; la captura conserva ese estado. El caso 22 añadió un tercer seguimiento. Estos estados intermedios contienen únicamente los datos reales iniciales y los QA autorizados.

## Registros QA creados y eliminados

Se crearon **13 registros QA-UAT**: 6 clientes, 4 propiedades y 3 seguimientos.

| Colección | Registro / nota final | ID Firestore | Estado final |
|---|---|---|---|
| clientes | QA-UAT-Comprador-Palermo | `2TuXsCE7bzVNjucIEcHK` | Eliminado |
| clientes | QA-UAT-Inquilino-Belgrano | `zehrPVGM7S1oOwjau6rb` | Eliminado |
| clientes | QA-UAT-Vendedor-Palermo | `5fFHqhxdi6Y0ixSpQyi8` | Eliminado |
| clientes | QA-UAT-Inicialmente-incompatible-20261006140012 | `hqPiOZVdYJ1rCMOlpnXY` | Eliminado |
| clientes | QA-UAT-Doble-20261006140012 | `rMcOl2dH3uxgTQqPoJNM` | Eliminado |
| clientes | QA-UAT-Cliente-movil-20261006140012 | `yicpmhcb7RlrF6v3Bx7X` | Eliminado |
| propiedades | QA-UAT-Gorriti 4500 | `dBQK7jZIj0qvnDA8PnyW` | Eliminado |
| propiedades | QA-UAT-Cabildo 1500 | `orpZxFlHdrjoYTvvUHzN` | Eliminado |
| propiedades | QA-UAT-Libertador 9999 | `PGiq4SbN1OyCmonafCCO` | Eliminado |
| propiedades | QA-UAT-Propiedad-movil-20261006140012 | `Yvsl6SBBBKt5sURggYx8` | Eliminado |
| seguimientos | QA-UAT-Visita coordinada con el cliente. | `mUeIlNU775De2nvd4A8N` | Eliminado |
| seguimientos | QA-UAT-Seguimiento movil-20261006140012 | `xH4J9p1Py9D21oUosnUq` | Eliminado |
| seguimientos | QA-UAT-Jornada comercial-20261006140012 visita | `JLHcnlw5GQslbV5Lboga` | Eliminado |

Se pulsó Eliminar desde la interfaz para los 13 registros, primero seguimientos, luego propiedades y finalmente clientes, acotando cada botón a su ID propio. Una expresión incorrecta de espera en el ejecutor de QA produjo `ReferenceError: act is not defined` después de los 22 escenarios: era una variable del ejecutor y no una función de JAT Nexo. La verificación posterior encontró 6 documentos ya ausentes por los borrados de interfaz y realizó 7 solicitudes DELETE de respaldo para los IDs QA propios que aún aparecían. Antes de cada DELETE se comprobó que el documento perteneciera a esta ejecución y no al inventario real inicial. El error de espera se corrigió únicamente en el ejecutor externo para reproducción futura; no se cambió la aplicación. Los resultados funcionales de los 22 casos no dependieron de esas operaciones de limpieza.

Las lecturas finales completas de `clientes`, `propiedades` y `seguimientos` confirmaron **0 documentos con contenido QA-UAT**. Después de la limpieza se recargó la aplicación publicada y el dashboard volvió a **1 cliente / 0 propiedades / 0 coincidencias / 0 seguimientos abiertos**. Evidencia: [dashboard final limpio](/workspace/uat-v1.1-evidence/final-clean-dashboard.png).

## Datos reales intactos

| Colección | Iniciales | Finales | QA-UAT finales |
|---|---:|---:|---:|
| clientes | 1 | 1 | 0 |
| propiedades | 0 | 0 | 0 |
| seguimientos | 0 | 0 | 0 |

Se inventariaron los documentos antes de la primera alta y se compararon con los recuperados después de la limpieza. Coincidieron exactamente los IDs, campos y metadatos de los documentos reales. Ningún documento real fue editado ni eliminado.

Documento real inicial registrado por ID y huella, sin reproducir sus datos personales:

- `clientes/LBaWK6CZ1llP20lLKzGv` — SHA-256 de JSON normalizado: `3352f562772f61d8c482910b15f341492dcd6b431e95104e1d8f512924b69128`.

## Cierre

- Escenarios ejecutados: **22**.
- PASS: **22**.
- FAIL: **0**.
- Pendientes / bloqueados: **0**.
- UX-OBSERVATION: **4**, documentadas sin corregir.
- QA-UAT restantes: **0**.
- Datos reales: **intactos**, comparación completa aprobada.
- Aplicación, arquitectura y backups: **sin modificaciones**.

Se completó únicamente este informe del checkout. El cambio preexistente en `QA-V1.1.md` de la validación anterior se conservó. No se publicó ningún cambio de aplicación ni se realizaron correcciones durante esta UAT.
