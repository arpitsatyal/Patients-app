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
            message: 'Please input your firstName!',
          },
        ]"
      >
        <a-input v-model:value="formState.firstName" />
      </a-form-item>

      <a-form-item
        label="Last Name"
        name="lastName"
        :rules="[
          !paramId && {
            required: true,
            message: 'Please input your lastName!',
          },
        ]"
      >
        <a-input v-model:value="formState.lastName" />
      </a-form-item>

      <a-form-item
        label="Email"
        name="email"
        :rules="[!paramId && { required: true, message: 'Please input your email!' }]"
      >
        <a-input v-model:value="formState.email" />
      </a-form-item>

      <a-form-item
        label="Contact"
        name="contact"
        :rules="[!paramId && { required: true, message: 'Please input your contact!' }]"
      >
        <a-input style="width: 100%" v-model:value="formState.contact" />
      </a-form-item>

      <a-form-item
        label="Date of Birth"
        name="dob"
        :rules="[!paramId && { required: true, message: 'Please input your dob!' }]"
      >
        <a-space direction="vertical" :size="12">
          <a-date-picker value-format="YYYY-MM-DD" v-model:value="formState.dob" />
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
        >
          <template :key="allergy" v-for="allergy in allergiesList">
            <a-select-option :value="allergy">{{ allergy }}</a-select-option>
          </template>
        </a-select>
      </a-form-item>

      <a-form-item name="image" label="Upload">
        <a-upload v-model:fileList="formState.image" name="image" list-type="picture">
          <a-button>
            <template #icon><UploadOutlined /></template>
            Click to upload
          </a-button>
        </a-upload>
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
        <template v-if="loading">
          <a-button type="primary" loading>Loading</a-button>
        </template>
        <template v-else>
          <a-button type="primary" html-type="submit">Submit</a-button>
        </template>
      </a-form-item>
    </a-form>
  </section>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import { useToast } from "vue-toastification";
import Header from "@/components/Header.vue";
import { IPatient } from "@/types/patients";
import { patientService } from "@/services/patients";
import { toastError } from "../utils/toastError";

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
  setup(props) {
    const loading = ref<boolean>(false);
    const toast = useToast();
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

    const onFinish = (values: IPatient) => {
      loading.value = true;
      if (props.paramId) {
        patientService
          .updatePatient(values, Number(props.paramId))
          .then(() => {
            loading.value = false;
            toast.success("Patient updated successfully...");
          })
          .catch((err: any) => {
            loading.value = false;
            toastError(err);
          });
      } else {
        patientService
          .addPatient(values)
          .then(() => {
            loading.value = false;
            toast.success("Patient created successfully...");
          })
          .catch((err: any) => {
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
      formItemLayout,
    };
  },
});
</script>

<style scoped lang="scss">
@import "../assets/global.scss";
</style>
