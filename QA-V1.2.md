# Validación JAT Nexo V1.2

Fecha: 2026-10-06 (America/Buenos_Aires).

## Versión y baseline

Backup obligatorio: `index-backup-v1.1-certified.html`, creado antes de modificar código y comprobado byte a byte contra la V1.1 certificada (`a13de26467cd43bdc53e632f62b2f868f999ecdf`). SHA-256: `621486eeee82f365bf0836d683141262840af03d4f47d62d059412697db359b0`. Se conservaron todos los backups anteriores sin cambios.

## Cambios

Rediseño completo de CSS: lateral azul marino con identidad JAT Nexo, dashboard más compacto, tipografía de sistema, paleta verde/arena/lavanda/terracota, sombras suaves y tarjetas responsive. Las propiedades tienen una cabecera dedicada, preparada visualmente para futuras fotos, sin imágenes ficticias. Coincidencias mantiene Cliente ↔ Propiedad y los seis criterios explícitos. Seguimientos conserva estados en badges y jerarquía de fecha/nota. Todos los indicadores usan Firestore real, sin métricas inventadas.

- **UX-01:** un único selector Comprar / Alquilar / Vender / Poner en alquiler. Mantiene los valores anteriores de `operacion` en Firestore. Se retiraron los botones duplicados y sus handlers.
- **UX-02:** nombre y Ver ficha abren una consulta de solo lectura con contacto, operación, tipos, barrios, ambientes, moneda, presupuesto y, cuando corresponde, inmueble del propietario. Editar cliente es una acción explícita que abre el formulario.
- **UX-03:** Clientes muestra directamente buscador, listado y + Nuevo cliente. Se conserva el destino interno clientesLista como alias compatible.
- **UX-04:** fechas visibles DD/MM/AAAA en dashboard, listados y formulario. La entrada numérica inserta barras; rechaza fechas imposibles y guarda ISO AAAA-MM-DD. No se migraron fechas existentes.

Firebase, colecciones, esquema y arquitectura permanecen sin cambios. No se agregaron npm, login, usuarios, IA ni funcionalidades de negocio. Las funciones coincide, eliminar, leerInmueble, numero, texto, errorOperacion, abrirFormulario y prepararWhatsApp se compararon con el backup y permanecen idénticas. guardar solo cambia la conversión de fecha visible a ISO.

## Validación previa a publicación

**17 E2E PASS / 0 FAIL + 22 UAT PASS / 0 FAIL = 39 PASS / 0 FAIL.** Chromium 151, aplicación V1.2 servida localmente y Firestore real. Las pruebas se ejecutaron desde la interfaz; las lecturas API sirvieron para inventario, unicidad y conservación, no para sustituir los flujos de usuario. No se enviaron mensajes: WhatsApp se canceló antes de conectar con wa.me.

### E2E técnico — repetición publicada

| Caso | Escenario | Resultado | Evidencia |
|---|---|---|---|
| 1 | Alta de comprador | PASS | [Captura](/workspace/v1.2-published-e2e-evidence/case-01.png) |
| 2 | Clientes guardados | PASS | [Captura](/workspace/v1.2-published-e2e-evidence/case-02.png) |
| 3 | Alta de vendedor | PASS | [Captura](/workspace/v1.2-published-e2e-evidence/case-03.png) |
| 4 | Propiedad vinculada | PASS | [Captura](/workspace/v1.2-published-e2e-evidence/case-04.png) |
| 5 | Listado de propiedades | PASS | [Captura](/workspace/v1.2-published-e2e-evidence/case-05.png) |
| 6 | Datos compatibles | PASS | [Captura](/workspace/v1.2-published-e2e-evidence/case-06.png) |
| 7 | Coincidencia correcta | PASS | [Captura](/workspace/v1.2-published-e2e-evidence/case-07.png) |
| 8 | Seguimiento | PASS | [Captura](/workspace/v1.2-published-e2e-evidence/case-08.png) |
| 9 | Editar cliente y persistencia | PASS | [Captura](/workspace/v1.2-published-e2e-evidence/case-09.png) |
| 10 | Editar propiedad y persistencia | PASS | [Captura](/workspace/v1.2-published-e2e-evidence/case-10.png) |
| 11 | Navegación y Volver | PASS | [Captura](/workspace/v1.2-published-e2e-evidence/case-11.png) |
| 12 | Nuevo cliente limpio | PASS | [Captura](/workspace/v1.2-published-e2e-evidence/case-12.png) |
| 13 | Campos obligatorios | PASS | [Captura](/workspace/v1.2-published-e2e-evidence/case-13.png) |
| 14 | Presupuesto negativo | PASS | [Captura](/workspace/v1.2-published-e2e-evidence/case-14.png) |
| 15 | Ambientes negativos | PASS | [Captura](/workspace/v1.2-published-e2e-evidence/case-15.png) |
| 16 | Precio negativo | PASS | [Captura](/workspace/v1.2-published-e2e-evidence/case-16.png) |
| 17 | Doble clic en Guardar | PASS | [Captura](/workspace/v1.2-published-e2e-evidence/case-17.png) |

