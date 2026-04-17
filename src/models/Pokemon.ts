// Interfaz para los stats (velocidad, ataque, etc.)
export interface PokemonStat {
  name: string;
  value: number;
}

// Interfaz para la lista básica que devuelve la API
export interface PokemonListItem {
  name: string;
  url: string;
}

// Interfaz para la respuesta cruda de la PokéAPI
// Usamos esto para tipar lo que llega del servidor
export interface PokeAPIResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Array<{
    type: { name: string };
  }>;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  stats: Array<{
    base_stat: number;
    stat: { name: string };
  }>;
}

// Clase principal — aplica OOP
// Encapsula los datos y agrega métodos de dominio
export class Pokemon {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly types: string[],
    public readonly sprite: string,
    public readonly height: number,
    public readonly weight: number,
    public readonly stats: PokemonStat[]
  ) {}

  // Getter — lógica de presentación dentro del modelo
  get formattedName(): string {
    return this.name.charAt(0).toUpperCase() + this.name.slice(1);
  }
  
  get primaryType(): string {
    return this.types[0];
  }

  // Altura en metros (la API devuelve decímetros)
  get heightInMeters(): string {
    return (this.height / 10).toFixed(1);
  }


  get weightInKg(): string {
    return (this.weight / 10).toFixed(1);
  }
}