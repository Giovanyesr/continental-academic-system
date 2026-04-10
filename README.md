# 🎓 Universidad Continental — Sistema de Gestión Académica y Pagos

> Portal web universitario para la gestión de pagos académicos, consulta de servicios, historial de pagos y validación de identidad mediante DNI (simulación RENIEC).

---

## 📋 Descripción General

Sistema web **full-stack** desarrollado para la Universidad Continental que permite a los estudiantes autenticarse, consultar el catálogo de servicios académicos, realizar pagos en línea (simulación de pasarela), y visualizar su historial de pagos. Incluye validación de pagador mediante DNI.

---

## 🧱 Stack Tecnológico

### 🖥️ Frontend

| Tecnología | Versión | Descripción |
|---|---|---|
| **Next.js** | 16.2.3 | Framework React con App Router y SSR |
| **React** | 19.2.4 | Biblioteca de UI |
| **TypeScript** | ^5 | Tipado estático |
| **Tailwind CSS** | ^4 | Estilos utilitarios |
| **ESLint** | ^9 | Linting de código |

**Arquitectura frontend:**
- App Router de Next.js (rutas basadas en carpetas)
- Context API para manejo de estado de autenticación (`AuthContext`)
- Componentes reutilizables: `Sidebar`, `Header`, `MobileMenu`, `PageHeader`, `Toast`, `LoadingSkeleton`
- Páginas: `login`, `dashboard`, `portal`, `catalogo`, `perfil`, `cursos`, `docentes`, `horarios`, `aula-virtual`

---

### ⚙️ Backend

| Tecnología | Versión | Descripción |
|---|---|---|
| **Node.js** | LTS | Entorno de ejecución |
| **Express** | ^5.2.1 | Framework HTTP |
| **TypeScript** | ^6.0.2 | Tipado estático |
| **Prisma ORM** | ^5.22.0 | ORM para base de datos |
| **ts-node** | ^10.9.2 | Ejecución directa de TypeScript |
| **nodemon** | ^3.1.14 | Recarga automática en desarrollo |
| **CORS** | ^2.8.6 | Manejo de cross-origin requests |
| **dotenv** | ^17.4.1 | Manejo de variables de entorno |

**Puerto por defecto:** `3001`

---

### 🗄️ Base de Datos

| Tecnología | Descripción |
|---|---|
| **PostgreSQL** | Motor de base de datos relacional |
| **Prisma ORM** | Acceso y migraciones con schema declarativo |

#### Modelos de datos:

```
Estudiante         → datos personales + credenciales
Pago               → transacciones de pago (método, banco, estado, monto)
DetallePago        → líneas de detalle por servicio dentro de un pago
Servicio           → catálogo de servicios académicos por fases (1–8)
```

#### Catálogo de servicios (8 fases):

| Fase | Categoría | Ejemplos |
|---|---|---|
| 1 | Tesis | Asesor académico, revisiones |
| 2 | Sustentación | Derecho de sustentación, jurados |
| 3 | Bachiller / Titulación | Trámite de diploma |
| 4 | Carné | Nuevo, renovación, duplicado |
| 5 | Certificados | Constancia de estudios, historial |
| 6 | Biblioteca | Carné, multas, acceso a BD |
| 7 | Deportes | Gym, natación, torneos |
| 8 | Bienestar | Seguro médico, bolsa de trabajo |

---

## 🔌 API REST — Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/api/auth/login` | Autenticación de estudiante |
| `GET` | `/api/auth/user/:id` | Obtener datos del usuario autenticado |
| `GET` | `/api/estudiantes/:criterio` | Buscar estudiante por DNI o código |
| `GET` | `/api/estudiantes/:id/pagos` | Historial de pagos del estudiante |
| `GET` | `/api/servicios` | Catálogo de servicios agrupado por fases |
| `POST` | `/api/pagos` | Procesar un pago |
| `GET` | `/api/dni/:dni` | Validar DNI (simulación RENIEC) |

---

## 🗂️ Estructura del Proyecto

```
continental/
├── backend/
│   ├── src/
│   │   └── index.ts          # Servidor Express + todos los endpoints
│   ├── prisma/
│   │   ├── schema.prisma     # Modelos de base de datos
│   │   └── seed.ts           # Datos iniciales (estudiantes + servicios)
│   ├── .env                  # Variables de entorno (DATABASE_URL, PORT)
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── app/              # Rutas (App Router de Next.js)
│   │   │   ├── page.tsx      # Página raíz (landing/redirect)
│   │   │   ├── login/        # Inicio de sesión
│   │   │   ├── dashboard/    # Panel principal del estudiante
│   │   │   ├── portal/       # Portal de pagos
│   │   │   ├── catalogo/     # Catálogo de servicios
│   │   │   ├── perfil/       # Perfil del estudiante
│   │   │   ├── cursos/       # Módulo de cursos
│   │   │   ├── docentes/     # Módulo de docentes
│   │   │   ├── horarios/     # Módulo de horarios
│   │   │   └── aula-virtual/ # Acceso al aula virtual
│   │   ├── components/       # Componentes reutilizables
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   ├── PageHeader.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── LoadingSkeleton.tsx
│   │   └── context/
│   │       └── AuthContext.tsx  # Estado global de autenticación
│   ├── package.json
│   └── tsconfig.json
│
├── start_backend.ps1         # Script de inicio del backend
├── start_frontend.ps1        # Script de inicio del frontend
├── create_db.ps1             # Script de creación de BD
├── run_prisma.ps1            # Script de migraciones + seed
└── README.md
```

---

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Node.js >= 18
- PostgreSQL instalado y corriendo
- npm

### 1. Configurar variables de entorno

Editar `backend/.env`:

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/continental_db"
PORT=3001
```

### 2. Instalar dependencias

```powershell
# Backend
cd backend
npm install

# Frontend
cd ..\frontend
npm install
```

### 3. Crear la base de datos y aplicar migraciones

```powershell
cd backend
npx prisma migrate dev --name init
npx prisma db seed
```

O usar el script incluido:

```powershell
.\run_prisma.ps1
```

### 4. Iniciar los servidores

**Backend** (puerto 3001):
```powershell
.\start_backend.ps1
# o manualmente:
cd backend && npx ts-node src/index.ts
```

**Frontend** (puerto 3000):
```powershell
.\start_frontend.ps1
# o manualmente:
cd frontend && npm run dev
```

### 5. Acceder al sistema

Abrir en el navegador: **http://localhost:3000**

---

## 🔐 Credenciales de Prueba

| Campo | Valor |
|---|---|
| **Correo** | `demo@continental.edu.pe` |
| **Contraseña** | `demo123` |

| Campo | Valor |
|---|---|
| **Correo** | `75185427@continental.edu.pe` |
| **Contraseña** | `Ge75185427` |

---

## 🧪 DNI de Prueba para Validación RENIEC (Simulada)

| DNI | Nombre |
|---|---|
| `40389963` | Martina Ramos Arone |

---

## 📦 Scripts de PowerShell disponibles

| Script | Descripción |
|---|---|
| `start_backend.ps1` | Levanta el servidor Express en puerto 3001 |
| `start_frontend.ps1` | Levanta el servidor Next.js en puerto 3000 |
| `create_db.ps1` | Crea la base de datos PostgreSQL |
| `run_prisma.ps1` | Ejecuta migraciones y seed de Prisma |

---

## 👨‍💻 Autor

**Sanchez Ramos Giovany Elver**  
Ingeniería de Sistemas e Informática — Universidad Continental

---

*Sistema desarrollado para uso académico e institucional.*
