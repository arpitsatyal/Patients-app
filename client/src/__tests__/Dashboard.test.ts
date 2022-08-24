import { shallowMount } from "@vue/test-utils";

import Dashboard from "../pages/Dashboard.vue";
import { IPatientResponse } from "./../types/patients";

describe("Dashboard", () => {
  it("renders proper texts.", () => {
    const wrapper = shallowMount(Dashboard, {
      data() {
        return {
          patients: [
            {
              id: 1,
              firstName: "arpit",
              lastName: "satyal",
              email: "arpited7@gmail.com",
              contact: "12345",
              address: "ktm",
              dob: "1998-07-29",
              allergies: ["Pet allergies"],
            },
          ] as IPatientResponse[],
        };
      },
    });
    // const patientNameSelector = wrapper.find("#test-patient");
    expect(wrapper.find('.my-20').text()).toEqual('Add Patient');
    // expect(patientNameSelector.text()).toEqual("arpit satyal");
  });
});
