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

    return () => {
      cancelled = true;
    };
  }, [name]);

  return { pokemon, loading, error };
}