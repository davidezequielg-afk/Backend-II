# Plataforma de gestion de Eventos.

## API REST para poder gestionar eventos y sesiones desde un solo lugar.

## Tecnologías de uso.
- NODE.JS.
- EXPRESS.
- MONGODB.
- MONGOOSE.
- DOTENV.
- PASSPORT.
- JWT.
- bcrypt.
- COOKIE-PARSER.
- NODEMAILER.

## Instalación.

1. Clonamos el repositorio completo a tu PC.
2. Ejecutas en una terminal ,con acceso a tu descarga.
```bash
npm install
```
3. Creamos el archivo .env, para copiarle dentro lo que se encuentra en el .env.example . Para completarlo con los valores propios, del servidor a crear.

## Variables de entorno a tener en cuenta.
Dentro del archivo .env.example encontraremos todas las variables que se usan en nuestro programa, una vez que la copies en tu .env deberas completarle todos los campos de tu servidor, o cuales uses:
- MONGO_URL .
- PORT .
- NODE_ENV .
- JWT_SECRET .
- JWT_EXPIRES_IN .
- MAIL_HOST : servidor SMTP.
- MAIL_PORT : puerto del SMTP.
- MAIL_USER : usuario del SMTP.
- MAIL_PASS : contraseña del SMTP.
- MAIL_FROM : dirección que figura como remitente.


## Ejecución.
Una vez completado los pasos anteriores, abrimos una terminal que este direccionada a la carpeta contenedora de la plataforma de gestion, y escribimos lo siguiente:
```bash
npm run dev
```
O
```bash
npm start
```
Y tu servidor ya debe estar corriendo.


## Responsabilidades de cada carpeta.
- config:
En esta carpeta haremos la configuración del puerto y del acceso a la base de datos.
- controllers:
En esta carpeta se encarga de recibir las request, extraer los datos del body, params o querys, llama al service y devuelve respuestas.
- dao: 
Esta carpeta es la única capa que importa los modelos de Mongoose y habla directamente con la base de datos
- dto:
En esta carpeta se encuentran los archivos que deciden que campos salen en las respuestas.
- middlewares:
Aca se encuentran las funciones que corren antes de que lleguen al controlador, son los validadores de cada request.
- models:
Aca vamos a definir la forma que tendran los datos de los eventos, usuarios.
- repositories:
Esta es la carpeta que se encarga de utilizar el DAO y exportar metodos que van orientados al dominio que necesitemos.
- routes:
Aca vamos a definir los endpoints que vayamos a necesitar, importante a la hora de crear nuevos es que este mismo utilice el controller correspondiente.
- services:
Aca vamos a tener contenido toda la logica que tendra el negocio.
- utils: 
Aca se encuentran las fuciones que reutilizamos en todo el codigo. Cuidado con cambiarlas ya que podemos romper el sistema.

## Arquitectura en capas.
La API separa responsabilidades en capas. Cada una cumple una sola tarea y solo se comunica con la capa que tiene al lado:

```
Request  → Route (+ middlewares) → Controller → Service → Repository → DAO → Modelo → Base de datos
Response ← Controller ← DTO ← Service
```

| Capa | Responsabilidad | Regla |
|---|---|---|
| Route | Define el endpoint y los middlewares (sesión, rol, validación de credenciales). | Siempre usa el controller correspondiente. |
| Controller | Extrae los datos del request, llama al service y devuelve la respuesta. | No importa modelos ni resuelve reglas de negocio. |
| Service | Concentra la lógica de negocio: cupos, estados, duplicados, permisos y envío de email. | Consume repositories, nunca DAOs ni modelos. |
| Repository | Expone métodos del dominio (`findByEmail`, `countActiveTickets`, `cancelTicket`). | Usa el DAO, no importa modelos. |
| DAO | Ejecuta las consultas con métodos genéricos (`create`, `findById`, `findOne`, `find`, `update`, `count`). | Es el único que importa los modelos de Mongoose. |
| DTO | Decide qué campos salen en cada respuesta. | Nunca expone el `password`. Si hay `populate`, también filtra los datos del documento relacionado. |

