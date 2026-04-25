# Proyecto Angular Academico

SPA academica en Angular 20, compatible con el requisito Angular 19 o superior. El proyecto esta preparado para practicar Angular moderno con una base real conectable al backend REST ubicado en `../backend`.

La aplicacion no esta resuelta al 100%. Algunas partes estan completas para que el proyecto compile y otras quedan intencionalmente como ejercicios guiados para estudiantes.

## Objetivo General

Construir progresivamente una SPA que practique:

- Interpolacion.
- Comunicacion entre componentes con `input()` y `output()`.
- Control flow moderno con `@if` y `@for`.
- Rutas principales, rutas hijas y rutas con parametros.
- Lazy loading.
- Servicios HTTP con `HttpClient`.
- Observables.
- JSON.
- Interfaces API y ViewModels.
- Mappers.
- Operadores `pipe`, `map` y `tap`.
- Formularios reactivos.
- `FormGroup`, `FormControl` y `FormArray`.
- Validaciones basicas.
- `localStorage`.
- Inyeccion moderna con `inject()`.
- Aplicacion zoneless.

## Requisitos

- Node.js recomendado: 20 o superior.
- Angular CLI instalado o usar scripts npm.
- Backend REST del proyecto levantado cuando se trabaje Servicios HTTP.

## Como Ejecutar Solo El Frontend

```bash
cd proyecto_final
npm install
npm start
```

Abrir:

```txt
http://localhost:4200
```

## Como Ejecutar Backend + Frontend

Terminal 1, backend:

```bash
cd backend
cp .env.example .env
docker compose up -d
npm install
npm run dev
```

Backend esperado:

```txt
http://localhost:3000/api
```

Terminal 2, frontend:

```bash
cd proyecto_final
npm install
npm start
```

Frontend:

```txt
http://localhost:4200
```

Si el backend usa otro puerto, editar:

```txt
src/app/core/constants/api.constants.ts
```

Ejemplo:

```ts
export const API_BASE_URL = 'http://localhost:3001/api';
```

## Scripts Disponibles

```bash
npm start
npm run build
npm test
```

- `npm start`: levanta Angular en modo desarrollo.
- `npm run build`: compila el proyecto.
- `npm test`: ejecuta pruebas unitarias base.

## Arquitectura

```txt
src/app
├── app.config.ts
├── app.routes.ts
├── core
│   ├── constants
│   └── storage
├── services
│   ├── academic-api.service.ts
│   └── task-draft-storage.service.ts
├── features
│   ├── components-demo
│   ├── control-flow
│   ├── forms
│   ├── home
│   ├── http-services
│   ├── interpolation
│   ├── local-storage
│   └── routes-demo
├── layout
├── mappers
├── models
└── shared
```

## Rol De Cada Carpeta

| Carpeta | Responsabilidad |
|---|---|
| `core` | Configuracion transversal, constantes y utilidades globales |
| `services` | Servicios que consumen API o persistencia |
| `features` | Paginas por tema de clase |
| `layout` | Layout general y navbar |
| `mappers` | Transformacion API -> ViewModel |
| `models` | Interfaces, tipos y contratos |
| `shared` | Componentes reutilizables |

## Configuracion Moderna Incluida

La aplicacion usa:

- `provideZonelessChangeDetection()` en `app.config.ts`.
- `provideRouter(routes)` en `app.config.ts`.
- `provideHttpClient(withFetch())` en `app.config.ts`.
- Standalone components.
- Lazy loading con `loadComponent` y `loadChildren`.
- Control flow con `@if` y `@for`.
- `inject()` en servicios y componentes donde aplica.
- Formularios reactivos.

No se usan NgModules tradicionales.

## Navbar Y Temas

| Navbar | Ruta | Tema principal |
|---|---|---|
| Inicio | `/` | Presentacion del proyecto |
| Interpolacion | `/interpolacion` | Mostrar datos con `{{ }}` |
| Componentes | `/componentes` | Padre/hijo con `input()` y `output()` |
| Control Flow | `/control-flow` | `@if`, `@for`, estados y filtros |
| Servicios HTTP | `/servicios-http` | API REST, Observables y mappers |
| Rutas | `/rutas` | Rutas hijas, parametros y lazy load |
| Formularios | `/formularios` | Reactive Forms, validaciones y POST |
| Local Storage | `/local-storage` | Persistencia simple |

