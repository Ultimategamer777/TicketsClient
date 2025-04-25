// routing
import { Link } from "react-router-dom";

// mui
import { Stack, Button } from "@mui/material";

// utils
import { deleteApi } from "../../../../shared/const/delete-api.const";
import { stateApi } from "../../../../shared/const/state-api.const";

// components
import { HandleDelete } from "../../../../components/HandleDelete";
import { HandleState } from "../../../../components/HandleState";
import CreateSpecialtyModal from "./CreateSpecialty";

// information
const data = [
  "Asignar esta especialidad a un médico",
  "Relacionar esta especialidad con servicios clínicos",
  "Acceder a informes relacionados con esta especialidad"
];

const activeData = [
  "Asignar esta especialidad a un médico",
  "Relacionar esta especialidad con servicios clínicos"
];

const desactiveData = [
  "Asignar esta especialidad a un médico",
  "Relacionar esta especialidad con servicios clínicos"
];

export default function RowActions({ id, state }) {
  return (
    <Stack direction="row" spacing={2} justifyContent={"center"}>
      <CreateSpecialtyModal id={id} />

      <HandleDelete
        id={id}
        title={"¿Está seguro de ELIMINAR esta especialidad?"}
        subtitle={"Al eliminar esta especialidad, no podrá: "}
        showCustomTooltip={true}
        api={deleteApi.delete_specialty}
        data={data}
      />

      <HandleState
        id={id}
        state={state}
        title={
          state
            ? "¿Está seguro de DESACTIVAR esta especialidad?"
            : "¿Está seguro de ACTIVAR esta especialidad?"
        }
        subtitle={
          state
            ? "Al desactivar esta especialidad, no podrá: "
            : "Al activar esta especialidad, recuperará la posibilidad de: "
        }
        showCustomTooltip={true}
        api={stateApi.active_specialty}
        data={state ? desactiveData : activeData}
      />
    </Stack>
  );
}
