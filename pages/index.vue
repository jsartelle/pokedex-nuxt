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
      >
        <template v-slot="props">
          <TypeChip :type="props.option" />
        </template>
      </b-taginput>

      <b-dropdown
        v-model="visibleGroups"
        :triggers="['hover']"
        multiple
        aria-role="list"
      >
        <template #trigger>
          <b-button
            :label="`Groups (${visibleGroups.length}/4)`"
            icon-left="pokeball"
            icon-right="menu-down"
          />
        </template>

        <b-dropdown-item value="standard" aria-role="listitem"
          >Standard</b-dropdown-item
        >
        <b-dropdown-item value="legendary" aria-role="listitem"
          >Legendary</b-dropdown-item
        >
        <b-dropdown-item value="mythical" aria-role="listitem"
          >Mythical</b-dropdown-item
        >
        <b-dropdown-item value="mega" aria-role="listitem"
          >Mega Evolution</b-dropdown-item
        >
      </b-dropdown>
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
        <TypeChip :type="props.row.type1" />
      </b-table-column>

      <b-table-column field="type2" label="Type 2" v-slot="props">
        <TypeChip :type="props.row.type2" />
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
import TypeChip from "~/components/TypeChip.vue";

import { mapState } from "vuex";

import pokemon from "~/assets/Pokemon_data.csv";
import types from "~/assets/types.json";

export default {
  name: "PokedexPage",
  components: {
    TypeChip,
  },
  data() {
    return {
      searchText: "",
      typeTags: types,
      visibleTypes: [],
      visibleGroups: ["standard", "legendary", "mythical", "mega"],
    };
  },
  computed: {
    visiblePokemon() {
      return pokemon.filter((entry) => {
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

        if (!this.visibleGroups.includes("legendary") && entry.is_legendary)
          return false;
        if (!this.visibleGroups.includes("mythical") && entry.is_mythical)
          return false;
        if (!this.visibleGroups.includes("mega") && entry.is_mega) return false;

        if (
          !this.visibleGroups.includes("standard") &&
          !entry.is_legendary &&
          !entry.is_mythical &&
          !entry.is_mega
        ) {
          return false;
        }

        return true;
      });
    },
  },
  methods: {
    filterTypeTags(text) {
      this.typeTags = types.filter((name) =>
        name.toLowerCase().includes(text.toLowerCase())
      );
    },
  },
};
</script>
