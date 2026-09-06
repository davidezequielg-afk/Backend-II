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

## Endpoints disponibles.

- GET /api/events .

- GET /api/health .

- GET /api/sessions/current .

- POST /api/sessions/register .

- POST /api/sessions/login .

- POST /api/sessions/logout .


### Respuestas disponibles

- 201: usuario registrado exitosamente,
- 400: campos incompletos o formato inválido,
- 409: email duplicado (email ya registrado),
- 500: error interno del servidor

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


## Evidencias de Uso.
### A continuacios se veran, en formato de imagenes, las evidencias de como se verian el uso de las RUTAS mediante el uso del programa de POSTMAN.

- GET /api/health .
Aqui se vera si el servidor se encuentra vivo (es decir en uso correcto).

![GET /api/health](images/GET%20-api-health..png)

- POST /api/sessions/register .
En la siguiente imagen se ve como y cuales son los campos necesarios para la creacion de un o los usuario/s.

![POST /api/sessions/register](images/POST%20-api-sessions-register.png)

- POST /api/sessions/register . (Con usuraio duplicado)
En la siguiente imagen se ve como y cuales son los campos necesarios para la creacion de un usuario ya existente

![POST /api/sessions/register duplicado](images/POST%20-api-sessions-register%20duplicado.png)

- GET /api/sessions/current .
Aqui vemos el current (lista de sesiones) antes de realizar el login correspondiente para el uso de la sesion.

![GET /api/sessions/current](images/GET%20-api-sessions-current%20no%20login.png)

- POST /api/sessions/login .
En esta se demuestran los datos y campos necesarios para realizar un login exitoso.

![POST /api/sessions/login](images/POST%20-api-sessions-login.png)

- GET /api/sessions/current .
Aqui vemos el current (lista de sesiones) luego de realizar el login correspondiente para el uso de la sesion.

![GET /api/sessions/current](images/GET%20-api-sessions-current%20login.png)

- POST /api/sessions/logout .
En esta se muestra la respuesta de un logout exitoso.

![POST /api/sessions/logout logeado](images/POST%20-api-sessions-logout%20logeado.png)

- POST /api/sessions/logout .
En esta se muestra la respuesta de un logout no exitoso, por usuario no validado.

![POST /api/sessions/logout no logeado](images/POST%20-api-sessions-logout%20no%20logeado.png)