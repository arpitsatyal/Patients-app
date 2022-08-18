<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="Patient Profile Manegement"
    >
      <span>Manage all your patients here!</span>
      <template #extra>
        <a-menu mode="horizontal">
          <a-sub-menu>
            <template #icon>
              <setting-outlined />
            </template>
            <template #title>Settings</template>
            <a-menu-item-group title="Actions">
              <a-menu-item @click="logout()">Logout</a-menu-item>
            </a-menu-item-group>
          </a-sub-menu>
        </a-menu>
      </template>
    </a-page-header>
    <br />
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  methods: {
    logout() {
      localStorage.clear();
      router.push("/");
    },
  },
});
</script>