## Reglas de negocio.
En la siguiente lista se redactaran las reglas que tiene el negocio con respecto a los eventos que se vayan creando:
- No se puede crear un evento con fecha pasada.
- La capacidad tiene que ser un numero entero, y siempre mayor a 0.
- El precio tiene que ser mayor o igual a 0.
- Un organizer no modifica eventos ajenos, pero el admin sí.
- Un evento cancelado no se puede modificar, ni cambiar de estado.
- Cancelar es cambiar el status a cancelled, nunca se borra un evento.
- Transiciones permitidas de estado: draft a published, published a finished, y desde draft o published a cancelled.

## Tickets e inscripciones.
Para explicar como se obtienen los tickets y saber que contienen, se divide esta parte en 3 secciones que explicaran lo más posible:

### Estado de un ticket.
Aca encontraremos tres estados por los que un ticket puede pasar:
- confirmed : inscripción válida.
- pending : la inscripcion se esta procesando.
- cancelled : ticket cancelado.

## Flujo de inscripcion.
En la siguiente lista se detalla como deben estar los parametros para la inscripcion a eventos:
- "quantity" : es decir la cantidad de entradas a obtener debe ser un numero entero positivo, mayor a 0.
- El evento debe existir.
- El usuario no debe tener un ticket obtenido anteriormente, a menos que haya sido cancelado.
- En el evento deben haber campos suficientes.
- En el ticket no solo se detalla el evento y la cantidad de entradas obtenidas, sino que tambien un codigo de reserva que luego es enviado al mail que se deja en el momento de registrar a ese mismo usuario.
- El evento no debe estar en una fecha anterior a la que se desee generar el ticket, ya que ese evento ya se encuentra vencido

### Reglas de cupos.
- La cantidad de ticket disponibles es igual a la capacidad del evento menos la cantidad de tickets que se encuentren confirmados o pendientes.
- Al cancelar un ticket este pasa a un estado de "cancelled", por lo que registra "cancelledAt", de esta manera no se puede borrar dicho documento.
- Cancelar un ticket provoca que este cambie de estado de tal manera que no se puede volver a conseguir. La solucion a esto es simplemente comprar otro ticket.
- Al cancelar, el cupo del evento que tenia dicho ticket queda habilitado para su compra.

### Campos necesarios para conseguir tickets
Primero que nada para conseguir un ticket se debe estar logeado al sistema. (ver `Login de Usuarios`).
- `quantity : `: Cantidad de entradas que se deseen conseguir.

#### Ejemplo de solicitud.

```json
{ "quantity": 1 }
```

## Roles y autorizaciones.
Nos encontraremos con 3 roles, cada uno con sus permisos.
- 'User': usuario basico, no tiene ningun permiso de modificación en ningun aspecto, exepto de su email y contraseña.
- 'Organizer': usuario con accesos privilejiados, tiene permisos de creacion y modificación de eventos (siempre y cuando sean los creados por el mismo, si algun evento está creado por otro organizer no podran ser modificados).
- 'admin': usuario con acceso completo, tiene permisos para realizar cualquier modificación de eventos, sin importar que usuario organizador lo haya creado.

## Usuarios de prueba.
### A continuacion se daran 3 usuarios de prueba para poder, tener ejemplos o realizar pruebas locales del servidor en actividad.

- Usuario común:
```json
{
  "first_name": "Usuario",
  "last_name": "Prueba",
  "email": "user@example.com",
  "password": "user12345"
}
```
- Usuario organizador:
```json
{
  "first_name": "Organizer",
  "last_name": "Prueba",
  "email": "organizer@example.com",
  "password": "organizer12345"
}
```
- Usuario administrador:
```json
{
  "first_name": "Admin",
  "last_name": "Prueba",
  "email": "admin@example.com",
  "password": "admin12345"
}
```
Para a la hora de registrar estos usuarios de prueba, o los reales, se deben hacer de la manera tradicional. Pero esto les pone por defecto `user`, para cambiar esto hay 2 maneras.
- 1:
Conectamos el server a mongosh, y le cargamos lo siguiente:
```
db.users.updateOne({ email: "organizer@example.com" }, { $set: { role: "organizer" } })
db.users.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } })
```
Esto hara que se cambien los roles a los ultimos dos ejemplos.
- 2:
Se debe entrar a la base de datos, directamente desde el programa de MongoDBCompass, o el que usemos. Y cambiarle el rol desde 

