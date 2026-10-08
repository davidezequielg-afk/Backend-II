# Plataforma de gestion de Eventos.

## API REST para poder gestionar eventos y sesiones desde un solo lugar.

## Tecnologías de uso.
- NODE.JS.
- EXPRESS.
- MONGODB.
- MONGOOSE.
- DOTENV.

## Instalación.

1. Clonamos el repositorio completo a tu PC.
2. Ejecutas en una terminal ,con acceso a tu descarga.
```bash
npm install
```
3. Creamos el archivo .env, para copiarle dentro lo que se encuentra en el .env.example .

## Variables de entorno a tener en cuenta.
Dentro del archivo .env.example encontraremos todas las variables que se usan en nuestro programa, una vez que la copies en tu .env deberas completarle todos los campos de tu servidor, o cuales uses:
- MONGO_URL .
- PORT .
- NODE_ENV .
- JWT_SECRET .
- JWT_EXPIRES_IN .


## Ejecución.
Una vez completado los pasos anteriores, abrimos una terminal que este direccionada a la carpeta contenedora de la plataforma de gestion, y escribimos lo siguiente:
```bash
npm run dev
```
Y tu servidor ya debe estar corriendo.


## Responsabilidades de cada carpeta.
- config:
En esta carpeta haremos la configuración del puerto y del acceso a la base de datos.
- controllers:
En esta carpeta se crearan los archivos que reciban los requests y preparen los responses.
- dao: 
Aca reuniremos las consultas que van directamente a la base de datos.
- middlewares:
Aca se encuentran las funciones que corren antes de que lleguen al controlador, son los validadores de cada request.
- models:
Aca vamos a definir la forma que tendran los datos de los eventos, usuarios.
- repositories:
Se encuentran los archivos que funcionaran como intermediarios entre los servicios y la base de datos.
- routes:
Aca vamos a definir los endpoints que vayamos a necesitar, importante a la hora de crear nuevos es que este mismo utilice el controller correspondiente.
- services:
Aca vamos a tener contenido toda la logica que tendra el negocio.
- utils: 
Aca se encuentran las fuciones que reutilizamos en todo el codigo. Cuidado con cambiarlas ya que podemos romper el sistema de gestion.

## Reglas de negocio.
En la siguiente lista se redactaran las reglas que tiene el negocio con respecto a los eventos que se vayan creando:
- No se puede crear un evento con fecha pasada.
- La capacidad tiene que ser un numero entero, y siempre mayor a 0.
- El precio tiene que ser mayor o igual a 0.
- Un organizer no modifica eventos ajenos, pero el admin sí.
- Un evento cancelado no se puede modificar, ni cambiar de estado.
- Cancelar es cambiar el status a cancelled, nunca se borra un evento.
- Transiciones permitidas de estado: draft a published, published a finished, y desde draft o published a cancelled.

## Roles y autorizaciones.
Nos encontraremos con 3 roles, cada uno con sus permisos.
- 'User': usuario basico, no tiene ningun permiso de modificación en ningun aspecto, exepto de su email y contraseña.
- 'Organizer': usuario con accesos privilejiados, tiene permisos de creacion y modificación de eventos (siempre y cuando sean los creados por el mismo, si algun evento está creado por otro organizer no podran ser modificados).
- 'admin': usuario con acceso completo, tiene permisos para realizar cualquier modificación de eventos, sin importar que usuario organizador lo haya creado.

## Endpoints disponibles.

- GET /api/health . Genera una respuesta de si el servidor se encuentra en funcionamiento.

- GET /api/sessions/current . Genera una lista de los datos de la cuenta logeada, solo puede ser vista por un admin.

- GET /api/users . Permite ver los usuarios que se registraron. Solo permitido para admin.

- GET /api/events . Genera una lista de los eventos disponibles. Si son muchos los eventos se van separando en paginas, ademas se pueden
establecer maneras de ordenarlos (segun fecha, u orden alfabetico), o por filtros.(acceso publico).

- GET /api/events/:id . Nos permite tener la visualizacion de un evento en particular.(acceso publico).

- POST /api/sessions/register . Agrega con este endpoint a los usuarios nuevos.

- POST /api/sessions/login . Este endpoint es el que te permite logear a tu cuenta de la plataforma.

- POST /api/sessions/logout . Este endpoint realiza la actividad de cierre de sesion de la cuenta.

