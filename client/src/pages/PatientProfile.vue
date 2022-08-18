<template>
  <Header />
  <div>
    <section class="profile">
      <header class="header">
        <div class="details">
          <img :src="patient.image" alt="John Doe" class="profile-pic" />
          <h1 class="heading">{{ patient.firstName }} {{ patient.lastName }}</h1>
          <div class="location">
            <p>{{ patient.address }}</p>
          </div>
          <div class="stats">
            <div class="col-4">
              <p>Email</p>
              <h4>{{ patient.email }}</h4>
            </div>
            <div class="col-4">
              <p>DOB</p>

              <h4>{{ patient.dob }}</h4>
            </div>
            <div class="col-4">
              <p>Contact</p>
              <h4>{{ patient.contact }}</h4>
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
        <template :key="allergy" v-for="allergy in patient.allergies">
          <tbody>
            <td>{{ allergy }}</td>
            <td>2489</td>
          </tbody>
        </template>
      </table>
    </section>
  </div>
</template>

<script lang="ts">
import { IPatient } from "@/types/patients";
import { defineComponent } from "@vue/runtime-core";
import Header from "../components/Header.vue";
import * as patientService from "../services/patients";

export default defineComponent({
  components: {
    Header,
  },
  data() {
    return {
      patient: {} as IPatient,
    };
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
      if (response.data) {
        this.patient = response.data;
      }
    },
  },
  async created() {
    await this.getPatient();
  },
});
</script>

<style scoped lang="scss">
@import "../assets/global.scss";
@import "../assets/profile.scss";
</style>
