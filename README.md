## Arquitectura y estructura de carpetas

El proyecto sigue una arquitectura por capas donde cada carpeta tiene
una única responsabilidad:

src/
├── api/          # Configuración HTTP (Axios, baseURL, interceptors)
├── services/     # Lógica de negocio y llamadas a la API
├── models/       # Interfaces y clases TypeScript (dominio)
├── store/        # Estado global con Zustand
├── hooks/        # Custom hooks reutilizables
├── components/   # Componentes UI reutilizables
├── pages/        # Vistas completas asociadas a rutas
└── utils/        # Funciones puras auxiliares(No fue necesario en este caso)

**Principio aplicado:** Si la API cambia su estructura de respuesta,
solo se modifica `services/pokemonService.ts` — los componentes
no se enteran del cambio.

---

## Decisiones técnicas

### ¿Por qué Vite y no Create React App?
CRA está oficialmente deprecado desde 2023. Vite ofrece HMR
instantáneo y tiempos de inicio menores a 300ms.

### ¿Por qué Zustand y no Redux Toolkit?
El estado global de esta app es simple: una lista de IDs favoritos.
Zustand resuelve eso en 30 líneas sin boilerplate. Redux sería
over-engineering para este scope y lo usaría
en apps con múltiples slices y middlewares complejos.

### ¿Por qué una clase Pokemon y no solo una interface?
La clase encapsula lógica de dominio como `heightInMeters` o
`formattedName`. Esa lógica pertenece al objeto, no a los
componentes. Aplica el principio de encapsulación de OOP.

### ¿Por qué separar api/ de services/?
`api/` es infraestructura pura (configura Axios).
`services/` es lógica de dominio (sabe qué datos pedir y cómo
transformarlos). Si cambio de Axios a fetch nativo, solo toco `api/`.

### ¿Por qué Promise.all en la carga inicial?
Cargar 151 pokémon en serie sería ~30 segundos (151 × 200ms).
Con Promise.all se lanzan en paralelo y terminan en ~200ms.

---

## Patrones de diseño aplicados

- **Singleton** — `axiosInstance` es una instancia única compartida
- **Adapter/Mapper** — `mapToPokemon` transforma datos externos al modelo interno
- **Repository** — `pokemonService` abstrae el origen de los datos
- **Custom Hooks** — encapsulan lógica con estado reutilizable entre componentes

---

## Funcionalidades

- Listado de los 151 pokémon originales
- Búsqueda por nombre
- Filtro por tipo (fuego, agua, planta, etc.)
- Sistema de favoritos persistente en localStorage
- Página de detalle con stats, altura y peso
- Estados de carga y error en toda la app
- Diseño responsive mobile-first

---

## Cómo correr el proyecto localmente

```bash
# Clonar el repositorio
git clone [url del repo]
cd pokedex-app

# Instalar dependencias
npm install

# Correr en desarrollo
npm run dev

# Build de producción
npm run build
```

---

## API utilizada

[PokéAPI](https://pokeapi.co/) — API pública y gratuita, sin necesidad
de API key. Se consumen los endpoints `/pokemon` y `/pokemon/:name`.