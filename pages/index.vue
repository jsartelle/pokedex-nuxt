<template>
  <section class="mt-3">
    <b-field grouped>
      <b-input
        v-model="searchText"
        type="search"
        icon="magnify"
        icon-right="close-circle"
        icon-right-clickable
        @icon-right-click="searchText = ''"
        rounded
        placeholder="Search"
      />

      <b-taginput
        class="mr-auto"
        v-model="visibleTypes"
        autocomplete
        :data="typeTags"
        @typing="filterTypeTags"
        open-on-focus
        keep-first
        :maxtags="2"
        :has-counter="false"
        attached
        placeholder="Filter Types"
      />

      <b-checkbox v-model="showLegendary">Legendary</b-checkbox>
      <b-checkbox v-model="showMythical">Mythical</b-checkbox>
      <b-checkbox v-model="showMegaEvolution">Mega Evolution</b-checkbox>
    </b-field>

    <b-table
      :data="visiblePokemon"
      paginated
      :per-page="20"
      :default-sort="['pokedex_number', 'asc']"
    >
      <b-table-column
        field="pokedex_number"
        label="#"
        numeric
        sortable
        v-slot="props"
      >
        {{ props.row.pokedex_number }}
      </b-table-column>

      <b-table-column field="name" label="Name" sortable v-slot="props">
        {{ props.row.name }}
      </b-table-column>

      <b-table-column field="type1" label="Type 1" v-slot="props">
        {{ props.row.type1 }}
      </b-table-column>

      <b-table-column field="type2" label="Type 2" v-slot="props">
        {{ props.row.type2 }}
      </b-table-column>

      <b-table-column field="hp" label="HP" numeric sortable v-slot="props">
        {{ props.row.hp }}
      </b-table-column>

      <b-table-column
        field="attack"
        label="Attack"
        numeric
        sortable
        v-slot="props"
      >
        {{ props.row.attack }}
      </b-table-column>

      <b-table-column
        field="defense"
        label="Defense"
        numeric
        sortable
        v-slot="props"
      >
        {{ props.row.defense }}
      </b-table-column>

      <b-table-column
        field="sp_attack"
        label="Sp. Atk"
        numeric
        sortable
        v-slot="props"
      >
        {{ props.row.sp_attack }}
      </b-table-column>

      <b-table-column
        field="sp_defense"
        label="Sp. Def"
        numeric
        sortable
        v-slot="props"
      >
        {{ props.row.sp_defense }}
      </b-table-column>

      <b-table-column
        field="speed"
        label="Speed"
        numeric
        sortable
        v-slot="props"
      >
        {{ props.row.speed }}
      </b-table-column>
    </b-table>
  </section>
</template>

<script>
import { mapState } from "vuex";

const typeNames = [
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
  "Fairy",
];

export default {
  name: "PokedexPage",
  data() {
    return {
      searchText: "",
      typeTags: [...typeNames],
      visibleTypes: [],
      showLegendary: true,
      showMythical: true,
      showMegaEvolution: true,
    };
  },
  computed: {
    ...mapState(["pokemon"]),
    visiblePokemon() {
      return this.pokemon.filter((entry) => {
        if (this.searchText) {
          if (
            !entry.name.toLowerCase().includes(this.searchText.toLowerCase())
          ) {
            return false;
          }
        }

        if (this.visibleTypes.length) {
          for (const type of this.visibleTypes) {
            if (![entry.type1, entry.type2].includes(type)) {
              return false;
            }
          }
        }

        if (!this.showLegendary && entry.is_legendary) return false;
        if (!this.showMythical && entry.is_mythical) return false;
        if (!this.showMegaEvolution && entry.is_mega) return false;

        return true;
      });
    },
  },
  methods: {
    filterTypeTags(text) {
      this.typeTags = typeNames.filter((name) =>
        name.toLowerCase().includes(text.toLowerCase())
      );
    },
  },
};
</script>