### UAT de negocio — repetición publicada

| Caso | Escenario | Resultado | Obtenido | Evidencia |
|---|---|---|---|---|
| 1 | Comprador | PASS | Comprador único, encontrado por búsqueda y campos exactos después de recargar. | [Captura](/workspace/v1.2-published-uat-evidence/case-01.png) |
| 2 | Inquilino | PASS | Inquilino diferenciado por operación, zona y presupuesto; formulario correcto. | [Captura](/workspace/v1.2-published-uat-evidence/case-02.png) |
| 3 | Vendedor | PASS | Vendedor e inmueble guardados con los seis datos solicitados. | [Captura](/workspace/v1.2-published-uat-evidence/case-03.png) |
| 4 | Cargar propiedad del vendedor | PASS | Precarga correcta, Venta y propietario vinculado; catálogo y edición confirmados. | [Captura](/workspace/v1.2-published-uat-evidence/case-04.png) |
| 5 | Buscar cliente existente | PASS | Búsqueda exacta devolvió un solo comprador; todos los campos originales coinciden. | [Captura](/workspace/v1.2-published-uat-evidence/case-05.png) |
| 6 | Primera coincidencia | PASS | Coincidencia visible con comprador, propiedad y seis criterios explicados. | [Captura](/workspace/v1.2-published-uat-evidence/case-06.png) |
| 7 | Segunda propiedad compatible | PASS | Dos coincidencias del comprador: Gorriti y Cabildo. | [Captura](/workspace/v1.2-published-uat-evidence/case-07.png) |
| 8 | Propiedad no compatible | PASS | Libertador aparece en catálogo pero no coincide con el comprador. | [Captura](/workspace/v1.2-published-uat-evidence/case-08.png) |
| 9 | Edición que genera coincidencia | PASS | Cliente adicional: presupuesto USD 100.000 → USD 115.000; pasó de 0 a 1 coincidencia (Gorriti) automáticamente. | [Captura](/workspace/v1.2-published-uat-evidence/case-09.png) |
| 10 | Edición que elimina coincidencia | PASS | Cabildo USD 115.000 → USD 130.000 eliminó la coincidencia; restaurar USD 115.000 la recuperó. | [Captura](/workspace/v1.2-published-uat-evidence/case-10.png) |
| 11 | Edición de cliente | PASS | USD 125.000 persistió tras guardar, recargar y buscar de nuevo. | [Captura](/workspace/v1.2-published-uat-evidence/case-11.png) |
| 12 | Edición de propiedad | PASS | Gorriti USD 112.000 persistente; coincidencia conservada. | [Captura](/workspace/v1.2-published-uat-evidence/case-12.png) |
| 13 | Seguimiento comercial | PASS | Cliente, Gorriti, fecha 08/10/2026, Contactado y nota persistieron después de recargar. | [Captura](/workspace/v1.2-published-uat-evidence/case-13.png) |
| 14 | Evolución del seguimiento | PASS | Visita agendada y nota actualizada persistieron después de recargar. | [Captura](/workspace/v1.2-published-uat-evidence/case-14.png) |
| 15 | WhatsApp | PASS | Botón abrió wa.me/12025550101 con mensaje del comprador; navegación cancelada antes de conectar, sin envío. | [Captura](/workspace/v1.2-published-uat-evidence/case-15.png) |
| 16 | Cambio entre clientes | PASS | Formularios independientes; Nuevo cliente vacío. Sin sugerencias de autocompletado visibles en perfil limpio; valores DOM comprobados. | [Captura](/workspace/v1.2-published-uat-evidence/case-16.png) |
| 17 | Persistencia general | PASS | Cuatro clientes QA, tres propiedades y seguimiento conservados; comprador con dos coincidencias y cliente adicional con una. | [Captura](/workspace/v1.2-published-uat-evidence/case-17.png) |
| 18 | Dashboard | PASS | Dashboard contrastado con inventario completo Firestore y listados: [5, 3, 3, 1]. Seguimientos representa abiertos, según etiqueta. | [Captura](/workspace/v1.2-published-uat-evidence/case-18.png) |
| 19 | Navegación | PASS | Circuito de navegación completo sin superposición, botones sin respuesta ni errores JavaScript. | [Captura](/workspace/v1.2-published-uat-evidence/case-19.png) |
| 20 | Validaciones de usuario | PASS | Seis guardados inválidos intentados con botón y rechazados; inventario sin cambios. Doble clic creó exactamente un cliente QA. | [Captura](/workspace/v1.2-published-uat-evidence/case-20.png) |
| 21 | Uso desde celular | PASS | Circuito completo a 390×844: búsqueda, alta y consulta de cliente, alta y consulta de propiedad, coincidencia y seguimiento. 12 controles comprobados visibles, no tapados y altura ≥40 px; sin overflow; navegación inferior activa. | [Captura](/workspace/v1.2-published-uat-evidence/case-21.png) |
| 22 | Día completo del agente | PASS | Jornada completa desde el dashboard hasta contacto preparado, seguimiento evolucionado a visita y revisión de todos los vínculos después de recargar. Sin comunicación externa. | [Captura](/workspace/v1.2-published-uat-evidence/case-22.png) |

