<template>
  <Header />
  <div class="my-20">
    <a-button type="primary" shape="round" :size="size">
      <router-link to="/add-patient">Add Patient</router-link>
    </a-button>
  </div>
  <section class="mt-30" v-if="patients.length">
    <a-table :columns="columns" :data-source="patients" :pagination="false">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'firstName'">
          <router-link
            :to="{ name: 'PatientProfile', params: { id: record.id } }"
          >
            {{ record.firstName }} {{ record.lastName }}
          </router-link>
        </template>

        <template v-else-if="column.key === 'specialAttention'">
          <span class="pointer">
            <template v-if="record.specialAttention">
              <EyeOutlined
                @click="markAsSpecial(record, false)"
                class="iconStyle"
              />
            </template>
            <template v-else>
              <EyeInvisibleOutlined
                @click="markAsSpecial(record, true)"
                class="iconStyle"
              />
            </template>
          </span>
        </template>

        <template v-else-if="column.key === 'action'">
          <span class="pointer">
            <router-link
              :to="{ name: 'UpdatePatient', params: { id: record.id } }"
            >
              <EditOutlined style="margin-right: 10px" class="iconStyle" />
            </router-link>
            <a-divider type="vertical" />
            <DeleteOutlined
              @click="deletePatient(record.id)"
              class="iconStyle"
            />
            <a-divider type="vertical" />
          </span>
        </template>
      </template>
    </a-table>
  </section>
  <div v-else>
    <Loading />
  </div>
</template>

<script lang="ts">
import { IPatientResponse } from "@/types/patients";
import { defineComponent, ref } from "@vue/runtime-core";
import { patientService } from "../services/patients";
import {
  EditOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons-vue";
import type { SizeType } from "ant-design-vue/es/config-provider";
import { useToast } from "vue-toastification";
import Header from "@/components/Header.vue";
import Loading from "../components/Loading.vue";
import { toastError } from "../utils/toastError";

const columns = [
  {
    title: "Name",
    dataIndex: "firstName",
    key: "firstName",
    align: "center",
  },
  {
    title: "Contact",
    dataIndex: "contact",
    key: "contact",
    align: "center",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    align: "center",
  },
  {
    title: "DOB",
    key: "dob",
    dataIndex: "dob",
    align: "center",
  },
  {
    title: "Special Attention",
    key: "specialAttention",
    align: "center",
  },
  {
    title: "Actions",
    key: "action",
    align: "center",
  },
];
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Dashboard",
  data() {
    return {
      patients: [] as IPatientResponse[],
    };
  },
  components: {
    EditOutlined,
    DeleteOutlined,
    EyeInvisibleOutlined,
    EyeOutlined,
    Header,
    Loading,
  },
  setup() {
    const toast = useToast();

    return {
      toast,
      columns,
      size: ref<SizeType>("large"),
    };
  },
  methods: {
    async deletePatient(id: number) {
      patientService
        .deletePatient(id)
        .then(() => {
          this.toast.warning("Patient deleted.");
          this.fetchAllPatients();
        })
        .catch((err) => toastError(err));
    },
    async markAsSpecial(patient: IPatientResponse, body: boolean) {
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
      patientService
        .getPatients()
        .then((data) => {
          if (data && data.length) {
            this.patients = data;
          }
        })
        .catch((err) => toastError(err));
    },
  },
  created() {
    this.fetchAllPatients();
  },
  inheritAttrs: false, // disable 'non-props' warning
});
</script>

<style scoped lang="scss">
@import "../assets/global.scss";
</style>