## Endpoints disponibles.

- GET /api/health . Genera una respuesta de si el servidor se encuentra en funcionamiento.

- GET /api/sessions/current . Genera una lista de los datos de la cuenta logeada.

- GET /api/users . Permite ver los usuarios que se registraron. Solo permitido para admin.

- GET /api/events . Genera una lista de los eventos disponibles. Si son muchos los eventos se van separando en paginas, ademas se pueden
establecer maneras de ordenarlos (segun fecha, u orden alfabetico), o por filtros.(acceso publico).

- GET /api/events/:id . Nos permite tener la visualizacion de un evento en particular.(acceso publico).

- GET /api/events/:id/tickets . Permite la visualizacion de los tickets vendidos para un evento. Solo admitido para admin, y organizer (solo puede sus propios eventos).

- GET /api/tickets/my-tickets . Permite la visualizacion de las entradas/tickets adquiridos por un usuario. Se precisa estar logeado para tener el acceso, no tiene restriccion de autorizacion.

- POST /api/sessions/register . Agrega con este endpoint a los usuarios nuevos.

- POST /api/sessions/login . Este endpoint es el que te permite logear a tu cuenta de la plataforma.

- POST /api/sessions/logout . Este endpoint realiza la actividad de cierre de sesion de la cuenta.

- POST /api/events . Este endpoint agrega los eventos nuevos, siempre y cuando haya autorizacion de admin u organizador.

- POST /api/events/:id/tickets . Permite la inscripcion (o venta de tickets), siempre y cuanto el usuario este logeado. En su body se deben poner las cantidades de entradas a conseguir. 

- PUT /api/events/:id . Este permite la actualización de algun evento. Solo admitido para admin, y organizer (solo puede sus propios eventos).

- PATCH /api/events/:id/status . Este nos permite cambiar los estados de cada evento. Solo admitido para admin, y organizer (solo puede sus propios eventos).

- PATCH /api/tickets/:tid/cancel . Permite la cancelacion de tickets de cualquier usuario. Solo permitido para admins y el dueño del ticket.

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

### Respuestas disponibles y manejo de errores
- 200: usuario logeado,
- 201: usuario registrado exitosamente,
- 400: campos incompletos o formato inválido, para el caso de los Tickets se debe a cantidad inválida, evento no disponible,
- 401: no existe una cookie de sesión, el token es inválido o venció,
- 403: el usuario está autenticado, pero su rol no cuenta con el permisos para realizar accion,
- 404: objeto o consulta inexistente,
- 409: email o ticket duplicado (email ya registrado, ticket ya registrado para este usuario) o cupos insuficientes para un evento,
- 500: error interno del servidor,
Para poder generar estos tipos de errores existe un middleware central que posee el formato adecuado para generar estos mismos.

## Registro de Usuarios.

### Campos necesarios y esperados.
- `first_name` : Nombre del usuario (OBLIGATORIO).
- `last_name` : Apellido del usuario (OBLIGATORIO).
- `email` : Correo electrónico valido (OBLIGATORIO).
- `password` : Contraseña (OBLIGATORIO(Debe contener al menos 8 caracteres)).

El campo `role` no debe enviarse. Ya que el sistema lo designa automáticamente como `user`.
Para los casos de `organizer` y `admin`, la creacion es exactamente igual. Lo que se debe cambiar es dentro de la base de datos directamente, y colocarle el rol a necesitar.

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
En este caso no se esperan ni se necesitan campos para completar, ya que se hace borrando las cookies del login desde cada ordenador y de manera independiente con cada usuario.

## Creacion de eventos.
Para la creacion de eventos se piden los siguientes campos que deben agregarse de manera obligatoria:

