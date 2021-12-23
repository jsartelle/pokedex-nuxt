declare module "~/assets/Pokemon_data.csv" {
  import { PokemonType } from "~/assets/pokemon-types.json";

  interface Pokemon {
    pokedex_number: number;
    name: string;
    generation: number;
    classfication: string;
    abilities: string; // TODO make array
    height_m: number;
    weight_kg: number;
    type1: PokemonType;
    type2: PokemonType;
    base_total: number;
    hp: number;
    attack: number;
    defense: number;
    sp_attack: number;
    sp_defense: number;
    speed: number;
    against_bug: number;
    against_dark: number;
    against_dragon: number;
    against_electric: number;
    against_fairy: number;
    against_fighting: number;
    against_fire: number;
    against_flying: number;
    against_ghost: number;
    against_grass: number;
    against_ground: number;
    against_ice: number;
    against_normal: number;
    against_poison: number;
    against_psychic: number;
    against_rock: number;
    against_steel: number;
    against_water: number;
    capture_rate: number;
    base_egg_steps: string; // TODO make number
    base_happiness: number;
    is_legendary: 0 | 1; // TODO make bool
    is_mythical: 0 | 1;
    is_mega: 0 | 1;
  }

  const pokemon: Pokemon[];
  export default pokemon;
}

declare module "~/assets/pokemon-types.json" {
  const pokemonTypes: [
    "None",
    "Normal",
    "Fighting",
    "Flying",
    "Poison",
    "Ground",
    "Rock",
    "Bug",
    "Ghost",
    "Steel",
    "Fire",
    "Water",
    "Grass",
    "Electric",
    "Psychic",
    "Ice",
    "Dragon",
    "Dark",
    "Fairy"
  ];
  export default pokemonTypes;
  export type PokemonType = typeof pokemonTypes[number];
}
