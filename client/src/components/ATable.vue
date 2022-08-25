<template>
  <section>
    <a-table :columns="columns" :data-source="patients" :pagination="false">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'firstName'">
          <router-link :to="{ name: 'PatientProfile', params: { id: record.id } }">
            <span id="test-patient">{{ record.firstName }} {{ record.lastName }}</span>
          </router-link>
        </template>
        <template v-else-if="column.key === 'specialAttention'">
          <span class="pointer">
            <EyeOutlined
              v-if="record.specialAttention"
              @click="markAsSpecial(record, false)"
              class="iconStyle"
            />
            <EyeInvisibleOutlined
              v-else
              @click="markAsSpecial(record, true)"
              class="iconStyle"
            />
          </span>
        </template>

        <template v-else-if="column.key === 'action'">
          <span class="pointer">
            <router-link :to="{ name: 'UpdatePatient', params: { id: record.id } }">
              <EditOutlined style="margin-right: 10px" class="iconStyle" />
            </router-link>
            <a-divider type="vertical" />
            <DeleteOutlined @click="deletePatient(record.id)" class="iconStyle" />
            <a-divider type="vertical" />
          </span>
        </template>
      </template>
    </a-table>
  </section>
</template>

<script lang="ts">
import {
  EditOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons-vue";
import { defineComponent } from "@vue/runtime-core";

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
  props: ["deletePatient", "markAsSpecial", "patients"],
  components: {
    EditOutlined,
    DeleteOutlined,
    EyeInvisibleOutlined,
    EyeOutlined,
  },
  data() {
    return {
      columns,
    };
  },
});
</script>
