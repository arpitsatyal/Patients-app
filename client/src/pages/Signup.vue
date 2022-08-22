<template>
  <div class="info">
    <h2>Welcome to Patient Profile Manegement</h2>
    <p>Please login or sign up to continue.</p>
  </div>
  <div class="container">
    <div class="form">
      <form @submit="onSubmit" class="login-form">
        <input
          v-if="!isLogin"
          v-model="name"
          type="text"
          name="name"
          placeholder="Name"
        />
        <input v-model="email" type="text" name="email" placeholder="Email" />
        <input
          v-model="password"
          type="password"
          name="password"
          placeholder="Password"
        />
        <template v-if="isLogin">
          <button type="submit" class="btn" v-if="!loading">Login</button>

          <button type="submit" class="btn" disabled v-else>Logging in...</button>
          <p class="message">
            Not registered yet? <router-link to="/signup">Sign Up</router-link>
          </p>
        </template>
        <template v-else>
          <button type="submit" class="btn" v-if="!loading">Sign up</button>
          <button type="submit" class="btn" disabled v-else>Signing up....</button>
          <p class="message">Go Back to <router-link to="/">Login</router-link></p>
        </template>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { useToast } from "vue-toastification";
import { defineComponent, ref } from "@vue/runtime-core";

import router from "@/router";
import { authService } from "../services/auth";
import { toastError } from "../utils/toastError";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Signup",
  props: {
    isLogin: Boolean,
  },
  setup() {
    const loading = ref<boolean>(false);
    const toast = useToast();
    return { toast, loading };
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    onSubmit(e: Event) {
      e.preventDefault();
      if (this.isLogin) {
        this.loading = true;
        authService
          .login({
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            this.loading = false;
            this.toast.success(response.message);
            localStorage.setItem("token", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            setTimeout(() => router.push("/dashboard"), 1000);
          })
          .catch((err) => {
            this.loading = false;
            toastError(err);
          });
      } else {
        this.loading = true;
        authService
          .signup({
            name: this.name,
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            this.loading = false;
            this.toast.success(response.message);
            setTimeout(() => router.push("/"), 1000);
          })
          .catch((err) => {
            this.loading = false;
            toastError(err);
          });
      }
    },
  },
  inheritAttrs: false, // disable 'non-props' warning
});
</script>

<style scoped lang="scss">
@import "../assets/login.scss";
</style>
