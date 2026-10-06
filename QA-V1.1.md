# QA JAT Nexo V1.1
Fecha: 2026-10-06 (UTC). Aplicación publicada: https://jat-nb.github.io/jat-nexo/

## Resultado
**17 PASS / 0 FAIL** en la repetición del flujo funcional V1. Las verificaciones adicionales de UI, datos reales, eliminación y responsive también pasaron. No quedaron registros QA en Firestore.

Pruebas realizadas en Chrome mediante interacción con la aplicación publicada y Firestore real. La prueba móvil usó la misma aplicación dentro de un iframe de 320, 390 y 760 px, sin mocks; no representa una prueba en un dispositivo físico ni de teclado virtual. El archivo HTTPS temporal de esa prueba fue retirado del repositorio al terminar.

Estado inicial y final: 1 cliente existente, 0 propiedades y 0 seguimientos. No se editaron ni eliminaron datos reales.

## Repetición de los 17 casos funcionales
| # | Caso | Esperado | Obtenido | Estado |
|---|---|---|---|---|
| 1 | Alta de comprador | Guardar comprador con email opcional, varios tipos y barrios | Comprador QA guardado; Departamento + Casa, Palermo + Belgrano, USD 100.000, mínimo 2 ambientes | PASS |
| 2 | Clientes guardados | Leer y mostrar el comprador desde Firestore | Ficha visible una sola vez con los datos ingresados | PASS |
| 3 | Alta de vendedor | Guardar vendedor y datos de su propiedad | Vendedor QA visible con Departamento, Palermo, USD 95.000 y 3 ambientes | PASS |
| 4 | Propiedad vinculada | Cargar propiedad desde vendedor y mantener propietario | Formulario precargado; propietario seleccionado y persistido | PASS |
| 5 | Listado de propiedades | Mostrar propiedad guardada | Una ficha con Venta, Disponible, dirección QA, zona, moneda, precio, ambientes y propietario | PASS |
| 6 | Datos compatibles | Conservar los criterios de compatibilidad | Compra/Venta, Departamento, Palermo, USD, 95.000 ≤ 100.000 y 3 ≥ 2 | PASS |
| 7 | Coincidencia correcta | Mostrar comprador ↔ propiedad compatible | Una coincidencia QA con los seis datos explicados; el cliente real no coincidió | PASS |
| 8 | Seguimiento | Guardar cliente, propiedad, estado, fecha y nota | Visita agendada para 07/10/2026; listado y próximos seguimientos visibles | PASS |
| 9 | Editar cliente y persistencia | Confirmar y guardar presupuesto nuevo tras recarga | USD 110.000 confirmado, guardado y recuperado al recargar | PASS |
| 10 | Editar propiedad y persistencia | Confirmar y guardar precio nuevo tras recarga | USD 97.000 recuperado tras recarga; vínculo con vendedor conservado | PASS |
| 11 | Navegación y Volver | Acceder a módulos y volver a destino correcto | Menú lateral, accesos rápidos, navegación inferior y botones Volver operativos | PASS |
| 12 | Nuevo cliente limpio | No arrastrar datos después de guardar, editar o abandonar | Nombre, teléfono, email, zonas, importes y ambientes vacíos; tipos sin marcar. Borrador no guardado descartado | PASS |
| 13 | Campos obligatorios | Rechazar altas incompletas | Nombre de cliente, dirección de propietario y nota de seguimiento rechazados con validación nativa | PASS |
| 14 | Presupuesto negativo | Rechazar -1 | rangeUnderflow=true; sin guardado | PASS |
| 15 | Ambientes negativos | Rechazar -1 | rangeUnderflow=true; sin guardado | PASS |
| 16 | Precio negativo | Rechazar -10 | rangeUnderflow=true; sin guardado | PASS |
| 17 | Doble clic en Guardar | Crear un solo documento por alta | Doble clic probado en comprador, propiedad y seguimiento: un registro de cada uno | PASS |

