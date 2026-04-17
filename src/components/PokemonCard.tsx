import { useNavigate } from 'react-router-dom';
import { Pokemon } from '@/models/Pokemon';
import { useFavoritesStore } from '@/store/useFavoritesStore';

interface PokemonCardProps {
  pokemon: Pokemon;
}

// Mapa de colores por tipo — patrón de datos a UI
const TYPE_COLORS: Record<string, string> = {
  fire: 'bg-red-100 text-red-700',
  water: 'bg-blue-100 text-blue-700',
  grass: 'bg-green-100 text-green-700',
  electric: 'bg-yellow-100 text-yellow-700',
  psychic: 'bg-pink-100 text-pink-700',
  ice: 'bg-cyan-100 text-cyan-700',
  dragon: 'bg-purple-100 text-purple-700',
  dark: 'bg-gray-700 text-gray-100',
  fairy: 'bg-pink-100 text-pink-600',
  fighting: 'bg-orange-100 text-orange-700',
  poison: 'bg-purple-100 text-purple-600',
  ground: 'bg-yellow-100 text-yellow-800',
  rock: 'bg-yellow-100 text-yellow-900',
  bug: 'bg-lime-100 text-lime-700',
  ghost: 'bg-purple-100 text-purple-800',
  steel: 'bg-gray-100 text-gray-600',
  normal: 'bg-gray-100 text-gray-600',
  flying: 'bg-sky-100 text-sky-700',
};

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const fav = isFavorite(pokemon.id);

  const handleCardClick = () => {
    navigate(`/pokemon/${pokemon.name}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    // Detiene la propagación para no disparar handleCardClick
    e.stopPropagation();
    toggleFavorite(pokemon.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer bg-white rounded-xl border border-gray-200
                 p-4 hover:shadow-lg hover:-translate-y-1 transition-all
                 duration-200 relative group"
    >
      {/* Botón de favorito */}
      <button
        onClick={handleFavoriteClick}
        className="absolute top-3 right-3 text-xl transition-transform
                   hover:scale-110 active:scale-95"
        aria-label={fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      >
        {fav ? '⭐' : '☆'}
      </button>

      {/* Número de pokédex */}
      <p className="text-xs text-gray-400 font-mono">
        #{String(pokemon.id).padStart(3, '0')}
      </p>

      {/* Imagen */}
      <img
        src={pokemon.sprite}
        alt={pokemon.formattedName}
        className="w-24 h-24 object-contain mx-auto my-2
                   group-hover:scale-110 transition-transform duration-200"
        loading="lazy"
      />

      {/* Nombre */}
      <h3 className="font-semibold text-gray-800 text-center capitalize mb-2">
        {pokemon.formattedName}
      </h3>

      {/* Tipos */}
      <div className="flex gap-1 justify-center flex-wrap">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className={`text-xs px-2 py-0.5 rounded-full font-medium
              ${TYPE_COLORS[type] ?? 'bg-gray-100 text-gray-600'}`}
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};