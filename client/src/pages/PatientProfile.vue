<template>
  <Header />
  <div v-if="patient.firstName">
    <section class="profile">
      <header class="header">
        <div class="details">
          <img
            v-if="patient.image"
            :src="patient.image"
            :alt="patient.firstName"
            class="profile-pic"
          />
          <img
            v-else
            src="@/assets/images/default.jpg"
            :alt="patient.firstName"
            class="profile-pic"
          />
          <h1 class="heading">{{ patient.firstName }} {{ patient.lastName }}</h1>

          <div class="stats fontClass">
            <div class="col-4">
              <MailOutlined class="iconStyle" />
              <h4>{{ patient.email }}</h4>
            </div>
            <div class="col-4">
              <HomeOutlined class="iconStyle" />
              <h4>{{ patient.address }}</h4>
            </div>
            <div class="col-4">
              <PhoneOutlined class="iconStyle" />
              <h4>{{ patient.contact }}</h4>
            </div>
          </div>
        </div>
      </header>
    </section>

    <section>
      <h2 class="center mx-20">Allergies</h2>
      <template v-if="patient.allergies && patient.allergies.length">
        <table>
          <thead class="center">
            <tr class="table-headers">
              <th>Name</th>
              <th>Date diagnosed</th>
            </tr>
          </thead>
          <template :key="allergy" v-for="allergy in patient.allergies">
            <tbody class="center">
              <td>{{ allergy }}</td>
              <td>{{ parseDate(patient.createdAt) }}</td>
            </tbody>
          </template>
        </table>
      </template>
      <p v-else class="center">There are no allergies for this patient as of now.</p>
    </section>
  </div>
  <Loading v-else />
</template>

<script lang="ts">
import { useToast } from "vue-toastification";
import { defineComponent } from "@vue/runtime-core";
import { HomeOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons-vue";

import Header from "../components/Header.vue";
import { parseDate } from "../utils/parseDate";
import Loading from "../components/Loading.vue";
import { toastError } from "../utils/toastError";
import { IPatientResponse } from "@/types/patients";
import { patientService } from "@/services/patients";

export default defineComponent({
  components: {
    Header,
    Loading,
    HomeOutlined,
    MailOutlined,
    PhoneOutlined,
  },
  data() {
    return {
      parseDate,
      patient: {} as IPatientResponse,
    };
  },
  setup() {
    const toast = useToast();
    const paramId = new URL(location.href).pathname.split("/")[2];
    return {
      toast,
      paramId,
    };
  },
  methods: {
    getPatient() {
      patientService
        .getPatient(Number(this.paramId))
        .then((data) => {
          if (data) {
            this.patient = data;
          }
        })
        .catch((err) => toastError(err));
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
