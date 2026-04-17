import { useState, useEffect } from 'react';
import { Pokemon } from '@/models/Pokemon';
import { pokemonService } from '@/services/pokemonService';

interface UsePokemonReturn {
  pokemon: Pokemon | null;
  loading: boolean;
  error: string | null;
}

export function usePokemon(name: string): UsePokemonReturn {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) return;

    // Flag para evitar actualizar estado en componentes desmontados
    // Si el componente se desmonta antes de que termine el fetch,
    // cancelled = true evita el setState y el memory leak
    let cancelled = false;

    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await pokemonService.getByName(name);
        if (!cancelled) setPokemon(data);
      } catch (err) {
        if (!cancelled) setError('No se pudo cargar el Pokémon');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchPokemon();

    // Cleanup function — se ejecuta cuando el componente
    // se desmonta o cuando cambia la dependencia [name]
    return () => {
      cancelled = true;
    };
  }, [name]);

  return { pokemon, loading, error };
}