## Verificaciones adicionales
| Caso | Esperado | Obtenido | Estado |
|---|---|---|---|
| Dashboard real | Totales y resumen basados en Firestore | Con QA: 3 clientes, 1 propiedad, 1 coincidencia, 1 seguimiento abierto. Después de limpiar: 1, 0, 0, 0 | PASS |
| Edición y filtro de seguimiento | Filtrar estados y persistir edición | Pendiente no mostró resultados; Visita agendada mostró el QA. Contactado y nota editada persistieron tras recarga | PASS |
| Confirmación de eliminación | Cancelar conserva; confirmar elimina solo QA | Cancelación del seguimiento conservó la ficha. Después se eliminaron seguimiento, propiedad y ambos clientes; 0 vínculos adicionales afectados | PASS |
| Selección de cuatro perfiles y moneda | Preservar comprador, inquilino, vendedor y propietario que alquila; ARS/USD | Selector y botones visuales sincronizados; formularios comprador/vendedor probados con altas, inquilino/propietario alquiler con cambios de UI sin guardar | PASS |
| Escritorio | Dashboard SaaS con lateral y fichas profesionales | Revisión visual realizada a 1363 px; acciones reales e iconos SVG, sin fotografías ficticias | PASS |
| Responsive y overflow | Navegación inferior, formularios cómodos y cero overflow horizontal | 390 px: clientWidth=scrollWidth=375; 320 px: 305=305; 760 px: 745=745 (15 px de scrollbar del navegador). Verificados dashboard, clientes, formularios, propiedades, coincidencias y seguimientos; inputs de 16 px | PASS |
| WhatsApp | Preservar preparación sin envío automático | UI rechaza cliente sin teléfono. Prueba simulada adicional confirmó wa.me y texto codificado. No se envió ningún mensaje | PASS |
| JavaScript | Sin errores de sintaxis ni fallos de la app | Ambos scripts pasaron node --check; navegación/CRUD reales sin error de la aplicación. Los logs mostraron errores de una extensión del navegador, ajenos a JAT Nexo | PASS |
| Backup y lógica | Copia V1 exacta y algoritmo/CRUD intactos | Backup funcional SHA 887c74527e4b2f9a7f85785ac6588062f3468993; nueve funciones centrales idénticas byte a byte, incluyendo coincide, guardar y eliminar | PASS |

Además, las pruebas con Firestore/DOM simulados verificaron todos los criterios de rechazo de coincidencias, doble guardado, referencia retenida tras error de escritura, desvinculación de propietarios/propiedades, eliminación de seguimientos asociados, escape HTML y URL de WhatsApp. El error permission-denied de esa prueba fue intencional y simulado.

## Registros QA creados y eliminados
| Colección | Identificación | ID | Estado final |
|---|---|---|---|
| clientes | QA V11 20261006 COMPRADOR | aLA33EWNuJSucown5Ot8 | Eliminado |
| clientes | QA V11 20261006 VENDEDOR | Kh4EtIn5b6IYTOMOjkbS | Eliminado |
| propiedades | QA V11 20261006 PROPIEDAD 100 | fxoB8ScZOcgM1fuMHli1 | Eliminado |
| seguimientos | Seguimiento del comprador QA | TFeIOaRVUQ5IjhY8lyJx | Eliminado |

La limpieza se verificó mediante recarga, lecturas de Firestore en tiempo real, listados y métricas. No quedaron datos QA ni el archivo temporal qa-responsive-v11.html.

## Cambios y diferencias respecto de V1
- index.html: UI V1.1, lateral de escritorio, navegación inferior móvil, dashboard con datos reales, tarjetas de clientes/propiedades, criterios de coincidencia visibles, estados de seguimiento, iconos SVG y ajustes de autocompletado.
- index-backup-v1-functional.html: nuevo backup exacto de V1 funcional, guardado antes del rediseño.
- README.md: documentación actualizada.
- QA-V1.1.md: este informe.
- index-backup-v1.html: conservado sin modificación.

Las diferencias son de presentación y navegación: métricas/resúmenes y accesos a acciones existentes; selección visual de operación sincronizada con el selector original; autocomplete=off en Nuevo cliente (el navegador puede decidir ignorarlo). No cambió Firebase, las colecciones, el modelo de datos, los estados ni el algoritmo de coincidencias. No se agregaron módulos, login, npm, IA ni dependencias instalables.

No se encontraron bugs funcionales. Durante la revisión visual se corrigió una prioridad CSS que coloreaba como primarios algunos botones secundarios y de eliminación.


## Revalidación independiente del estado actual — 2026-10-06