- POST /api/events . Este endpoint agrega los eventos nuevos, siempre y cuando haya autorizacion de admin u organizador.

- PUT /api/events/:id . Este permite la actualización de algun evento. Solo admitido para admin, y organizer (solo puede sus propios eventos).

- PATCH /api/events/:id/status . Este nos permite cambiar los estados de cada evento. Solo admitido para admin, y organizer (solo puede sus propios eventos).

### Filtros disponibles.
El la seccion de "Endpoints disponibles" tenemos al que se llama: "GET /api/events" al cual se le pueden agregar parametros para su correcto y mejor uso ( antes de colocar un filtro siempre se debe agregar el signo " ? ", de otro modo no se podra filtrar dicho contenido).Esto son:

- status . Este se encarga de filtar dependiendo del estado en el que se encuentre ese evento. Los estados disponibles para su filtrado son: draft, published, finished, cancelled. Un ejemplo puede ser:
    ?status=draft

- category . Este se encarga de filtar por categoria ( esta opcion queda a cargo de admin u organizer que son quienes crean los eventos). Un ejemplo de este es:
    ?category=festival

- location . Este se encarga de filtrar por lugar en donde se celebrara el evento.
    ?location=Buenos Aires

- dateFrom , dateTo . Este se encarga filtrar por rango de fecha.
    ?dateFrom=2026-11-01 
    ?dateTo=2026-11-25

- page , limit . Este se encarga de crear la paginacion de los eventos (Por defecto viene page=1, limit=10)
    ?page=2&limit=5

- sort . Y este se encaga de ordenar los eventos por campo solicitado.
    ?sort=date

### Respuestas disponibles.

- 200: usuario logeado,
- 201: usuario registrado exitosamente,
- 400: campos incompletos o formato inválido,
- 401: no existe una cookie de sesión, el token es inválido o venció,
- 403: el usuario está autenticado, pero su rol no cuenta con el permisos para realizar accion,
- 404: objeto o consulta inexistente,
- 409: email duplicado (email ya registrado),
- 500: error interno del servidor,

## Registro de Usuarios.

### Campos necesarios y esperados.
- `first_name` : Nombre del usuario (OBLIGATORIO).
- `last_name` : Apellido del usuario (OBLIGATORIO).
- `email` : Correo electrónico valido (OBLIGATORIO).
- `password` : Contraseña (OBLIGATORIO(Debe contener al menos 8 caracteres)).

El campo `role` no debe enviarse. Ya que el sistema lo designa automáticamente como `user`.

#### Ejemplo de solicitud.
A continuacion se ejemplifica la manera en la que debe estar el json de los datos necesarios:

```json
{
    "first_name": "Juan",
    "last_name": "Cabrera",
    "email": "juan@example.com",
    "password": "Juan1234"
}
```

## Login de Usuarios.

### Campos necesarios y esperados.
- `email`: Correo electronico valido, el cual fue usado en el Registro del usuario.
- `password` : Contraseña valida, la cual fue usada en el Registro del usuario.

#### Ejemplo de solicitud.

```json
{
    "email": "juan@example.com",
    "password": "Juan1234"
}
```

## Cierre de Sesion (Logout de Usuarios).

### Campos necesarios.
Esn este caso no se esperan ni se necesitan campos para completar, ya que se hace borrando las cookies del login desde cada ordenador y de manera indeoendiente con cada usuario.

## Creacion de eventos.

### Campos necesarios y esperados.
- `title`: Titulo del evento.
- `description`: Descripcion del evento a crear.
- `date`: Fecha y horario del evento.
- `location`: Lugar a llevarse a cabo el evento.
- `category` : Categoria que tendrá el evento (Queda a cargo de la persona que cree el evento, y las normas del negocio).
- `capacity` : Capacidad que tendrá el evento.
- `price` :  Precio que tendra cada entrada al evento.

## Evidencias de Uso.
### A continuacios se veran, en formato de imagenes, las evidencias de como se verian el uso de las RUTAS mediante el uso del programa de POSTMAN.


#### Endpoints GET
- GET /api/health .
Aqui se vera si el servidor se encuentra vivo (es decir en uso correcto).
- Respuesta esperada:

```json
{
  "status": "ok",
  "message": "Servidor activo"
}
```