- `title`: Titulo del evento.
- `description`: Descripcion del evento a crear.
- `date`: Fecha y horario del evento.
- `location`: Lugar a llevarse a cabo el evento.
- `category` : Categoria que tendrá el evento (Queda a cargo de la persona que cree el evento, y las normas del negocio).
- `capacity` : Capacidad que tendrá el evento.
- `price` :  Precio que tendra cada entrada al evento.

Al realizar la creacion del mismo, utilizando `POST /api/events`, este quedara en forma de `{ "status": "draft" }`, el cual mediante `PATCH /api/events/:id/status`, donde `:id` es el id del evento, deberemos actualizar a  `{ "status": "published" }`

## Inscripcion a eventos.
Luego de que un "admin" u "organizer" cree un evento, y lo actualice para que quede con un `{ "status": "published" }`, se podra comenzar a vender las entradas a dicho evento. Para esto los usuarios deben estar logeados, para que luego usando `POST /api/events/:eventId/tickets`, donde `:eventId` es el id del evento, ingrese el siguiente cuerpo dentro de un JSON:
```json
{ "quantity": 1 } // Donde la 1 es el numero de entradas a comprar 
```
De esta manera el sistema validara que haya los suficientes para la adquisicion de dicha/s entradas, en el caso de fallar se lanzará la respuesta mediante el error y el mensaje correspondiente.
En caso de no fallar, en el ticket se creara el codigo de reserva y se enviara un mail de confirmacion al email que tiene el usuario.
Si el usuario decide cancelar su entrada o reserva, debe ingresar a `PATCH /api/tickets/:ticketId/cancel`, donde `:ticketId` se debe reemplazar por el id del ticket que se quiera cancelar


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
    "status": "error",
    "message": "No autenticado"
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
      "role": "user"
    },
    {
      "id": "id-del-usuario",
      "first_name": "admin",
      "last_name": "admin",
      "email": "admin@example.com",
      "role": "admin"
    },
    {
      "id": "id-del-usuario",
      "first_name": "organizer",
      "last_name": "organizer",
      "email": "organizer@example.com",
      "role": "organizer"
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
    "data": [
        {
        "id": "id-del-evento",
        "title": "titulo-del-evento",
        "description": "descripcion-del-evento",
        "date": "fecha-del-evento(2026-11-21T21:00:00.000Z)",
        "location": "lugar-del-evento",
        "category": "categoria-del-evento",
        "capacity": 100,
        "price": 20000,
        "status": "estado-del-evento",
        "organizer": "creador-del-evento"
        }
    ],
    "page": 1,
    "limit": 10,
    "total": 2,
    "totalPages": 1
}
```

![GET /api/events](images/GET%20-api-events.png)

- GET /api/events/:id .
Aquí se vera el evento por id. Este endpoint es de acceso publico, no hace falta estar logeado.
- Repuesta esperada:

```json
{
    "status": "success",
    "message": "Se encontró el evento buscado",
    "payload": {
      "id": "id-del-evento",
      "title": "titulo-del-evento",
      "description": "descripcion-del-evento",
      "date": "fecha-del-evento(2026-11-21T21:00:00.000Z)",
      "location": "lugar-del-evento",
      "category": "categoria-del-evento",
      "capacity": 100,
      "price": 20000,
      "status": "estado-del-evento",
      "organizer": "creador-del-evento"
  }
}
```
![GET /api/events/:id](images/GET%20-api-events-id.png)

- GET /api/events con parametros .
Aqui se vera la cantidad de eventos cuando le ponemos filtros a la busqueda 

Ejemplo: "GET /api/events?status=published&category=Festival&page=2&limit=5"
- Repuesta esperada:
```json
{
  "status": "success",
  "data": [
    {
      "id": "id-del-evento",
      "title": "titulo-del-evento",
      "description": "descripcion-del-evento",
      "date": "fecha-del-evento(2026-11-21T21:00:00.000Z)",
      "location": "lugar-del-evento",
      "category": "categoria-del-evento",
      "capacity": 100,
      "price": 20000,
      "status": "estado-del-evento",
      "organizer": "creador-del-evento"
    }
  ],
  "page": 1,
  "limit": 5,
  "total": 1,
  "totalPages": 1
}
```
![GET /api/events con parametros](images/GET%20-api-events-con-filtros.png)

- GET /api/events/:id/tickets
Aqui se podra ver los tickets vendidos de un evento en particular, el cual solo puede verlo un administrador o el organizer del evento.
- Respuesta esperada:
```json
{
    "status": "success",
    "payload": [
        {
        "id": "id-del-ticket",
        "user": {
            "id": "id-del-usuario",
            "first_name": "nombre-del-usuario",
            "last_name": "apellido-del-usuario",
            "email": "mail-del-usuario"
            },
        "event": "id-del-evento",
        "status": "estado-del-ticket",
        "quantity": "cantidad-de-tickets",
        "reservationCode": "codigo-de-reserva",
        "cancelledAt": "hora-de-cancelacion-del-ticket",
        "createdAt": "hora-de-creacion-del-ticket",
        "updatedAt": "hora-de-actualizacion-del-ticket"
        }
    ]
}
```
![GET /api/events/:id/tickets](images/GET%20-api-events-id-tickets.png)

- GET /api/tickets/my-tickets
Aqui se podran ver los tickets comprados por el propio usuario, con titulo, fecha y lugar del evento
- Respuesta esperada:
```json
{
    "status": "success",
    "payload": [
        {
        "id": "id-del-ticket",
        "user": "id-del-usuario",
        "event": {
            "id": "id-del-evento",
            "title": "titulo-del-evento",
            "date": "fecha-del-evento",
            "location": "lugar-del-evento"
        },
        "status": "estado-del-ticket",
        "quantity": "cantidad-de-tickets",
        "reservationCode": "codigo-de-reserva",
        "cancelledAt": "hora-de-cancelacion-del-ticket",
        "createdAt": "hora-de-creacion-del-ticket",
        "updatedAt": "hora-de-actualizacion-del-ticket"
        }
    ]
}
```
![GET /api/tickets/my-tickets](images/GET%20-api-tickets--my-tickets.png)

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
    "status": "error",
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
    "status": "error",
    "message": "No autenticado"
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
      "id": "id-del-evento",
      "title": "titulo-del-evento",
      "description": "descripcion-del-evento",
      "date": "fecha-del-evento(2026-11-21T21:00:00.000Z)",
      "location": "lugar-del-evento",
      "category": "categoria-del-evento",
      "capacity": 100,
      "price": 20000,
      "status": "estado-del-evento",
      "organizer": "creador-del-evento"
  }
}
```

