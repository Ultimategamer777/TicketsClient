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
import CreateTagsModal from "./CreateTags";

// information
const data = [
  "Filtrar o categorizar tickets mediante esta etiqueta",
  "Visualizar estadísticas relacionadas con esta etiqueta",
  "Relacionar esta etiqueta con servicios o usuarios"
];

const activeData = [
  "Filtrar o categorizar tickets mediante esta etiqueta",
  "Relacionar esta etiqueta con servicios o usuarios"
];

const desactiveData = [
  "Filtrar o categorizar tickets mediante esta etiqueta",
  "Relacionar esta etiqueta con servicios o usuarios"
];

export default function RowActions({ id, state }) {
  return (
    <Stack direction="row" spacing={2} justifyContent={"center"}>
      <CreateTagsModal id={id} />

      <HandleDelete
        id={id}
        title={"¿Está seguro de ELIMINAR esta etiqueta?"}
        subtitle={"Al eliminar esta etiqueta, no podrá: "}
        showCustomTooltip={true}
        api={deleteApi.delete_tags}
        data={data}
        query_client={"tags"}
      />

      <HandleState
        id={id}
        state={state}
        title={
          state
            ? "¿Está seguro de DESACTIVAR esta etiqueta?"
            : "¿Está seguro de ACTIVAR esta etiqueta?"
        }
        subtitle={
          state
            ? "Al desactivar esta etiqueta, no podrá: "
            : "Al activar esta etiqueta, recuperará la posibilidad de: "
        }
        showCustomTooltip={true}
        api={stateApi.active_tags}
        data={state ? desactiveData : activeData}
      
      />
    </Stack>
  );
}