Repositorio revisado: `main`, commit `a13de26467cd43bdc53e632f62b2f868f999ecdf`, coincidente con el remoto al comenzar. El checkout estaba limpio. La implementación V1.1 ya estaba completa: dashboard con métricas reales, últimos clientes, próximos seguimientos y resumen de propiedades; navegación lateral e inferior; tarjetas y formularios responsive; iconos SVG y jerarquía de acciones. No se encontraron tareas pendientes de rediseño ni regresiones que justificaran modificar `index.html`.

`index-backup-v1-functional.html` coincide byte a byte con `index.html` del commit V1 `5bac0bd`. Las nueve funciones centrales `coincide`, `guardar`, `eliminar`, `leerInmueble`, `numero`, `texto`, `errorOperacion`, `abrirFormulario` y `prepararWhatsApp` coinciden con el backup funcional. Ambos backups se conservaron sin cambios.

Esta repetición se ejecutó con Playwright y Chromium 151 sobre el `index.html` actual servido localmente, usando Firebase CDN y Firestore real, con verificación HTTPS activa. No se volvió a publicar ni se ejecutó esta repetición sobre GitHub Pages. La publicación V1.1 había sido comprobada visualmente por el usuario; la prueba anterior sobre Pages se mantiene documentada arriba. No se usaron mocks de Firestore en esta repetición.

### Repetición de los 17 casos

| # | Caso | Resultado |
|---|---|---|
| 1 | Alta comprador con email opcional y selección múltiple | PASS |
| 2 | Listado en tiempo real del comprador | PASS |
| 3 | Alta vendedor y datos de propiedad | PASS |
| 4 | Cargar propiedad con propietario vinculado | PASS |
| 5 | Listado de propiedad guardada | PASS |
| 6 | Compatibilidad operación/tipo/barrio/moneda/precio/ambientes | PASS |
| 7 | Coincidencia comprador QA y propiedad QA | PASS |
| 8 | Seguimiento vinculado y persistido | PASS |
| 9 | Edición de cliente persiste tras recarga | PASS |
| 10 | Edición de propiedad persiste tras recarga | PASS |
| 11 | Navegación y Volver | PASS |
| 12 | Nuevo cliente limpio después de abandonar/guardar/editar | PASS |
| 13 | Campos obligatorios rechazados | PASS |
| 14 | Presupuesto negativo rechazado | PASS |
| 15 | Ambientes negativos rechazados | PASS |
| 16 | Precio negativo rechazado | PASS |
| 17 | Doble clic: un registro en cada colección | PASS |

Resultado: **17 PASS / 0 FAIL**, 17 casos ejecutados. Se comprobaron las altas mediante la interfaz y lecturas de Firestore, la persistencia después de recargar, los vínculos y los criterios de coincidencia. La validación de campos obligatorios y números negativos se comprobó con los estados de validez nativos del navegador. El doble clic se repitió en clientes, propiedades y seguimientos: un solo documento por alta. También se verificaron filtro y edición de seguimiento, y la eliminación por interfaz de los registros propios de QA. Ambos scripts de `index.html` pasaron nuevamente `node --check`; no hubo errores JavaScript de página.

### Escritorio y celular

Escritorio a 1363 px: dashboard revisado visualmente y E2E completo aprobado. Celular mediante viewports de Chromium a 320, 390 y 760 px: navegación inferior operativa y revisión del dashboard, Clientes, Propiedades, Coincidencias, Seguimientos y los tres formularios. En las 24 comprobaciones móviles `scrollWidth === clientWidth`; no hubo desbordamiento horizontal. El input de nombre conservó 16 px. Capturas del dashboard revisadas visualmente en los cuatro tamaños. Esta prueba no representa teclado virtual ni dispositivo físico, y los 17 casos de escritura se ejecutaron en escritorio.

### Limpieza y datos reales

Marcador exclusivo de esta ejecución: `QA V11 RECHECK 20261006124413`. Se crearon 3 clientes, 2 propiedades y 2 seguimientos QA. Los 7 registros se eliminaron al terminar. Las lecturas finales de las tres colecciones confirmaron **0 registros con este marcador**.

Estado inicial y final: **1 cliente, 0 propiedades y 0 seguimientos**. La comparación completa de los documentos existentes antes y después, incluyendo campos y metadatos de Firestore, fue idéntica. No se modificaron ni eliminaron datos reales. No se enviaron mensajes de WhatsApp.

Único archivo del repositorio actualizado por esta revisión: `QA-V1.1.md`, para registrar la nueva evidencia. No se agregaron funcionalidades ni se cambió la arquitectura.