![GET /api/health](images/GET%20-api-health..png)

- GET /api/sessions/current .
Aqui vemos el current (lista de sesiones) antes de realizar el login correspondiente para el uso de la sesion.
- Respuesta esperada:

```json
{
  "message": "Usuario no autenticado"
}
```

![GET /api/sessions/current](images/GET%20-api-sessions-current%20no%20login.png)

- GET /api/sessions/current .
Aqui vemos el current (lista de sesiones) luego de realizar el login correspondiente para el uso de la sesion.
- Respuesta esperada:

```json
{
  "user": {
    "id": "id-del-usuario",
    "email": "juan@example.com",
    "role": "user"
  }
}
```

![GET /api/sessions/current](images/GET%20-api-sessions-current%20login.png)

- GET /api/users .
En esta prueba se puede ver cuales son los clientes creados, solo puede verlo un administrador (admin).
- Respuesta esperada:

```json
{
  "status": "success",
  "payload": [
    {
      "id": "id-del-usuario",
      "first_name": "nombre-de-usuario",
      "last_name": "apellido-de-usuario",
      "email": "juan@example.com",
      "role": "user",
      "__v": 0
    }
    {
      "_id": "id-del-usuario",
      "first_name": "admin",
      "last_name": "admin",
      "email": "admin@example.com",
      "role": "admin",
      "__v": 0
    },
    {
      "_id": "id-del-usuario",
      "first_name": "organizer",
      "last_name": "organizer",
      "email": "organizer@example.com",
      "role": "organizer",
      "__v": 0
    }
  ]
}
```

![GET /api/users (vista solo admin)](images/GET%20-api-users(admin).png)

- GET /api/events .
Aquí se veran los eventos que fueron creados. Este endpoint es de acceso publico, no hace falta estar logeado.
- Repuesta esperada:

```json
{
  "status": "success",
  "payload": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1,
    "data": [{
      "_id": "id-del-evento",
      "title": "titulo-del-evento",
      "description": "descripcion-del-evento",
      "date": "fecha-del-evento(2026-11-21T21:00:00.000Z)",
      "location": "lugar-del-evento",
      "category": "categoria-del-evento",
      "capacity": 100,
      "price": 20000,
      "status": "estado-del-evento",
      "organizer": "creador-del-evento",
      "__v": 0
  }]
  }
}
```

![GET /api/events](images/GET%20-api-events.png)

- GET /api/events/:id .
Aquí se vera el evento por id. Este endpoint es de acceso publico, no hace falta estar logeado.
- Repuesta esperada:

```json
{
  "status": "success",
  "payload": {
      "_id": "id-del-evento",
      "title": "titulo-del-evento",
      "description": "descripcion-del-evento",
      "date": "fecha-del-evento(2026-11-21T21:00:00.000Z)",
      "location": "lugar-del-evento",
      "category": "categoria-del-evento",
      "capacity": 100"(capacidad-del-evento)",
      "price": 20000"(precio-del-evento)",
      "status": "estado-del-evento",
      "organizer": "creador-del-evento",
      "__v": 0
  }
}
```
![GET /api/events/:id](images/GET%20-api-events-id.png)

- GET /api/events con parametros .
Ejemplo: "GET /api/events?status=published&category=Festival&page=2&limit=5"
Aqui se vera la cantidad de eventos cuando le ponemos filtros a la busqueda 
- Repuesta esperada:
```json
{
    "status": "success",
    "payload": {
        "page": 2,
        "limit": 5,
        "total": 0,
        "totalPages": 0,
        "data": []
    }
}
```
![GET /api/events con parametros](images/GET%20-api-events-con-filtros.png)

#### Endpoints POST

- POST /api/sessions/register .
En la siguiente imagen se ve como y cuales son los campos necesarios para la creacion de un o los usuario/s.
- Respuesta esperada:

```json
{
    "message": "Usuario registrado exitosamente",
    "user": {
        "id": "id-del-usuario",
        "first_name": "nombre-de-usuario",
        "last_name": "apellido-de-usuario",
        "email": "juan@example.com",
        "role": "user"
    }
}
```

![POST /api/sessions/register](images/POST%20-api-sessions-register.png)

- POST /api/sessions/register . (Con usuario duplicado)
En la siguiente imagen se ve como y cuales son los campos necesarios para la creacion de un usuario ya existente
- Respuesta esperada:

