# Academic Management Backend

Backend REST API para un proyecto academico consumido por Angular 19. Usa Node.js, TypeScript, Express y PostgreSQL sin ORM pesado. La intencion del proyecto es que los estudiantes puedan leer una arquitectura clara por capas y practicar consumo real de endpoints.

## Stack

- Node.js
- TypeScript estricto
- Express
- PostgreSQL
- Docker Compose para PostgreSQL
- `pg` como cliente SQL
- `cors`
- `dotenv`
- `tsx` para desarrollo

## Estructura

```txt
backend
├── docker-compose.yml
├── package.json
├── requests.http
├── tsconfig.json
├── .env.example
└── src
    ├── app.ts
    ├── server.ts
    ├── config
    │   └── env.ts
    ├── db
    │   ├── bootstrap.ts
    │   ├── pool.ts
    │   ├── schema.ts
    │   └── seed.ts
    ├── middlewares
    │   ├── errorHandler.ts
    │   └── notFound.ts
    ├── modules
    │   ├── categories
    │   │   ├── category.controller.ts
    │   │   ├── category.repository.ts
    │   │   ├── category.routes.ts
    │   │   ├── category.service.ts
    │   │   └── category.types.ts
    │   ├── products
    │   ├── students
    │   └── tasks
    ├── routes
    │   ├── health.routes.ts
    │   └── index.ts
    ├── types
    │   └── api-response.ts
    └── utils
        ├── AppError.ts
        ├── apiResponse.ts
        ├── asyncHandler.ts
        ├── logger.ts
        └── validators.ts
```

## Responsabilidad Por Capa

- `controller`: recibe `Request`, valida payloads basicos y devuelve respuestas HTTP.
- `service`: contiene reglas de negocio, valida relaciones y decide errores 400/404.
- `repository`: contiene consultas SQL parametrizadas con `pg`.
- `routes`: declara las rutas Express de cada modulo.
- `db`: contiene conexion, bootstrap, creacion de tablas y seed.
- `middlewares`: centraliza errores y rutas no encontradas.
- `utils`: helpers reutilizables para respuestas, validaciones, logs y errores.

## Requisitos

- Node.js 20 o superior recomendado.
- Docker Desktop o Docker Engine.
- npm.

## Variables De Entorno

Primero crea tu archivo `.env`:

```bash
cp .env.example .env
```

Variables principales:

```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=academic_management

DB_MAX_POOL=10
DB_CONNECTION_TIMEOUT_MS=5000
POSTGRES_WAIT_RETRIES=20
POSTGRES_WAIT_DELAY_MS=1500

CORS_ORIGIN=http://localhost:4200
```

Si ya tienes PostgreSQL usando el puerto `5432`, cambia `DB_PORT` en `.env`, por ejemplo:

```env
DB_PORT=5433
```

El `docker-compose.yml` usa esa variable para publicar el puerto:

```yaml
ports:
  - "${DB_PORT:-5432}:5432"
```

Esto significa:

```txt
localhost:5433 -> contenedor:5432
```

## Ejecucion Del Proyecto

Desde la carpeta `backend`:

```bash
cd backend
cp .env.example .env
docker compose up -d
npm install
npm run dev
```

La API queda disponible en:

```txt
http://localhost:3000
```

Health check:

```txt
GET http://localhost:3000/api/health
```

## Scripts

```bash
npm run dev
npm run build
npm start
```

- `npm run dev`: ejecuta TypeScript con recarga usando `tsx watch`.
- `npm run build`: compila TypeScript a `dist`.
- `npm start`: ejecuta la version compilada.

## Base De Datos

Al iniciar el backend, se ejecuta el bootstrap:

1. Espera a que PostgreSQL este disponible.
2. Se conecta primero a la base administrativa `postgres`.
3. Verifica si existe la base definida en `DB_NAME`.
4. Si no existe, la crea automaticamente.
5. Se conecta a la base de la aplicacion.
6. Crea tablas e indices si no existen.
7. Inserta datos de ejemplo con seed idempotente.

Funciones principales:

- `waitForPostgres()`
- `ensureDatabaseExists()`
- `initializeSchema()`
- `seedDatabase()`

El seed no duplica datos: inserta categories, products y students con restricciones unicas, y tasks con una verificacion por titulo de tarea.

## Modelo De Datos

### categories

```txt
id
name
description
created_at
```

### products

```txt
id
name
price
stock
category_id
created_at
```

Relacion: una categoria tiene muchos productos.

### students

```txt
id
first_name
last_name
email
active
created_at
```

### tasks

```txt
id
title
description
status
priority
student_id
due_date
created_at
```

Relaciones:

- Un estudiante puede tener muchas tareas.
- Una tarea puede o no tener estudiante.

Valores permitidos:

```txt
status: pending, in_progress, done
priority: low, medium, high
```

## Formato De Respuesta

Respuesta exitosa:

```json
{
  "success": true,
  "message": "Texto descriptivo",
  "data": {}
}
```

Respuesta de error:

```json
{
  "success": false,
  "message": "Texto descriptivo del error",
  "data": null
}
```

## Codigos HTTP

- `200`: consultas y actualizaciones exitosas.
- `201`: creaciones exitosas.
- `400`: payload invalido, parametros invalidos o relacion inexistente en un POST/PATCH.
- `404`: recurso o ruta no encontrada.
- `409`: conflicto por dato unico duplicado.
- `500`: error interno inesperado.

