import { shallowMount } from "@vue/test-utils";
import CreatePatient from '../pages/CreatePatient.vue';

describe('should show valid texts', () => {
  it("show edit text", () => {
    const wrapper = shallowMount(CreatePatient, {
      props: {
          paramId: "1"
      },
      computed: {
        patients: []
      }
    });
    expect(wrapper.find(".center").text()).toEqual("Edit Patient");
  });
  
  it("show edit text", () => {
    const wrapper = shallowMount(CreatePatient, {
      computed: {
        patients: []
      }
    });
    expect(wrapper.find(".center").text()).toEqual("Add a New Patient");
  });
})