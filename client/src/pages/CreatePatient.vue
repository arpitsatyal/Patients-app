<template>
  <section class="mt-60">
    <a-form
      :model="formState"
      name="validate_other"
      v-bind="formItemLayout"
      @finishFailed="onFinishFailed"
      @finish="onFinish"
    >
      <a-form-item
        label="First Name"
        name="firstName"
        :rules="[{ required: true, message: 'Please input your firstName!' }]"
      >
        <a-input v-model:value="formState.firstName" />
      </a-form-item>

      <a-form-item
        label="Last Name"
        name="lastName"
        :rules="[{ required: true, message: 'Please input your lastName!' }]"
      >
        <a-input v-model:value="formState.lastName" />
      </a-form-item>

      <a-form-item
        label="Email"
        name="email"
        :rules="[{ required: true, message: 'Please input your email!' }]"
      >
        <a-input v-model:value="formState.email" />
      </a-form-item>

      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item
        label="Contact"
        name="contact"
        :rules="[{ required: true, message: 'Please input your contact!' }]"
      >
        <a-input style="width: 100%" v-model:value="formState.contact" />
      </a-form-item>

      <a-form-item
        label="date of birth"
        name="dob"
        :rules="[{ required: true, message: 'Please input your dob!' }]"
      >
        <a-space direction="vertical" :size="12">
          <a-date-picker v-model:value="formState.dob" />
        </a-space>
      </a-form-item>

      <a-form-item
        name="address"
        label="Address"
        has-feedback
        :rules="[{ required: true, message: 'Please select your district!' }]"
      >
        <a-select
          v-model:value="formState.address"
          placeholder="Please select a district"
        >
          <a-select-option value="china">Kathmandu</a-select-option>
          <a-select-option value="usa">Bhaktapur</a-select-option>
          <a-select-option value="usa">Lalitpur</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item name="upload" label="Upload">
        <a-upload
          v-model:fileList="formState.upload"
          name="logo"
          action="/upload.do"
          list-type="picture"
        >
          <a-button>
            <template #icon><UploadOutlined /></template>
            Click to upload
          </a-button>
        </a-upload>
      </a-form-item>

      <a-form-item label="Dragger">
        <a-form-item name="dragger" no-style>
          <a-upload-dragger
            v-model:fileList="formState.dragger"
            name="files"
            action="/upload.do"
          >
            <p class="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p class="ant-upload-text">Click or drag file to this area to upload</p>
            <p class="ant-upload-hint">Support for a single or bulk upload.</p>
          </a-upload-dragger>
        </a-form-item>
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </section>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons-vue";
import * as patientService from "../services/patients";

export default defineComponent({
  components: {
    UploadOutlined,
    InboxOutlined,
  },
  setup() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const formState = reactive<Record<string, any>>({});
    const onFinish = async (values: any) => {
      const response = await patientService.create(values);
      console.log("response", response);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log("Failed:", errorInfo);
    };
    return {
      formState,
      onFinish,
      onFinishFailed,
      formItemLayout,
    };
  },
});
</script>

<style scoped lang="scss">
@import "../assets/global.scss";
</style>
