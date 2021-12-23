<template functional>
  <b-tag rounded :type="`is-type-${props.type}`">{{ props.type }}</b-tag>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

import { PokemonType } from "~/assets/pokemon-types.json";

export default Vue.extend({
  name: "TypeChip",
  props: {
    type: {
      required: true,
      type: String as PropType<PokemonType>,
    },
  },
});
</script>
