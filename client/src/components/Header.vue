<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <a-page-header
    @click="goToDashboard"
    style="border: 1px solid rgb(235, 237, 240)"
    class="pointer"
    title="Patient Profile Management"
  >
    <template #extra>
      <a-menu mode="horizontal">
        <a-sub-menu>
          <template #icon>
            <SettingOutlined />
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
</template>

<script lang="ts">
import router from "@/router";
import { logout } from "@/utils/logout";
import { defineComponent } from "@vue/runtime-core";
import { SettingOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    SettingOutlined,
  },
  methods: {
    logout,
    goToDashboard() {
      router.push("/dashboard");
    },
  },
});
</script>

<style scoped lang="scss">
@import "../assets/global.scss";
</style>
