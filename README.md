# Backend-practica

No se ha utilizado Express generator para crear el proyecto y todo el código se ha codificado manualmente.

Para inicializar la base de datos se ha creado el fichero init-db.mjs que debe ser ejecutado con: node init-db.mjs

El API tiene la siguientes rutas:
* /adds GET para obtener los anuncios. El servicio cuenta con paginación y ordenación
* /adds POST para guardar una anuncio
* /tags GET para devolver las etiquetas usadas en los anuncios

Hay un fichero .env con la propiedad MONGO_PATH donde se indica la url a la base de datos Mongo.

En esta carpeta hay un fichero con la configuración de un proyecto de Soap UI para testar el API.

En la creación de anuncios se han metido validaciones para los siguientes campos:
* name, es obligatorio
* status, es obligatorio de tipo cadena y solo los valores 'se vende' o 'se busca' son válidos
* price, es obligatorio debe ser un número mayor que 0
* tags, solo los valores 'work', 'lifestyle', 'motor' o 'mobile' son válidos
