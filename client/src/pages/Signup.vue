<template>
  <div class="info">
    <h2>Welcome to Patient Profile Manegement</h2>
    <p>Please login or sign up to continue.</p>
  </div>
  <div class="container">
    <div class="form">
      <form @submit="onSubmit" class="login-form">
        <template v-if="!isLogin">
          <input v-model="name" type="text" name="name" placeholder="Name" />
        </template>
        <input v-model="email" type="text" name="email" placeholder="Email" />
        <input
          v-model="password"
          type="password"
          name="password"
          placeholder="Password"
        />
        <template v-if="isLogin">
          <button type="submit" class="btn">Login</button>
          <p class="message">
            Not registered yet? <router-link to="/signup">Sign Up</router-link>
          </p>
        </template>
        <template v-else>
          <button type="submit" class="btn">Sign up</button>
          <p class="message">Go Back to <router-link to="/">Login</router-link></p>
        </template>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent } from "@vue/runtime-core";
import { authService } from "../services/auth";
import { useToast } from "vue-toastification";
import { toastError } from "../utils/toastError";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Signup",
  props: {
    isLogin: Boolean,
  },
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
      if (this.isLogin) {
        authService
          .login({
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            this.toast.success(response.message);
            localStorage.setItem("user", JSON.stringify(response.data));
            setTimeout(() => router.push("/dashboard"), 3000);
          })
          .catch((err) => toastError(err));
      } else {
        authService
          .signup({
            name: this.name,
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            this.toast.success(response.message);
            setTimeout(() => router.push("/dashboard"), 3000);
          })
          .catch((err) => toastError(err));
      }
    },
  },
  inheritAttrs: false, // disable 'non-props' warning
});
</script>

<style scoped lang="scss">
@import "../assets/login.scss";
</style>
