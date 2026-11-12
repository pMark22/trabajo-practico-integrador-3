# Trabajo Práctico Integrador III – API de Gestión de Eventos

API REST desarrollada con **Node.js, Express y MongoDB**, utilizando Mongoose para la gestión de datos. El proyecto permite administrar usuarios, eventos y categorías, incorporando autenticación, autorización y validaciones.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Bcrypt
- Cookie Parser
- Express Validator
- Dotenv
- CORS

## Requisitos previos

Para ejecutar el proyecto se necesita:

- Node.js y npm.
- MongoDB instalado y en funcionamiento.
- Git.

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/pMark22/trabajo-practico-integrador-3.git
   ```

2. Ingresar al directorio:

   ```bash
   cd trabajo-practico-integrador-3
   ```

3. Instalar las dependencias:

   ```bash
   npm install
   ```

4. Crear un archivo `.env` en la raíz del proyecto, tomando como referencia `.env.example`.

5. Configurar las variables de entorno:

   ```env
   PORT=3003
   MONGODB_URI=mongodb://localhost:27017/trabajo-practico-integrador-3
   JWT_SECRET=tu_clave_secreta
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   ```

   Se debe reemplazar `JWT_SECRET` por una clave secreta propia.

## Ejecución

Para iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

El servidor se ejecuta en:

```text
http://localhost:3003
```

Las rutas de la API utilizan el prefijo `/api`.

## Funcionalidades

### Autenticación y usuarios

- Registro de usuarios.
- Inicio de sesión.
- Cierre de sesión.
- Consulta y actualización del perfil.
- Gestión de usuarios.
- Contraseñas protegidas mediante hash con Bcrypt.
- Autenticación mediante JWT almacenado en cookies `httpOnly`.
- Roles de usuario y administrador.
- Eliminación lógica de usuarios mediante el campo `deletedAt`.

### Eventos

- Crear eventos.
- Consultar todos los eventos.
- Consultar un evento por su identificador.
- Actualizar eventos.
- Eliminar eventos.
- Asociar eventos con usuarios organizadores.
- Asociar eventos con múltiples categorías.
- Control de fechas, capacidad, precio, estado y ubicación.
- Autorización para que el organizador o un administrador pueda modificar y eliminar eventos.

### Categorías

- Crear categorías.
- Consultar categorías.
- Consultar una categoría por su identificador.
- Actualizar categorías.
- Eliminar categorías.
- Quitar las referencias de una categoría eliminada en los eventos asociados.

## Relaciones entre los modelos

El proyecto utiliza relaciones embebidas y referencias entre documentos:

- **Usuario – Evento:** un usuario puede organizar múltiples eventos.
- **Evento – Categoría:** un evento puede tener varias categorías y una categoría puede estar asociada a varios eventos.
- **Perfil:** los datos personales del usuario se almacenan mediante un documento embebido.
- **Ubicación:** la información del lugar del evento se almacena mediante un documento embebido.

También se utiliza `virtual populate` para consultar los eventos relacionados con usuarios y categorías.

## Estructura del proyecto

```text
trabajo-practico-integrador-3/
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── category.controller.js
│   │   ├── event.controller.js
│   │   └── user.controller.js
│   │
│   ├── helpers/
│   │   ├── bcrypt.helper.js
│   │   └── jwt.helper.js
│   │
│   ├── middlewares/
│   │   ├── admin.middleware.js
│   │   ├── auth.middleware.js
│   │   ├── owner-or-admin.middleware.js
│   │   ├── validate.middleware.js
│   │   └── validations/
│   │       ├── auth.validation.js
│   │       ├── category.validation.js
│   │       ├── event.validation.js
│   │       └── user.validation.js
│   │
│   ├── models/
│   │   ├── category.model.js
│   │   ├── event.model.js
│   │   └── user.model.js
│   │
│   └── routes/
│       ├── auth.router.js
│       ├── category.router.js
│       ├── event.router.js
│       └── user.router.js
│
├── .env
├── .env.example
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

## Endpoints

Todas las rutas utilizan el prefijo `/api`.

### Autenticación

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/auth/register` | Registrar un usuario |
| POST | `/auth/login` | Iniciar sesión |
| GET | `/auth/profile` | Consultar el perfil |
| PUT | `/auth/profile` | Actualizar el perfil |
| POST | `/auth/logout` | Cerrar sesión |

### Usuarios

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/users` | Obtener todos los usuarios |
| GET | `/users/:id` | Obtener un usuario |
| PUT | `/users/:id` | Actualizar un usuario |
| DELETE | `/users/:id` | Eliminar lógicamente un usuario |

Las rutas de gestión de usuarios requieren autenticación y permisos de administrador.

### Eventos

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/events` | Crear un evento |
| GET | `/events` | Obtener todos los eventos |
| GET | `/events/:id` | Obtener un evento |
| PUT | `/events/:id` | Actualizar un evento |
| DELETE | `/events/:id` | Eliminar un evento |

La creación requiere autenticación. La modificación y eliminación requieren ser el organizador del evento o un administrador.

### Categorías

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/categories` | Crear una categoría |
| GET | `/categories` | Obtener todas las categorías |
| GET | `/categories/:id` | Obtener una categoría |
| PUT | `/categories/:id` | Actualizar una categoría |
| DELETE | `/categories/:id` | Eliminar una categoría |

## Validaciones y manejo de errores

La API utiliza Express Validator para validar los datos recibidos y Mongoose para aplicar las restricciones de los modelos.

Los controladores implementan bloques `try-catch` para manejar errores y responder con códigos de estado HTTP adecuados.

Entre las validaciones se contemplan:

- Campos obligatorios.
- Formatos de correo electrónico.
- Longitud y formato de cadenas.
- Identificadores de MongoDB.
- Fechas de inicio y finalización de eventos.
- Capacidad y precio.
- Existencia de categorías relacionadas.

Proyecto realizado como Trabajo Práctico Integrador III de la Tecnicatura Superior en Desarrollo de Software Multiplataforma.