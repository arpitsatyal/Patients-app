import { createStore } from "vuex";
import { IPatientResponse } from "./../types/patients";

interface State {
  patients: IPatientResponse[];
}

const store = createStore<State>({
  state() {
    return {
      patients: [] as IPatientResponse[],
    };
  },
  mutations: {
    addPatientsToState(state, payload) {
      state.patients = payload;
    },
  },
});

export default store;
