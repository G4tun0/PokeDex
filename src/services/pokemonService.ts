import axiosInstance from '@/api/axiosInstance';
import { Pokemon, PokemonListItem, PokeAPIResponse } from '@/models/Pokemon';

// Función pura que transforma la respuesta cruda de la API
// al modelo de dominio — patrón Adapter/Mapper
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

// Objeto que agrupa todas las operaciones relacionadas a Pokémon
// patrón Repository — abstrae el origen de los datos
export const pokemonService = {

  // Obtiene la lista básica (nombre + url) de los primeros N pokémon
  async getList(limit = 151, offset = 0): Promise<PokemonListItem[]> {
    const { data } = await axiosInstance.get<{
      results: PokemonListItem[];
    }>(`/pokemon?limit=${limit}&offset=${offset}`);
    return data.results;
  },

  // Obtiene el detalle completo de un pokémon por nombre o ID
  async getByName(name: string): Promise<Pokemon> {
    const { data } = await axiosInstance.get<PokeAPIResponse>(
      `/pokemon/${name.toLowerCase()}`
    );
    return mapToPokemon(data);
  },

  // Obtiene múltiples pokémon en paralelo — más eficiente que uno por uno
  async getMultiple(names: string[]): Promise<Pokemon[]> {
    const promises = names.map((name) => pokemonService.getByName(name));
    return Promise.all(promises);
  },
};