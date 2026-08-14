# Plataforma de gestion de Eventos

## API REST para poder gestionar eventos y sesiones desde un solo lugar

## Tecnologías de uso
- NODE.JS
- EXPRESS
- MONGODB
- MONGOOSE
- DOTENV

## Instalación

1. Clonamos el repositorio completo a tu PC
2. Ejecutas en una terminal ,con acceso a tu descarga
```bash
npm install
```
3. Creamos el archivo .env, para copiarle dentro lo que se encuentra en el .env.example 

## Variables de entorno a tener en cuenta
Dentro del archivo .env.example encontraremos todas las variables que se usan en nuestro programa, una vez que la copies en tu .env deberas completarle todos los campos de tu servidor, o cuales uses
- MONGO_URL
- PORT
- NODE_ENV
- JWT_SECRET

## Ejecución
Una vez completado los pasos anteriores, abrimos una terminal que este direccionada a la carpeta contenedora de la plataforma de gestion, y escribimos lo siguiente
```bash
npm run dev
```
Y tu servidor ya debe estar corriendo

## Responsabilidades de cada carpeta
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
Aca vamos a definir los endpoints que vayamos a necesitar, importante a la hora de crear nuevos es que este mismo utilice el controller correspondiente
- services:
Aca vamos a tener contenido toda la logica que tendra el negocio
- utils: 
Aca se encuentran las fuciones que reutilizamos en todo el codigo. Cuidado con cambiarlas ya que podemos romper el sistema de gestion

## Rutas disponibles

- GET /api/events

- GET /api/health

- GET /api/sessions