![POST /api/events](images/POST%20-api-events.png)

- POST /api/events/:id/tickets
En este se muestra como se lleva a cabo la inscripcion a un evento. Para este proceso el usuario debe estar logeado.
- Respuesta esperada:
```json
{
    "status": "success",
    "payload": {
        "id": "id-del-ticket",
        "user": "id-del-usuario",
        "event": "id-del-evento",
        "status": "estado-del-ticket",
        "quantity": 1,
        "reservationCode": "codigo-de-reserva",
        "cancelledAt": null,
        "createdAt": "fecha-de-creacion-del-ticket",
        "updatedAt": "fecha-de-actualizacion-del-ticket"
    }
}
```

![POST /api/events/:id/tickets](images/POST%20-api-events-id-tickets.png)

- POST /api/events/:id/tickets
Que es lo que pasa cuando se intenta comprar nuevamente un ticket desde el mismo usuario. Para este proceso el usuario debe estar logeado.
- Respuesta esperada:
```json
{
    "status": "error",
    "message": "Ya existe un boleto para este usuario en el mismo evento"
}
```

![POST /api/events/:id/tickets](images/POST%20-api-events-id-tickets%20(usuario%20con%20compra%20antes%20resgistrada).png)

#### Endpoints PUT.

- PUT /api/events .
En este endpoint veremos como actualizar un evento, solo para admins y organizers, (los admins, pueden actualizar cualquier evento. Un organizer solo los creados por el mismo).
- Respuesta esperada:
```json
{
  "status": "success",
  "message": "Evento actualizado",
  "payload": [{
      "id": "id-del-evento",
      "title": "titulo-del-evento",
      "description": "descripcion-del-evento",
      "date": "fecha-del-evento(2026-11-21T21:00:00.000Z)",
      "location": "lugar-del-evento",
      "category": "categoria-del-evento",
      "capacity": 100,
      "price": 20000,
      "status": "estado-del-evento",
      "organizer": "creador-del-evento"
  }]
}
```