## Actividades Que Debe Completar El Estudiante

Cada archivo `.ts` y `.html` contiene comentarios con:

- Objetivo.
- Actividades por nivel.
- Pistas.
- Criterios de aceptacion.
- Resultado esperado.

La idea es que el estudiante lea el codigo, ejecute la app, identifique los TODOs y complete por secciones.

## Actividades Por Pagina

### 1. Inicio

Ruta:

```txt
/
```

Objetivo:

- Entender que el proyecto es una SPA.
- Revisar las secciones del navbar.

Actividad:

- Agregar informacion del estudiante, curso o paralelo.

Nivel:

```txt
Basico
```

### 2. Interpolacion

Ruta:

```txt
/interpolacion
```

Actividades:

1. Mostrar propiedades faltantes de `product`.
2. Crear una propiedad calculada para precio con IVA.
3. Crear un texto de disponibilidad segun `stock`.

Criterios:

- No escribir valores fijos en el HTML.
- Todo debe venir desde propiedades o getters del componente.

Nivel:

```txt
Basico a intermedio
```

### 3. Componentes

Ruta:

```txt
/componentes
```

Actividades:

1. Agregar un segundo `output()` en `StudentCardComponent`.
2. Emitir un evento para solicitar eliminacion.
3. Implementar la eliminacion en el componente padre.
4. Reto: impedir eliminar estudiantes activos y mostrar un mensaje.

Criterios:

- El hijo no debe modificar el array.
- El hijo solo emite eventos.
- El padre decide que hacer con la lista.

Nivel:

```txt
Intermedio
```

### 4. Control Flow

Ruta:

```txt
/control-flow
```

Actividades:

1. Usar botones para cambiar estados visuales.
2. Agregar una `signal` para filtrar tareas por estado.
3. Mostrar mensaje especial si el filtro no tiene resultados.

Criterios:

- Usar `@if` y `@for`.
- No usar `*ngIf` ni `*ngFor`.
- Usar `track task.id`.

Nivel:

```txt
Intermedio
```

### 5. Servicios HTTP

Ruta:

```txt
/servicios-http
```

Actividades:

1. Revisar `AcademicApiService`.
2. Agregar `tap()` en `getStudents()`.
3. Completar mappers que muestran textos `TODO`.
4. Implementar `createTask()`.
5. Reto: crear `createStudent()`.

Criterios:

- No usar `any`.
- Cada endpoint debe usar `ApiResponse<T>`.
- Los datos del HTML deben pasar por ViewModels.
- Para GET, preferir `async pipe`.
- Para POST, se permite `subscribe()` porque es una accion del usuario.

Nivel:

```txt
Intermedio a avanzado
```

### 6. Interfaces Y Mappers

Archivos:

```txt
src/app/models
src/app/mappers/academic.mappers.ts
```

Actividades:

1. Completar `stockLabel` en `mapProductApiToView()`.
2. Completar `categoryName` usando `product.category_name`.
3. Completar `dueDateLabel` usando locale `es-EC`.
4. Crear `CreateStudentPayload`.
5. Revisar si los ViewModels tienen solo lo que necesita la vista.

Criterios:

- API models representan backend.
- ViewModels representan pantalla.
- Mapper no hace HTTP.
- Mapper no muta el objeto recibido.

Nivel:

```txt
Intermedio
```

### 7. Rutas

Ruta:

```txt
/rutas
```

Actividades:

1. Identificar ruta padre y rutas hijas.
2. Agregar una ruta hija nueva con `loadComponent`.
3. Leer parametro `id`.
4. Reto: crear `getTaskById(id)` y consultar el backend.

Criterios:

- La nueva ruta debe ser lazy loaded.
- No importar directamente componentes lazy en el archivo de rutas.
- Si el id no es valido, mostrar mensaje.

Nivel:

```txt
Intermedio a avanzado
```

### 8. Formularios

Ruta:

