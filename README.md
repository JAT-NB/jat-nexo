# JAT Nexo

Asistente inmobiliario para agentes. V1 web compatible con GitHub Pages, sin npm ni instalación de dependencias. Conserva el proyecto Firebase `jat-nexo`, Firestore y Firebase modular por CDN.

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

- `index.html`: V1 completa con HTML, CSS y JavaScript.
- `index-backup-v1.html`: copia exacta de la versión anterior a V1.

## Verificación

Sintaxis JavaScript comprobada con `node --check`. Pruebas con Firestore y DOM simulados para navegación, clientes, bloqueo de doble clic, limpieza, reintentos, vínculos, seguimientos, borrados, criterios de coincidencia, escape de HTML y URL de WhatsApp. Los archivos Firebase del CDN respondieron HTTP 200. No se escribieron datos de prueba en Firestore real. La prueba de integración real depende de los permisos/configuración del proyecto Firebase; no se realizó prueba visual con navegador local.