![PUT /api/events](images/PUT%20-api-events.png)

#### Endpoints PATCH.

- PATCH /api/events/:id/status 
En este endpoint veremos como actualizar el estado (status), de cada evento, solo para admins y organizers, (los admins, pueden actualizar cualquier evento. Un organizer solo los creados por el mismo).
- Respuesta esperada:
```json
{
    "status": "success",
    "message": "El estado del evento ha sido actualizado  ",
    "payload": {
        "id": "6ac70aaba10cb2877e6e14b7",
        "title": "MotoCrash",
        "description": "Festival de Motos",
        "date": "2026-11-21T21:00:00.000Z",
        "location": "Olimpo",
        "category": "Motos",
        "capacity": 227,
        "price": 20000,
        "status": "published",
        "organizer": "6ac707e1e01f1191576e54d3"
    }
}
```

![PATCH /api/events/:id/status](images/PATCH%20-api-events-id-status.png)

- PATCH /api/tickets/:id/cancel
En este endpoint veremos la manera de cancelar un ticket. No lleva ningun Body. Solo puede hacerlo un usuario ADMIN y el dueño del ticket.
- Respuesta esperada:
```json
{
    "status": "success",
    "payload": {
        "id": "id-del-ticket",
        "user": "id-del-usuario",
        "event": "id-del-evento",
        "status": "estado-del-ticket",
        "quantity": 1,
        "reservationCode": "codigo-de-reserva",
        "cancelledAt": "fecha-de-cancelacion-del-ticket",
        "createdAt": "fecha-de-creacion-del-ticket",
        "updatedAt": "fecha-de-actualizacion-del-ticket"
    }
}
```

![PATCH /api/tickets/:id/cancel](images/PATCH%20-api-tickets--id-cancel.png)

## Flujo de autenticación
### Para uso de usuarios.
- 1) Luego de realizar el registro en:
`POST /api/sessions/register`.
Este genera un rol de usuario ("user"), a la persona que este registrandose en nuestro sistema.
- 2) Una vez registrado, se procede al inicio de sesion:
`POST /api/sessions/login`.
Una vez que iniciamos sesion en el sistema, se genera el JWT, el cual se guarda de manera automatica en el `httpOnly` con el nombre de `currentUser`. El tiempo de sesion se puede configurar en el `JWT_EXPIRES_IN`, ya que este se encarga de dar la duracion del token antes de su vencimiento y expirar la sesion.
- 3) Cuando ya se realizo el login, la cookie viaja sola y la estrategia `current` que tiene PASSPORT, valida que sea una cookie real y utilizable para dicha sesion.
- 4) Para saber los datos de la persona o usuario que realizo el login debemos entrar a `GET /api/sessions/current`, el cual listara los datos que pueden ser visibles.
- 5) Por último si el usuario quiere cerrar la sesion, se debe borrar la cookie, y la manera mas sencilla para todos los usuarios es utilizando `POST /api/sessions/logout`, el cual realiza todo ese trabajo y hace que el `current` pase a dar 401 .

### Flujo de inscripcion
Para hacerlo un poco mas entendible quedaria asi:
- 1) Un organizer o admin crea el evento (draft).
- 2) Lo publica con PATCH.
- 3) El user se inscribe con POST /api/events/:eventId/tickets.
- 4) Se valida estado, cupo y duplicado.
- 5) Se crea el ticket y se manda el email.
- 6) Cancelar libera el cupo.


 Vale aclarar que el current no lleva en ningun aspecto contraseñas. Unicamente id, email y role. 

### Para uso de autenticadores externos.
- Desde ahora la autenticación se encuentra centralizada en `src/config/passport.config.js` mediante el uso de las estrategias de Passport: `register`, `login` y `current`
- Esto permitirá agregar futuros proveedores de autenticación como por ejemplo, Google o GitHub, dado que no haría falta cambiar o modificar el archivo `app.js`