## Endpoints

### Health

| Metodo | Ruta | Codigo esperado |
|---|---|---|
| GET | `/api/health` | 200 |

### Categories

| Metodo | Ruta | Codigo esperado |
|---|---|---|
| GET | `/api/categories` | 200 |
| GET | `/api/categories/:id` | 200 o 404 |
| POST | `/api/categories` | 201 o 400 |

Payload:

```json
{
  "name": "Laboratorio",
  "description": "Material adicional para practicas."
}
```

### Products

| Metodo | Ruta | Codigo esperado |
|---|---|---|
| GET | `/api/products` | 200 |
| GET | `/api/products/:id` | 200 o 404 |
| GET | `/api/products/category/:categoryId` | 200 o 404 |
| POST | `/api/products` | 201 o 400 |

Payload:

```json
{
  "name": "Teclado mecanico",
  "price": 42.99,
  "stock": 15,
  "category_id": 1
}
```

Validaciones:

- `name`: obligatorio.
- `price`: numero mayor o igual a 0.
- `stock`: entero mayor o igual a 0.
- `category_id`: entero positivo y existente.

### Students

| Metodo | Ruta | Codigo esperado |
|---|---|---|
| GET | `/api/students` | 200 |
| GET | `/api/students/:id` | 200 o 404 |
| POST | `/api/students` | 201 o 400 |

Payload:

```json
{
  "first_name": "Sofia",
  "last_name": "Castro",
  "email": "sofia.castro@example.com",
  "active": true
}
```

Validaciones:

- `first_name`: obligatorio.
- `last_name`: obligatorio.
- `email`: obligatorio y con formato de correo.
- `active`: booleano opcional, por defecto `true`.

### Tasks

| Metodo | Ruta | Codigo esperado |
|---|---|---|
| GET | `/api/tasks` | 200 |
| GET | `/api/tasks/:id` | 200 o 404 |
| GET | `/api/tasks/status/:status` | 200 o 400 |
| GET | `/api/tasks/student/:studentId` | 200 o 404 |
| POST | `/api/tasks` | 201 o 400 |
| PATCH | `/api/tasks/:id/status` | 200, 400 o 404 |

Payload para crear:

```json
{
  "title": "Crear componente de dashboard",
  "description": "Consumir tareas y mostrar resumen por estado.",
  "status": "pending",
  "priority": "high",
  "student_id": 1,
  "due_date": "2026-05-25"
}
```

Payload para crear tarea sin estudiante:

```json
{
  "title": "Revisar documentacion de endpoints",
  "description": "Practicar consumo HTTP sin relacion obligatoria.",
  "status": "in_progress",
  "priority": "medium",
  "student_id": null,
  "due_date": null
}
```

Payload para actualizar estado:

```json
{
  "status": "done"
}
```

Validaciones:

- `title`: obligatorio.
- `status`: opcional al crear, por defecto `pending`.
- `priority`: opcional al crear, por defecto `medium`.
- `student_id`: opcional, debe ser entero positivo y existir si se envia.
- `due_date`: opcional, formato `YYYY-MM-DD`.

## Datos De Ejemplo

El seed inicial incluye:

- 4 categories.
- 8 products.
- 6 students.
- 10 tasks.

Hay variedad de estados, prioridades, tareas asignadas y tareas sin estudiante para practicar filtros desde Angular.

## Probar Con requests.http

El archivo `requests.http` contiene ejemplos listos:

```txt
backend/requests.http
```

Puedes usarlo desde VS Code con la extension REST Client. Incluye:

- Consultas exitosas.
- Creaciones con payload valido.
- Casos 400 por payload invalido.
- Casos 404 por recurso inexistente.
- PATCH para cambiar estado de tareas.

## Probar Con Postman

1. Abre Postman.
2. Crea una nueva coleccion llamada `Academic Management API`.
3. Crea una variable de coleccion:

```txt
baseUrl = http://localhost:3000/api
```

4. Crea requests usando las rutas documentadas. Ejemplo:

```txt
GET {{baseUrl}}/tasks
```

5. Para POST y PATCH:

- Selecciona `Body`.
- Selecciona `raw`.
- Selecciona `JSON`.
- Pega el payload del endpoint.

Ejemplo POST:

```txt
POST {{baseUrl}}/students
```

```json
{
  "first_name": "Sofia",
  "last_name": "Castro",
  "email": "sofia.castro@example.com",
  "active": true
}
```

Postman debe enviar este header:

```txt
Content-Type: application/json
```

## Uso Desde Angular 19

Configura la URL base en un servicio Angular:

```ts
const apiUrl = "http://localhost:3000/api";
```

Ejemplo simple:

```ts
this.http.get(`${apiUrl}/tasks`);
```

El CORS por defecto permite:

```txt
http://localhost:4200
```

Puedes cambiarlo en `.env` con:

```env
CORS_ORIGIN=http://localhost:4200
```

## Comandos Utiles

Ver contenedores:

```bash
docker compose ps
```

Detener PostgreSQL:

```bash
docker compose down
```

Detener y borrar volumen de datos:

```bash
docker compose down -v
```

Compilar:

```bash
npm run build
```

Ejecutar compilado:

```bash
npm start
```
