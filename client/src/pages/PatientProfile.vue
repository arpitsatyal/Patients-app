<template>
  <Header />
  <div>
    <section class="profile">
      <header class="header">
        <div class="details">
          <img src="" alt="John Doe" class="profile-pic" />
          <h1 class="heading">Claire Doe</h1>
          <div class="location">
            <p>Kochi, India</p>
          </div>
          <div class="stats">
            <div class="col-4">
              <p>Email</p>
              <h4>arpited7@gmail.com</h4>
            </div>
            <div class="col-4">
              <p>DOB</p>

              <h4>1998-07-29</h4>
            </div>
            <div class="col-4">
              <p>Contact</p>
              <h4>9818859220</h4>
            </div>
          </div>
        </div>
      </header>
    </section>

    <section>
      <h2 class="center mx-20">Allergies</h2>
      <table>
        <thead>
          <tr class="table-headers">
            <th>Name</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>PlayCo Group Universal Flex</td>
            <th class="mobile-header">Number</th>
            <td>2489</td>
            <th class="mobile-header">Market rate</th>
          </tr>
          <tr>
            <td>PlayCo Group Universal Flex</td>
            <th class="mobile-header">Number</th>
            <td>2489</td>
            <th class="mobile-header">Market rate</th>
          </tr>
          <tr>
            <td>PlayCo Group Universal Flex</td>
            <th class="mobile-header">Number</th>
            <td>2489</td>
            <th class="mobile-header">Market rate</th>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import Header from "../components/Header.vue";
import * as patientService from "../services/patients";

export default defineComponent({
  components: {
    Header,
  },
  setup() {
    const paramId = new URL(location.href).pathname.split("/")[2];
    return {
      paramId,
    };
  },
  methods: {
    async getPatient() {
      const response = await patientService.getOne(Number(this.paramId));
      console.log(response);
    },
  },
  created() {
    this.getPatient();
  },
});
</script>

<style scoped lang="scss">
@import "../assets/global.scss";
@import "../assets/profile.scss";
</style>
