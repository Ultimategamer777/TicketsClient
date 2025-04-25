// mui
import { Stack } from "@mui/material";

// utils
import { deleteApi } from "../../../../shared/const/delete-api.const";
import { stateApi } from "../../../../shared/const/state-api.const";

// components
import { HandleDelete } from "../../../../components/HandleDelete";
import { HandleState } from "../../../../components/HandleState";
import CreateVaccinesModal from "./CreateVaccines";

// information
const data = [
  "Asignar esta vacuna a un paciente",
  "Relacionar esta vacuna con campañas de vacunación",
  "Acceder a informes relacionados con esta vacuna"
];

const activeData = [
  "Asignar esta vacuna a un paciente",
  "Relacionar esta vacuna con campañas de vacunación"
];

const desactiveData = [
  "Asignar esta vacuna a un paciente",
  "Relacionar esta vacuna con campañas de vacunación"
];

export default function RowActions({ id, state }) {
  return (
    <Stack direction="row" spacing={2}>
      <CreateVaccinesModal id={id} />

      <HandleDelete
        id={id}
        title={"¿Está seguro de ELIMINAR esta vacuna?"}
        subtitle={"Al eliminar esta vacuna, no podrá: "}
        showCustomTooltip={true}
        api={deleteApi.delete_vaccines}
        data={data}
      />

      <HandleState
        id={id}
        state={state}
        title={
          state
            ? "¿Está seguro de DESACTIVAR esta vacuna?"
            : "¿Está seguro de ACTIVAR esta vacuna?"
        }
        subtitle={
          state
            ? "Al desactivar esta vacuna, no podrá: "
            : "Al activar esta vacuna, recuperará la posibilidad de: "
        }
        showCustomTooltip={true}
        api={stateApi.active_vaccines}
        data={state ? desactiveData : activeData}
      />
    </Stack>
  );
}