```txt
/formularios
```

Actividades:

1. Agregar `Validators.minLength(3)` al titulo.
2. Mostrar mensaje de error para titulo corto.
3. Validar que subtareas no esten vacias.
4. Construir `CreateTaskPayload`.
5. Llamar `AcademicApiService.createTask()`.
6. Reto: guardar mas campos como borrador en localStorage.

Criterios:

- Si el formulario es invalido, no debe hacer POST.
- Si el POST funciona, limpiar formulario o mostrar tarea creada.
- El payload debe respetar `student_id` y `due_date`.

Nivel:

```txt
Intermedio a avanzado
```

### 9. Local Storage

Ruta:

```txt
/local-storage
```

Actividades:

1. Guardar y recuperar nombre del estudiante.
2. Implementar guardado de filtro `{ status, priority }`.
3. Mostrar el filtro recuperado.
4. Reto: usar ese filtro para inicializar otra pantalla.

Criterios:

- Al recargar el navegador, el dato guardado debe seguir visible.
- Debe existir una accion para limpiar.
- No repetir `JSON.parse` y `JSON.stringify` fuera del servicio de storage.

Nivel:

```txt
Basico a intermedio
```

## Tareas Que No Estan Resueltas A Proposito

Estas partes estan intencionalmente incompletas:

- `mapProductApiToView()`:
  - `stockLabel`.
  - `categoryName`.

- `mapTaskApiToView()`:
  - `dueDateLabel`.

- `AcademicApiService`:
  - `tap()` en `getStudents()`.
  - `createTask()`.
  - `createStudent()`.
  - `getTaskById(id)`.

- `FormsPage`:
  - Validacion `minLength`.
  - Construccion del payload.
  - Envio real del POST.
  - Manejo de exito/error.

- `LocalStoragePage`:
  - Guardado y recuperacion de filtros.

- `RoutesDemo`:
  - Nueva ruta hija.
  - Lectura de parametro para consultar backend.

## Orden Sugerido Para Trabajar

1. Interpolacion.
2. Componentes.
3. Control Flow.
4. Interfaces y mappers.
5. Servicios HTTP.
6. Rutas.
7. Formularios.
8. Local Storage.

## Estimacion De Tiempo

Para un estudiante promedio:

```txt
10 a 18 horas
```

Por bloques:

| Bloque | Tiempo aproximado |
|---|---:|
| Interpolacion + componentes | 2 a 4 h |
| Control flow + rutas | 3 a 5 h |
| HTTP + mappers | 3 a 5 h |
| Formularios + POST | 3 a 5 h |
| LocalStorage + ajustes | 1 a 2 h |

## Criterios De Evaluacion

Una entrega correcta deberia cumplir:

- Compila con `npm run build`.
- No usa `*ngIf` ni `*ngFor`.
- Usa `@if` y `@for`.
- Usa standalone components.
- Usa `inject()` donde corresponde.
- Usa rutas lazy.
- Usa interfaces sin `any`.
- Usa mappers para transformar API a ViewModel.
- Implementa al menos un POST real.
- Maneja errores basicos visualmente.
- Usa localStorage mediante servicio.
- Mantiene separacion entre `features`, `services`, `models` y `mappers`.

## Verificacion Antes De Entregar

```bash
npm run build
```

Luego probar manualmente:

```txt
http://localhost:4200/interpolacion
http://localhost:4200/componentes
http://localhost:4200/control-flow
http://localhost:4200/servicios-http
http://localhost:4200/rutas
http://localhost:4200/formularios
http://localhost:4200/local-storage
```

Para `Servicios HTTP`, el backend debe responder:

```txt
GET http://localhost:3000/api/health
```

## Nota Para Docentes

La base esta disenada para que no todo sea mecanico. Hay tareas sencillas, pero tambien retos donde el estudiante debe conectar varias ideas:

- Formulario reactivo -> payload -> POST -> mapper -> respuesta visual.
- Ruta con parametro -> servicio HTTP -> estado 404.
- API model -> ViewModel -> HTML.
- localStorage -> recuperar estado al recargar.

Estas tareas permiten evaluar comprension, no solo copia de codigo.
