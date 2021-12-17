<template>
  <b-tag rounded :type="`is-type-${type}`">{{ type }}</b-tag>
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