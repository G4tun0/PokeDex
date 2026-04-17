import { useState, useEffect } from 'react';
import { Pokemon } from '@/models/Pokemon';
import { pokemonService } from '@/services/pokemonService';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useSearch } from '@/hooks/useSearch';
import { PokemonCard } from '@/components/PokemonCard';
import { SearchBar } from '@/components/SearchBar';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export const HomePage = () => {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const { favorites } = useFavoritesStore();
  const { results, loading: searchLoading, error: searchError, search, clearResults } = useSearch();

  // Carga inicial de los primeros 151 pokémon
  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        setError(null);

        // Primero obtiene la lista de nombres
        const list = await pokemonService.getList(151);

        // Luego carga todos en paralelo con Promise.all
        const names = list.map((item) => item.name);
        const pokemonData = await pokemonService.getMultiple(names);

        setAllPokemon(pokemonData);
      } catch {
        setError('No se pudo cargar la PokéDex. Verifica tu conexión.');
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, []);

  const handleSearch = (query: string) => {
    setIsSearching(true);
    setShowFavorites(false);
    search(query);
  };

  const handleClear = () => {
    setIsSearching(false);
    clearResults();
  };

  // Decide qué pokémon mostrar según el estado activo
  const displayedPokemon = (): Pokemon[] => {
    if (isSearching) return results;
    if (showFavorites) {
      return allPokemon.filter((p) => favorites.includes(p.id));
    }
    return allPokemon;
  };

  const pokemon = displayedPokemon();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row
                        items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-blue-600">PokéDex</h1>
          <SearchBar onSearch={handleSearch} onClear={handleClear} />
          <button
            onClick={() => {
              setShowFavorites(!showFavorites);
              setIsSearching(false);
              clearResults();
            }}
            className={`text-sm px-4 py-2 rounded-lg border transition-colors
              ${showFavorites
                ? 'bg-yellow-400 border-yellow-400 text-white'
                : 'border-gray-300 text-gray-600 hover:border-yellow-400 hover:text-yellow-500'
              }`}
          >
            ⭐ Favoritos ({favorites.length})
          </button>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-5xl mx-auto px-4 py-8">

        {/* Estado de carga inicial */}
        {loading && (
          <LoadingSpinner message="Cargando los 151 pokémon originales..." />
        )}

        {/* Error de carga inicial */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg
                         hover:bg-blue-600 transition-colors text-sm"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Búsqueda en progreso */}
        {searchLoading && <LoadingSpinner message="Buscando pokémon..." />}

        {/* Error de búsqueda */}
        {searchError && !searchLoading && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-2">No encontrado</p>
            <p className="text-gray-400 text-sm">{searchError}</p>
          </div>
        )}

        {/* Sin favoritos */}
        {showFavorites && !loading && pokemon.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-1">Sin favoritos aún</p>
            <p className="text-gray-400 text-sm">
              Haz clic en ☆ en cualquier carta para agregar
            </p>
          </div>
        )}

        {/* Contador de resultados */}
        {!loading && !error && pokemon.length > 0 && (
          <p className="text-sm text-gray-400 mb-4">
            {isSearching
              ? `${pokemon.length} resultado(s) para tu búsqueda`
              : showFavorites
              ? `${pokemon.length} pokémon favorito(s)`
              : `${pokemon.length} pokémon`}
          </p>
        )}

        {/* Grid de pokémon */}
        {!loading && !searchLoading && pokemon.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
                          lg:grid-cols-5 gap-4">
            {pokemon.map((p) => (
              <PokemonCard key={p.id} pokemon={p} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};