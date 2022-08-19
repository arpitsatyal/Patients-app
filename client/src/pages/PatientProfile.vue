<template>
  <Header />
  <section class="profile">
    <header class="header">
      <div class="details">
        <template v-if="patient.image">
          <img :src="patient.image" :alt="patient.firstName" class="profile-pic" />
        </template>
        <template v-else>
          <img
            src="@/assets/images/default.jpg"
            :alt="patient.firstName"
            class="profile-pic"
          />
        </template>
        <h1 class="heading">{{ patient.firstName }} {{ patient.lastName }}</h1>

        <div class="stats fontClass">
          <div class="col-4">
            <MailOutlined class="iconSize" />
            <h4>{{ patient.email }}</h4>
          </div>
          <div class="col-4">
            <HomeOutlined class="iconSize" />
            <h4>{{ patient.address }}</h4>
          </div>
          <div class="col-4">
            <PhoneOutlined class="iconSize" />
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
            <td>{{ parseDate() }}</td>
          </tbody>
        </template>
      </table>
    </template>
    <template v-else>
      <p class="center">There are no allergies for this patient as of now.</p>
    </template>
  </section>
</template>

<script lang="ts">
import { IPatientResponse } from "@/types/patients";
import { defineComponent } from "@vue/runtime-core";
import Header from "../components/Header.vue";
import { HomeOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons-vue";
import { Patient } from "@/services/patients";
import { useToast } from "vue-toastification";
import { toastError } from "../utils/toastError";

export default defineComponent({
  components: {
    Header,
    HomeOutlined,
    MailOutlined,
    PhoneOutlined,
  },
  data() {
    return {
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
    async getPatient() {
      Patient.getPatient(Number(this.paramId))
        .then((data) => {
          if (data) {
            this.patient = data;
          }
        })
        .catch((err) => toastError(err));
    },
    parseDate(): string {
      const parsedDate = new Date(this.patient.createdAt);
      let month: string | number = parsedDate.getMonth();
      let date: string | number = parsedDate.getDay();
      const year = parsedDate.getFullYear();
      if (month < 10 || date < 10) {
        month = `0${month}`;
        date = `0${date}`;
      }
      const formattedDate = `${year}-${month}-${date}`;
      return formattedDate;
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
