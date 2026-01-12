# Memory Game - Full Stack Application

Aplicación web de juego de memoria (concentración) desarrollada con React y NestJS.

## Tecnologías Utilizadas

### Frontend
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de estilos
- **Axios** - Cliente HTTP
- **React Testing Library** - Testing de componentes
- **Jest** - Framework de testing

### Backend
- **NestJS** - Framework de Node.js
- **TypeScript** - Tipado estático
- **TypeORM** - ORM para base de datos
- **PostgreSQL** - Base de datos relacional
- **Class Validator** - Validación de DTOs
- **Jest** - Framework de testing

### DevOps
- **Docker** - Contenedorización
- **Docker Compose** - Orquestación de contenedores
- **GitHub Actions** - CI/CD
- **Nginx** - Servidor web (frontend en producción)

## Requisitos Previos

Antes de ejecutar la aplicación, asegúrate de tener instalado:

### 1. Docker y Docker Compose
- **Docker Desktop** (recomendado para Windows/Mac)
  - Descarga desde: https://www.docker.com/products/docker-desktop
  - Versión mínima: Docker 20.10+
  - Docker Compose viene incluido en Docker Desktop

- **Docker Engine** (para Linux)
  ```bash
  # Ubuntu/Debian
  sudo apt-get update
  sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

  # Verificar instalación
  docker --version
  docker compose version
  ```

### 2. Node.js (solo para desarrollo local sin Docker)
- **Versión requerida**: Node.js 20.x o superior
- Descarga desde: https://nodejs.org/

### 3. PostgreSQL (solo para desarrollo local sin Docker)
- **Versión requerida**: PostgreSQL 16
- La aplicación usa PostgreSQL como base de datos
- Con Docker Compose, PostgreSQL se instala automáticamente en el contenedor
- Para instalación local: https://www.postgresql.org/download/

## Instalación y Ejecución con Docker

### Opción 1: Ejecución con Docker Compose (Recomendado)

Esta es la forma más sencilla de ejecutar la aplicación completa. Docker Compose instalará todas las dependencias automáticamente.

```bash
# 1. Clonar el repositorio
git clone https://github.com/BlueWay32Dev/uno-test-full-stack/
cd uno-test-full-stack

# 2. Levantar todos los servicios (PostgreSQL, Backend y Frontend)
docker compose up --build

# Espera a que todos los servicios estén listos (puede tomar 2-5 minutos la primera vez)
```

La aplicación estará disponible en:
- **Frontend**: http://localhost
- **Backend API**: http://localhost:3001
- **PostgreSQL**: localhost:5432

Para detener los servicios:
```bash
# Detener sin eliminar contenedores
docker compose stop

# Detener y eliminar contenedores
docker compose down

# Eliminar contenedores y volúmenes (limpieza completa)
docker compose down -v
```

### Opción 2: Ejecución en segundo plano

```bash
# Levantar servicios en background
docker compose up -d --build

# Ver logs de todos los servicios
docker compose logs -f

# Ver logs de un servicio específico
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f postgres

# Detener servicios
docker compose down
```

### Verificación de servicios

```bash
# Ver estado de contenedores
docker compose ps

# Verificar salud de PostgreSQL
docker compose exec postgres pg_isready -U postgres

# Acceder a logs del backend
docker compose logs backend

# Acceder a la base de datos
docker compose exec postgres psql -U postgres -d memory_game
```

## Instalación y Ejecución en Desarrollo Local (sin Docker)

### Backend

```bash
# 1. Navegar al directorio del backend
cd backend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
# Crear archivo .env con:
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=memory_game
FRONTEND_URL=http://localhost:3000
IMAGES_API_URL=https://challenge-uno.vercel.app/api/images

# 4. Asegurarse de tener PostgreSQL corriendo localmente
# Crear la base de datos:
psql -U postgres -c "CREATE DATABASE memory_game;"

# 5. Iniciar servidor de desarrollo
npm run start:dev

# El backend estará disponible en http://localhost:3001
```

### Frontend

```bash
# 1. Navegar al directorio del frontend
cd frontend

# 2. Instalar dependencias
npm install

# 3. Configurar variable de entorno
# Crear archivo .env con:
REACT_APP_API_URL=http://localhost:3001

# 4. Iniciar servidor de desarrollo
npm start

# El frontend estará disponible en http://localhost:3000
```

## Testing

### Backend Tests

```bash
cd backend

# Ejecutar todos los tests
npm test

# Tests con cobertura
npm run test:cov

# Tests en modo watch
npm run test:watch
```

### Frontend Tests

```bash
cd frontend

# Ejecutar todos los tests
npm test

# Tests sin modo watch
npm test -- --watchAll=false

# Tests con cobertura
npm test -- --coverage
```

## Estructura del Proyecto

```
uno-test-full-stack/
├── backend/
│   ├── src/
│   │   ├── users/          # Módulo de usuarios
│   │   ├── games/          # Módulo de juegos
│   │   ├── deck/           # Módulo de mazo de cartas
│   │   └── main.ts         # Punto de entrada
│   ├── test/               # Tests e2e
│   ├── Dockerfile          # Dockerfile del backend
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # Servicios API
│   │   └── types/          # Tipos TypeScript
│   ├── Dockerfile          # Dockerfile del frontend
│   └── package.json
├── .github/
│   └── workflows/
│       └── ci.yml          # Pipeline CI/CD
├── docker-compose.yml      # Orquestación de servicios
└── README.md
```

## Características

- Juego de memoria con cartas
- Registro de usuarios con RUT chileno
- Historial de partidas por usuario
- Estadísticas de juego (aciertos, errores, movimientos)
- Animaciones 3D en las cartas
- Diseño responsive
- Tests unitarios y de integración
- CI/CD con GitHub Actions
- Dockerización completa

## Variables de Entorno

### Backend (.env)
```env
NODE_ENV=production
PORT=3001
DB_HOST=postgres
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=memory_game
FRONTEND_URL=http://localhost
IMAGES_API_URL=https://challenge-uno.vercel.app/api/images
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:3001
```

## API Endpoints

### Users
- `POST /api/users` - Crear usuario
- `GET /api/users/:run` - Obtener usuario por RUN

### Games
- `POST /api/games` - Crear partida
- `GET /api/games/run/:run` - Obtener partidas por RUN
- `PUT /api/games/:id` - Actualizar partida

### Deck
- `GET /api/deck` - Obtener mazo de cartas aleatorias

## Troubleshooting

### El puerto 5432 ya está en uso
Si tienes PostgreSQL instalado localmente, detén el servicio o cambia el puerto en docker-compose.yml:
```yaml
postgres:
  ports:
    - "5433:5432"  # Usar puerto 5433 en el host
```

### El puerto 80 ya está en uso
Cambia el puerto del frontend en docker-compose.yml:
```yaml
frontend:
  ports:
    - "8080:80"  # Usar puerto 8080
```

### Error al construir imágenes
```bash
# Limpiar caché de Docker
docker system prune -a

# Reconstruir sin caché
docker compose build --no-cache
docker compose up
```

### Base de datos no se conecta
```bash
# Verificar logs de PostgreSQL
docker compose logs postgres

# Verificar salud del contenedor
docker compose ps postgres

# Reiniciar solo el servicio de PostgreSQL
docker compose restart postgres
```

## Autor

Desarrollado por Nicolás Antonio Roa Prado.

## Licencia

MIT