## Regresión encontrada y corregida

La primera UAT local obtuvo 21 PASS / 1 FAIL: el nombre clickable que abre la ficha tenía un área táctil demasiado pequeña en móvil. Se amplió a 44 px y se repitieron los 22 escenarios completos: 22 PASS / 0 FAIL. Esta repetición completa, y no una comprobación aislada, es la certificación final local. La evidencia de la primera ejecución se conserva fuera del checkout en `/workspace/v1.2-uat-first-run/`.

## Escritorio y celular

Revisión visual de dashboard, Clientes, ficha, edición, Propiedades, Coincidencias y Seguimientos. Escritorio a 1363 px (revisión adicional a 1440 px) y circuito móvil 390 × 844 px: Inicio → Clientes → buscar → ficha → Nuevo cliente → Propiedades → Coincidencias → Seguimientos → Inicio. Sin overflow horizontal en los puntos verificados, controles accesibles y no tapados después de desplazarse, navegación inferior operativa y formularios de 16 px. El nombre que abre la ficha tiene altura táctil de 44 px.

Las cuatro operaciones se verificaron adicionalmente sin escrituras: Comprar/Alquilar muestran búsqueda y Vender/Poner en alquiler muestran inmueble. La fecha 31/02/2027 fue rechazada sin crear documento; 08102026 se transformó en 08/10/2026 y persistió como 2026-10-08. Los dos scripts pasaron node --check. No hubo errores JavaScript de página en las baterías aprobadas.

La prueba móvil usa viewport de Chromium; no cubre dispositivo físico, teclado virtual real ni otros navegadores.

## QA y conservación

| Batería local aprobada | Clientes QA | Propiedades QA | Seguimientos QA | Total creados/eliminados |
|---|---:|---:|---:|---:|
| E2E 17 | 3 | 2 | 2 | 7 / 7 |
| UAT 22 | 6 | 4 | 3 | 13 / 13 |

Los registros de prueba se identificaron como QA-E2E o QA-UAT. En las baterías locales aprobadas se eliminaron todos desde la interfaz; no se necesitaron borrados API de emergencia. También se limpiaron los 10 QA de la primera UAT fallida. Cada limpieza se limitó a IDs propios y se verificó contra el inventario inicial.

Se leyeron completas y con paginación clientes, propiedades y seguimientos. Después de cada batería: **0 QA restantes**, **1 cliente real / 0 propiedades / 0 seguimientos**, y comparación exacta de IDs, campos y metadatos reales antes/después. Ningún dato real fue editado ni eliminado.

## Publicación

V1.2 se publicó completa en GitHub Pages mediante el commit `389e808`, después de los 39 PASS locales. Se comprobó byte a byte el archivo servido frente al index.html validado. Después se repitieron ambas baterías sobre `https://jat-nb.github.io/jat-nexo/?v=389e808`: **17 E2E PASS / 0 FAIL + 22 UAT PASS / 0 FAIL = 39 PASS / 0 FAIL**. Las tablas anteriores enlazan ahora las capturas de esta repetición publicada. No hubo cambios de aplicación entre la validación local y la publicada.

SHA-256 del index.html validado: `de407b3a1edc07ce14bcaaeaae4aaad89749e85e8a24472582c89ae96ddd2435`.

## QA de la repetición publicada

| Batería | Clientes QA | Propiedades QA | Seguimientos QA | Total creados/eliminados |
|---|---:|---:|---:|---:|
| UAT publicada | 6 | 4 | 3 | 13 / 13 |
| E2E publicado | 3 | 2 | 2 | 7 / 7 |

En la repetición publicada se crearon y eliminaron **20 QA**. Sumando la primera ejecución local (10), la validación local aprobada (20) y la repetición publicada (20), se crearon y eliminaron **50 registros QA en total**. Todos los borrados de V1.2 se realizaron desde la interfaz, acotados a IDs propios. No quedaron registros QA-E2E ni QA-UAT. Las lecturas completas y paginadas de las tres colecciones conservaron exactamente el inventario real inicial. Estado final: **1 cliente real / 0 propiedades / 0 seguimientos**. Se recargó GitHub Pages después de cada limpieza.

[Dashboard final publicado](/workspace/v1.2-published-e2e-evidence/final-clean-dashboard.png) · [Dashboard móvil publicado](/workspace/v1.2-published-uat-evidence/mobile-dashboard.png) · [Ficha de cliente](/workspace/v1.2-published-e2e-evidence/client-detail.png).

Archivos de V1.2: index.html, README.md, QA-V1.2.md e index-backup-v1.1-certified.html. Los informes históricos QA-V1.1.md y UAT-V1.1.md de la baseline quedaron guardados en el mismo commit sin reinterpretar sus resultados. Los backups anteriores se conservaron byte a byte.
