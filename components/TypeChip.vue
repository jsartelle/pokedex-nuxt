<template functional>
  <b-tag rounded :type="`is-type-${props.type}`">{{ props.type }}</b-tag>
</template>

<script>
import types from "~/assets/types.json";

export default {
  name: "TypeChip",
  props: {
    type: {
      required: true,
      validator(value) {
        return types.includes(value);
      },
    },
  },
};
</script>