import { useParams, useNavigate } from 'react-router-dom';
import { usePokemon } from '@/hooks/usePokemon';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { LoadingSpinner } from '@/components/LoadingSpinner';

// Mapa de colores de fondo por tipo principal
const TYPE_BG: Record<string, string> = {
  fire: 'bg-red-50',
  water: 'bg-blue-50',
  grass: 'bg-green-50',
  electric: 'bg-yellow-50',
  psychic: 'bg-pink-50',
  ice: 'bg-cyan-50',
  dragon: 'bg-purple-50',
  dark: 'bg-gray-100',
  fairy: 'bg-pink-50',
  fighting: 'bg-orange-50',
  poison: 'bg-purple-50',
  ground: 'bg-yellow-50',
  rock: 'bg-yellow-50',
  bug: 'bg-lime-50',
  ghost: 'bg-purple-50',
  steel: 'bg-gray-50',
  normal: 'bg-gray-50',
  flying: 'bg-sky-50',
};

// Colores para la barra de stats
const statColor = (value: number): string => {
  if (value >= 100) return 'bg-green-500';
  if (value >= 60) return 'bg-yellow-400';
  return 'bg-red-400';
};

export const DetailPage = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { pokemon, loading, error } = usePokemon(name ?? '');
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  if (loading) return <LoadingSpinner message="Cargando pokémon..." />;

  if (error || !pokemon) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-400">{error ?? 'Pokémon no encontrado'}</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg
                     hover:bg-blue-600 transition-colors text-sm"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  const fav = isFavorite(pokemon.id);
  const bgColor = TYPE_BG[pokemon.primaryType] ?? 'bg-gray-50';

  return (
    <div className={`min-h-screen ${bgColor}`}>
      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Botón volver */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-gray-500
                     hover:text-gray-800 transition-colors mb-6"
        >
          ← Volver
        </button>

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

          {/* Cabecera */}
          <div className={`${bgColor} p-8 flex flex-col items-center`}>
            <img
              src={pokemon.sprite}
              alt={pokemon.formattedName}
              className="w-40 h-40 object-contain drop-shadow-md"
            />
            <p className="text-gray-400 font-mono text-sm mt-2">
              #{String(pokemon.id).padStart(3, '0')}
            </p>
            <div className="flex items-center gap-3 mt-1">
              <h1 className="text-3xl font-bold text-gray-800">
                {pokemon.formattedName}
              </h1>
              <button
                onClick={() => toggleFavorite(pokemon.id)}
                className="text-2xl hover:scale-110 active:scale-95
                           transition-transform"
                aria-label={fav ? 'Quitar favorito' : 'Agregar favorito'}
              >
                {fav ? '⭐' : '☆'}
              </button>
            </div>

            {/* Tipos */}
            <div className="flex gap-2 mt-3">
              {pokemon.types.map((type) => (
                <span
                  key={type}
                  className="px-3 py-1 bg-white bg-opacity-70 rounded-full
                             text-sm font-medium text-gray-700 capitalize"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          {/* Info física */}
          <div className="grid grid-cols-2 divide-x divide-gray-100
                          border-b border-gray-100">
            <div className="p-4 text-center">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                Altura
              </p>
              <p className="font-semibold text-gray-800">
                {pokemon.heightInMeters} m
              </p>
            </div>
            <div className="p-4 text-center">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                Peso
              </p>
              <p className="font-semibold text-gray-800">
                {pokemon.weightInKg} kg
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="p-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase
                           tracking-wide mb-4">
              Estadísticas base
            </h2>
            <div className="flex flex-col gap-3">
              {pokemon.stats.map((stat) => (
                <div key={stat.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500 capitalize">
                      {stat.name.replace('-', ' ')}
                    </span>
                    <span className="font-semibold text-gray-700">
                      {stat.value}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500
                        ${statColor(stat.value)}`}
                      style={{ width: `${Math.min((stat.value / 150) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};