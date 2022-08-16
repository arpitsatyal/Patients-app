<template>
  <div class="container">
    <div class="form">
      <form @submit="onSubmit" class="login-form">
        <input v-model="name" type="text" name="name" placeholder="Name" />
        <input v-model="email" type="text" name="email" placeholder="Email" />
        <input
          v-model="password"
          type="password"
          name="password"
          placeholder="Password"
        />
        <button type="submit" class="btn">Sign up</button>
        <p class="message">
          Go Back to<router-link to="/signup">Login</router-link>
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
  name: "Signup",
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async onSubmit(e: Event) {
      e.preventDefault();
      const response = await authService.signup({
        name: this.name,
        email: this.email,
        password: this.password,
      });
      if (response.data) {
        this.toast.success("Sign up successful! Now login.");
        setTimeout(() => router.push("/"), 3000);
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
