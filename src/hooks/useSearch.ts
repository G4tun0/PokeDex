import { useState, useEffect, useCallback } from 'react';
import { Pokemon } from '@/models/Pokemon';
import { pokemonService } from '@/services/pokemonService';

interface UseSearchReturn {
  results: Pokemon[];
  loading: boolean;
  error: string | null;
  search: (query: string) => void;
  clearResults: () => void;
}

export function useSearch(): UseSearchReturn {
  const [results, setResults] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const search = useCallback((newQuery: string) => {
    setQuery(newQuery.trim().toLowerCase());
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
    setQuery('');
  }, []);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    let cancelled = false;

    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const pokemon = await pokemonService.getByName(query);
        if (!cancelled) setResults([pokemon]);
      } catch {
        if (!cancelled) {
          setResults([]);
          setError('No se encontró ningún Pokémon con ese nombre');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchResults();

    return () => {
      cancelled = true;
    };
  }, [query]);

  return { results, loading, error, search, clearResults };
}