```json
{
  "message": "El email ya está registrado"
}
```

![POST /api/sessions/register duplicado](images/POST%20-api-sessions-register%20duplicado.png)

- POST /api/sessions/login .
En esta se demuestran los datos y campos necesarios para realizar un login exitoso.
- Respuesta esperada:

```json
{
  "message": "Inicio de sesión exitoso"
}
```

![POST /api/sessions/login](images/POST%20-api-sessions-login.png)

- POST /api/sessions/login .(Con datos incorrectos)
En esta se demuestran los datos y campos necesarios para realizar un login defectuoso.
- Respuesta esperada:

```json
{
  "message": "Credenciales inválidas"
}
```

![POST /api/sessions/login (con datos incorrectos)](images/POST%20-api-sessions-login%20datos%20incorrectos.png)

- POST /api/sessions/logout .
En esta se muestra la respuesta de un logout exitoso.
- Respuesta esperada:

```json
{
  "message": "Cierre de sesión exitoso"
}
```

![POST /api/sessions/logout](images/POST%20-api-sessions-logout%20logeado.png)

- POST /api/sessions/logout .(sin iniciar sesion antes)
En esta prueba se demuestra que primero hay que iniciar sesion antes de hacer un logout
- Respuesta esperada:
```json
{
  "message": "Usuario no autenticado"
}
```

![POST /api/sessions/logout no logeado](images/POST%20-api-sessions-logout%20no%20logeado.png)

- POST /api/events .
En esta prueba veremos como subir un evento, (solo admitido para organizers, y admins).
- Respuesta esperada:
```json
{
  "status": "success",
  "payload": {
      "_id": "id-del-evento",
      "title": "titulo-del-evento",
      "description": "descripcion-del-evento",
      "date": "fecha-del-evento(2026-11-21T21:00:00.000Z)",
      "location": "lugar-del-evento",
      "category": "categoria-del-evento",
      "capacity": 100"(capacidad-del-evento)",
      "price": 20000"(precio-del-evento)",
      "status": "estado-del-evento",
      "organizer": "creador-del-evento",
      "__v": 0
  }
}
```

![POST /api/events](images/POST%20-api-events.png)

#### Endpoints PUT.

- PUT /api/events .
En este endpoint veremos como actualizar un evento, solo para admins y organizers, (los admins, pueden actualizar cualquier evento. Un organizer solo los creados por el mismo).
- Respuesta esperada:
```json
{
  "status": "success",
  "message": "Evento actualizado"
  "payload": [{
      "_id": "id-del-evento",
      "title": "titulo-del-evento",
      "description": "descripcion-del-evento",
      "date": "fecha-del-evento(2026-11-21T21:00:00.000Z)",
      "location": "lugar-del-evento",
      "category": "categoria-del-evento",
      "capacity": 100"(capacidad-del-evento)",
      "price": 20000"(precio-del-evento)",
      "status": "estado-del-evento",
      "organizer": "creador-del-evento"
  }]
}
```

![PUT /api/events](images/PUT%20-api-events.png)

#### Endpoints PATCH.

- PATCH /api/events/:id/status En este endpoint veremos como actualizar el estado (status), de cada evento, solo para admins y organizers, (los admins, pueden actualizar cualquier evento. Un organizer solo los creados por el mismo).
- Respuesta esperada:
```json
{
    "status": "success",
    "message": "El estado del evento ha sido actualizado  ",
    "payload": {
        "_id": "6ac70aaba10cb2877e6e14b7",
        "title": "MotoCrash",
        "description": "Festival de Motos",
        "date": "2026-11-21T21:00:00.000Z",
        "location": "Olimpo",
        "category": "Motos",
        "capacity": 227,
        "price": 20000,
        "status": "published",
        "organizer": "6ac707e1e01f1191576e54d3",
        "__v": 0
    }
}
```

![PATCH /api/events/:id/status](images/PATCH%20-api-events-id-status.png)

## Estrategias de autenticación
### Para uso de autenticadores externos
- Desde ahora la autenticación se encuentra centralizada en `src/config/passport.config.js` mediante el uso de las estrategias de Passport: `register`, `login` y `current`
- Esto permitirá agregar futuros proveedores de autenticación como por ejemplo, Google o GitHub, dado que no haría falta cambiar o modificar el archivo `app.js`