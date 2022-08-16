<template>
  <div class="container">
    <div class="form">
      <form @submit="onSubmit" class="login-form">
        <input v-model="email" type="text" name="email" placeholder="Email" />
        <input
          v-model="password"
          type="password"
          name="password"
          placeholder="Password"
        />
        <button type="submit" class="btn">Login</button>
        <p class="message">
          Not registered yet? <router-link to="/signup">Sign Up</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent } from "@vue/runtime-core";
import * as authService from "../services/auth";
import { useToast } from "vue-toastification";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async onSubmit(e: Event) {
      e.preventDefault();
      const response = await authService.login({
        email: this.email,
        password: this.password,
      });
      if (response.data) {
        this.toast.success("Logged in successfully!");
        setTimeout(() => router.push("/dashboard"), 3000);
      } else {
        this.toast.error(response.message);
      }
    },
  },
  inheritAttrs: false, // disable 'non-props' warning
});
</script>

<style scoped lang="scss">
@import "../assets/login.scss";
</style>
