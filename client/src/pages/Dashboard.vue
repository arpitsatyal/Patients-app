<template>
  <Header />
  <div class="my-20">
    <a-button type="primary" shape="round" :size="size">
      <router-link to="/add-patient">Add Patient</router-link>
    </a-button>
  </div>
  <section class="mt-30" v-if="patients.length">
    <ATable
      :patients="patients"
      :deletePatient="deletePatient"
      :markAsSpecial="markAsSpecial"
    />
  </section>
  <div v-else>
    <Loading v-if="isLoading" />
    <a-empty v-else class="mt-90" />
  </div>
</template>

<script lang="ts">
import { mapMutations } from "vuex";
import { useToast } from "vue-toastification";
import { defineComponent, ref } from "@vue/runtime-core";
import type { SizeType } from "ant-design-vue/es/config-provider";

import { logout } from "../utils/logout";
import Header from "@/components/Header.vue";
import ATable from "../components/ATable.vue";
import Loading from "../components/Loading.vue";
import { toastError } from "../utils/toastError";
import { IPatientResponse } from "@/types/patients";
import { patientService } from "../services/patients";

export default defineComponent({
  name: "Dashboard",
  data() {
    return {
      patients: [] as IPatientResponse[],
    };
  },
  components: {
    Header,
    Loading,
    ATable,
  },
  setup() {
    const toast = useToast();
    const isLoading = ref<boolean>(false);
    return {
      toast,
      isLoading,
      size: ref<SizeType>("large"),
    };
  },
  methods: {
    ...mapMutations(["addPatientsToState"]),

    deletePatient(id: number) {
      if (confirm("are you sure you want to delete this patient?")) {
        patientService
          .deletePatient(id)
          .then(() => {
            this.toast.warning("Patient deleted.");
            this.fetchAllPatients();
          })
          .catch((err) => toastError(err));
      }
    },
    markAsSpecial(patient: IPatientResponse, body: boolean) {
      patientService
        .markAsSpecial(body, patient.id)
        .then(() => {
          if (body) {
            this.toast.success(
              `Patient ${patient.firstName} ${patient.lastName} marked as special.`
            );
            this.fetchAllPatients();
          } else {
            this.toast.warning(
              `Patient ${patient.firstName} ${patient.lastName} un-marked as special.`
            );
            this.fetchAllPatients();
          }
        })
        .catch((err) => toastError(err));
    },

    fetchAllPatients() {
      this.isLoading = true;
      patientService
        .getPatients()
        .then((data) => {
          this.isLoading = false;
          this.patients = data;
          this.addPatientsToState(data);
        })
        .catch((err) => {
          this.isLoading = false;
          toastError(err);
          logout(3000);
        });
    },
  },
  created() {
    this.fetchAllPatients();
  },
  inheritAttrs: false,
});
</script>

<style scoped lang="scss">
@import "../assets/global.scss";
</style>
