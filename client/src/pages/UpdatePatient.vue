<template>
  <CreatePatient :paramId="paramId" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const paramId = new URL(location.href).pathname.split("/")[2];
    return {
      paramId,
    };
  },
});
</script>
