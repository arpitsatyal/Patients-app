import { shallowMount } from "@vue/test-utils";
import Dashboard from '../pages/Dashboard.vue';

it("renders proper texts.", () => {
  const wrapper = shallowMount(Dashboard, {});
  // see if the message renders
  expect(wrapper.find(".my-20").text()).toEqual("Add Patient");
});
