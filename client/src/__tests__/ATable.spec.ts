import ATable from "../components/ATable.vue";
import { IPatientResponse } from "@/types/patients";
import { shallowMount, RouterLinkStub } from "@vue/test-utils";

it("renders proper texts.", () => {
  const wrapper = shallowMount(ATable, {
    props: {
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
    },
    stubs: {
      RouterLink: RouterLinkStub,
    },
    scopedSlots: {
      bodyCell: `
          <template slot-scope="{ column, record }" v-if="column.key === 'firstName'">
          <router-link :to="{ name: 'PatientProfile', params: { id: record.id } }">
            <div id="test-patient">{{ record.firstName }} {{ record.lastName }}</div>
          </router-link>
        </template>`,
    }
  });
  const patientNameSelector = wrapper.find("#test-patient");
  // see if the message renders
  expect(patientNameSelector.text()).toEqual("arpit satyal");
});
