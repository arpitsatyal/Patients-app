<template>
  <Header />
  <h2 class="center">
    {{ paramId ? "Edit Patient" : "Add a New Patient" }}
  </h2>
  <section class="mt-30">
    <a-form
      :model="formState"
      name="validate_other"
      v-bind="formItemLayout"
      @finish="onFinish"
    >
      <a-form-item
        label="First Name"
        name="firstName"
        :rules="[
          !paramId && {
            required: true,
            message: 'Please input your first name!',
          },
        ]"
      >
        <a-input
          v-model:value="formState.firstName"
          :defaultValue="currentPatient && currentPatient.firstName"
        />
      </a-form-item>

      <a-form-item
        label="Last Name"
        name="lastName"
        :rules="[
          !paramId && {
            required: true,
            message: 'Please input your last name!',
          },
        ]"
      >
        <a-input
          v-model:value="formState.lastName"
          :defaultValue="currentPatient && currentPatient.lastName"
        />
      </a-form-item>

      <a-form-item
        label="Email"
        name="email"
        :rules="[!paramId && { required: true, message: 'Please input your email!' }]"
      >
        <a-input
          v-model:value="formState.email"
          :defaultValue="currentPatient && currentPatient.email"
        />
      </a-form-item>

      <a-form-item
        label="Contact"
        name="contact"
        :rules="[!paramId && { required: true, message: 'Please input your contact!' }]"
      >
        <a-input
          style="width: 100%"
          v-model:value="formState.contact"
          :defaultValue="currentPatient && currentPatient.contact"
        />
      </a-form-item>

      <a-form-item
        label="Date of Birth"
        name="dob"
        :rules="[!paramId && { required: true, message: 'Please input your dob!' }]"
      >
        <a-space direction="vertical" :size="12">
          <a-date-picker
            value-format="YYYY-MM-DD"
            v-model:value="formState.dob"
            :defaultValue="currentPatient && currentPatient.dob"
          />
        </a-space>
      </a-form-item>

      <a-form-item
        name="address"
        label="Address"
        has-feedback
        :rules="[
          !paramId && {
            required: true,
            message: 'Please select your district!',
          },
        ]"
      >
        <a-select
          v-model:value="formState.address"
          placeholder="Please select a district"
          :defaultValue="currentPatient && currentPatient.address"
        >
          <a-select-option value="Kathmandu">Kathmandu</a-select-option>
          <a-select-option value="Bhaktapur">Bhaktapur</a-select-option>
          <a-select-option value="Lalitpur">Lalitpur</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item name="allergies" label="Allergies">
        <a-select
          v-model:value="formState['allergies']"
          mode="multiple"
          placeholder="Please select allergies"
          :defaultValue="currentPatient && currentPatient.allergies"
        >
          <template :key="allergy" v-for="allergy in allergiesList">
            <a-select-option :value="allergy">{{ allergy }}</a-select-option>
          </template>
        </a-select>
      </a-form-item>

      <a-form-item name="image" label="Image">
        <a-upload
          :action="imageUrl"
          :headers="headers"
          v-model:fileList="formState.image"
          @change="handleChange"
          name="image"
          list-type="picture"
        >
          <a-button>
            <template #icon><UploadOutlined /></template>
            Click to upload
          </a-button>
        </a-upload>
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
        <a-button type="primary" v-if="loading" loading>Loading</a-button>
        <a-button type="primary" v-else html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </section>
</template>
<script lang="ts">
import { mapState } from "vuex";
import { useToast } from "vue-toastification";
import { defineComponent, reactive, ref } from "vue";
import { UploadOutlined } from "@ant-design/icons-vue";

import router from "@/router";
import Header from "@/components/Header.vue";
import { toastError } from "../utils/toastError";
import { getFromLS } from "@/utils/localStorage";
import { patientService } from "@/services/patients";
import { IPatient, IPatientResponse } from "@/types/patients";

export default defineComponent({
  props: {
    paramId: {
      type: String,
    },
  },
  components: {
    UploadOutlined,
    Header,
  },
  computed: {
    ...mapState(["patients"]),
  },
  setup(props) {
    const loading = ref<boolean>(false);
    const toast = useToast();
    let iData: any;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const allergiesList = [
      "Crustacean Allergies",
      "Gluten Allergies",
      "Egg Allergies",
      "Peanut Allergies",
      "Milk Allergies",
      "Pet Allergies",
      "Pollen Allergies",
      "Dust Mite Allergies",
      "Mold Allergies",
      "Sulfite Allergies",
    ];

    const formState = reactive<Record<string, any>>({});
    function handleChange(info: any) {
      if (info.file.status === "done") {
        iData = info.file.response;
      } else if (info.file.status === "error") {
        toast.error(info.file.response.error ?? "error uploading image.");
      }
    }

    const onFinish = (values: IPatient) => {
      loading.value = true;

      const { image, ...patientData } = values;
      if (props.paramId) {
        patientService
          .updatePatient({ ...patientData, image: iData }, Number(props.paramId))
          .then(() => {
            loading.value = false;
            toast.success("Patient updated successfully...");
            setTimeout(() => router.push("/dashboard"), 1000);
          })
          .catch((err) => {
            loading.value = false;
            toastError(err);
          });
      } else {
        patientService
          .addPatient({ ...patientData, image: iData })
          .then(() => {
            loading.value = false;
            toast.success("Patient created successfully...");
            setTimeout(() => router.push("/dashboard"), 1000);
          })
          .catch((err) => {
            loading.value = false;
            toastError(err);
          });
      }
    };

    return {
      loading,
      allergiesList,
      formState,
      onFinish,
      handleChange,
      formItemLayout,
    };
  },
  data() {
    return {
      currentPatient: {} as IPatientResponse,
      imageUrl: process.env.VUE_APP_API_URL + "/patients/upload-image",
      headers: {
        Authorization: `Bearer ${getFromLS("token")}`,
      },
    };
  },
  created() {
    const matched = this.patients.filter((patient: IPatientResponse) => {
      if (this.paramId) {
        if (patient.id === parseInt(this.paramId)) {
          return patient;
        }
      }
    });
    this.currentPatient = matched[0];
  },
});
</script>

<style scoped lang="scss">
@import "../assets/global.scss";
</style>
