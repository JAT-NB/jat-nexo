# JAT Nexo

Asistente inmobiliario para agentes. V1.2 web compatible con GitHub Pages, sin npm ni instalación de dependencias. Conserva el proyecto Firebase `jat-nexo`, Firestore y Firebase modular por CDN.

## Interfaz V1.2

Dashboard compacto con métricas reales, últimos clientes, próximos seguimientos y resumen de propiedades. Menú lateral azul marino, navegación inferior móvil, paleta verde, arena y lavanda e iconos SVG sin dependencias instalables. Fichas inmobiliarias sin imágenes ficticias y coincidencias con criterios explícitos. Se conserva el algoritmo certificado de V1.1.

Clientes abre directamente el buscador y el listado. El nombre o **Ver ficha** abre una consulta de solo lectura; **Editar cliente** abre el formulario. La operación se elige una sola vez entre **Comprar**, **Alquilar**, **Vender** y **Poner en alquiler**, conservando los valores existentes en Firestore.

Las fechas se muestran y escriben como **DD/MM/AAAA**. El teclado numérico puede ingresar ocho dígitos: se agregan automáticamente las barras. Las fechas imposibles se rechazan; Firestore conserva `AAAA-MM-DD`.

## Uso

- **Clientes:** alta, listado en tiempo real, búsqueda, edición con confirmación y eliminación con confirmación. Compradores, inquilinos, vendedores y propietarios que alquilan. Email opcional y teléfono con código de país para WhatsApp.
- **Propiedades:** alta, listado, búsqueda, edición y eliminación. Venta/alquiler, estado y propietario opcional vinculado a un cliente.
- **Coincidencias:** propiedades disponibles con la misma operación y moneda, tipo seleccionado, barrio coincidente, precio menor o igual al presupuesto y ambientes mayores o iguales al mínimo solicitado. Los barrios de búsqueda se separan con `+`; cada propiedad tiene un barrio. Se ignoran mayúsculas, acentos y espacios adicionales. No se convierten monedas ni se usan coincidencias aproximadas.
- **Seguimientos:** cliente, propiedad opcional, estado, fecha y nota. Alta, edición, eliminación, filtro por estado y señal de fechas vencidas.
- **WhatsApp:** prepara el texto mediante `wa.me`. El usuario revisa y envía el mensaje; no hay envío automático ni API paga.

Los datos de una propiedad en la ficha de un vendedor se conservan en `clientes`. El botón **Cargar propiedad** abre un alta precompletada con el propietario vinculado: hay que guardarla para incluirla en el catálogo y las coincidencias. Si ya existe la misma dirección para ese propietario, abre su edición. Los datos del catálogo se editan por separado de los datos de la ficha del cliente.

Eliminar un cliente elimina sus seguimientos y deja sus propiedades sin propietario, conservando las propiedades. Eliminar una propiedad conserva sus seguimientos y quita el vínculo con esa propiedad. Las operaciones se realizan en un lote de Firestore; si exceden 450 cambios, la interfaz solicita reducir los vínculos antes de eliminar.

## Firestore

Colecciones: `clientes` (compatible con registros anteriores), `propiedades` y `seguimientos`. Fechas de creación/actualización mediante `serverTimestamp`. Las reglas existentes deben permitir las operaciones necesarias sobre estas colecciones. Esta versión no incorpora login ni modifica reglas de seguridad. Los errores de lectura/escritura se muestran en pantalla; las escrituras fallidas conservan el formulario para reintentar.

## Archivos

- `index.html`: V1.2 con HTML, CSS y JavaScript.
- `index-backup-v1.1-certified.html`: backup exacto e inmutable de la V1.1 certificada.
- `index-backup-v1.html`: copia exacta de la versión anterior a V1, conservada.
- `index-backup-v1-functional.html`: copia exacta de la V1 funcional antes del rediseño.
- `QA-V1.1.md`: informe histórico del E2E y pruebas responsive.
- `UAT-V1.1.md`: informe histórico de los 22 escenarios de negocio.
- `QA-V1.2.md`: evidencia de la repetición E2E/UAT y revisión de las cuatro mejoras UX.

## Verificación

V1.2: **17 E2E PASS + 22 UAT PASS = 39 PASS / 0 FAIL**, sobre la aplicación publicada, con Firestore real, escritorio y circuito móvil 390 × 844. Las cuatro mejoras UX y la limpieza se documentan en [QA-V1.2.md](QA-V1.2.md).

V1.1 publicada probada en Chrome con Firestore real: **17 PASS / 0 FAIL** en el flujo E2E de V1. Se verificaron escritorio y vista responsive de 320, 390 y 760 px, sin overflow horizontal. Los cuatro registros QA fueron eliminados al terminar. Detalles, resultados esperados/obtenidos y limitaciones en [QA-V1.1.md](QA-V1.1.md).

Ambos scripts pasaron `node --check`. Nueve funciones centrales se compararon byte a byte con la V1 funcional. Pruebas adicionales con DOM/Firestore simulados comprobaron criterios de coincidencia, reintentos, doble guardado, vínculos, borrados, escape HTML y URL de WhatsApp.
