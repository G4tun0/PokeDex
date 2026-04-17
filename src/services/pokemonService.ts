import axiosInstance from '@/api/axiosInstance';
import { Pokemon, PokemonListItem, PokeAPIResponse } from '@/models/Pokemon';

const mapToPokemon = (data: PokeAPIResponse): Pokemon => {
  return new Pokemon(
    data.id,
    data.name,
    data.types.map((t) => t.type.name),
    data.sprites.other['official-artwork'].front_default,
    data.height,
    data.weight,
    data.stats.map((s) => ({
      name: s.stat.name,
      value: s.base_stat,
    }))
  );
};

export const pokemonService = {

  async getList(limit = 151, offset = 0): Promise<PokemonListItem[]> {
    const { data } = await axiosInstance.get<{
      results: PokemonListItem[];
    }>(`/pokemon?limit=${limit}&offset=${offset}`);
    return data.results;
  },

  async getByName(name: string): Promise<Pokemon> {
    const { data } = await axiosInstance.get<PokeAPIResponse>(
      `/pokemon/${name.toLowerCase()}`
    );
    return mapToPokemon(data);
  },

  async getMultiple(names: string[]): Promise<Pokemon[]> {
    const promises = names.map((name) => pokemonService.getByName(name));
    return Promise.all(promises);
  },
};