import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Interface que define la forma del estado global
// y las acciones disponibles — todo en un solo tipo
interface FavoritesState {
  favorites: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  // middleware persist — guarda el estado en localStorage
  // automáticamente entre recargas de página
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (id) =>
        set((state) => ({
          favorites: [...state.favorites, id],
        })),

      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((favId) => favId !== id),
        })),

      // Combina add y remove en una sola acción
      toggleFavorite: (id) => {
        const { isFavorite, addFavorite, removeFavorite } = get();
        isFavorite(id) ? removeFavorite(id) : addFavorite(id);
      },

      // get() lee el estado actual sin suscribirse
      isFavorite: (id) => get().favorites.includes(id),

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: 'pokedex-favorites', // clave en localStorage
    }
  )
);