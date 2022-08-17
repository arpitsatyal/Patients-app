<template>
  <h1>Patients</h1>
  <a-button type="primary" shape="round" :size="size">
    <router-link to="/add-patient">Add Patient</router-link>
  </a-button>
  <a-table :columns="columns" :data-source="patients">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'firstName'">
        <a> {{ record.firstName }} {{ record.lastName }} </a>
      </template>

      <template v-else-if="column.key === 'action'">
        <span class="pointer">
          <EditOutlined />
          <a-divider type="vertical" />
          <DeleteOutlined @click="deletePatient(record.id)" />
          <a-divider type="vertical" />
        </span>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts">
import { IPatientResponse } from "@/types/patients";
import { defineComponent, ref } from "@vue/runtime-core";
import * as patientService from "../services/patients";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import type { SizeType } from "ant-design-vue/es/config-provider";
import { useToast } from "vue-toastification";

const columns = [
  {
    title: "Name",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Contact",
    dataIndex: "contact",
    key: "contact",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "DOB",
    key: "dob",
    dataIndex: "dob",
  },
  {
    title: "Action",
    key: "action",
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
      await patientService.remove(id);
      this.toast.warning("Patient deleted.");
    },
  },
  async created() {
    const response = await patientService.getAll();
    if (response) {
      this.patients = response;
    }
  },
  inheritAttrs: false, // disable 'non-props' warning
});
</script>

<style scoped lang="scss">
@import "../assets/global.scss";
</style>
