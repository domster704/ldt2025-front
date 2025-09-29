import {createAppSelector, RootState} from "@app/store/store";
import {patientAdapter} from "@entities/patient/model/adapters";

const baseSelector = (state: RootState) => state.patients.items;
const selectors = patientAdapter.getSelectors();
export const selectAllPatients = createAppSelector(
  baseSelector,
  (state) =>
    selectors.selectAll(state)
);

export const selectChosenPatient = (state: RootState) => state.patients.chosen;
