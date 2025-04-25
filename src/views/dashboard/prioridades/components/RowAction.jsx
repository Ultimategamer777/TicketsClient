// routing
import { Link } from "react-router-dom";

// mui
import { Stack } from "@mui/material";

// utils
import { deleteApi } from "../../../../shared/const/delete-api.const";
import { stateApi } from "../../../../shared/const/state-api.const";

// components
import { HandleDelete } from "../../../../components/HandleDelete";
import { HandleState } from "../../../../components/HandleState";
import CreateModalPrioridades from "./CreateModalPrioridades";

// information
const data = [
  "Asignar esta prioridad a tickets",
  "Filtrar tickets por nivel de prioridad",
  "Visualizar estadísticas de prioridad"
];

const activeData = [
  "Asignar esta prioridad a tickets",
  "Filtrar tickets por nivel de prioridad"
];

const desactiveData = [
  "Asignar esta prioridad a tickets",
  "Filtrar tickets por nivel de prioridad"
];

export default function RowAction({ id, state }) {
  return (
    <Stack direction="row" spacing={2} justifyContent={"center"}>
      <CreateModalPrioridades id={id} />

      <HandleDelete
        id={id}
        title={"¿Está seguro de ELIMINAR esta prioridad?"}
        subtitle={"Al eliminar esta prioridad, no podrá: "}
        showCustomTooltip={true}
        api={deleteApi.delete_prioridades}
        data={data}
        query_client={"priorities"}
      />

      <HandleState
        id={id}
        state={state}
        title={
          state
            ? "¿Está seguro de DESACTIVAR esta prioridad?"
            : "¿Está seguro de ACTIVAR esta prioridad?"
        }
        subtitle={
          state
            ? "Al desactivar esta prioridad, no podrá: "
            : "Al activar esta prioridad, recuperará la posibilidad de: "
        }
        showCustomTooltip={true}
        api={stateApi.active_priorities}
        data={state ? desactiveData : activeData}
      />
    </Stack>
  );
}
