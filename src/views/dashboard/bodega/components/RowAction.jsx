// routing
import { Stack } from "@mui/material";

// utils
import { deleteApi } from "../../../../shared/const/delete-api.const";
import { stateApi } from "../../../../shared/const/state-api.const";

// components
import { HandleDelete } from "../../../../components/HandleDelete";
import { HandleState } from "../../../../components/HandleState";
import CreateModalBodega from "./CreateModalBodega";

// information
const data = [
  "Asignar productos a esta bodega",
  "Visualizar inventario desde esta bodega",
  "Gestionar entradas y salidas de productos"
];

const activeData = [
  "Asignar productos a esta bodega",
  "Visualizar inventario desde esta bodega"
];

const desactiveData = [
  "Asignar productos a esta bodega",
  "Visualizar inventario desde esta bodega"
];

export default function RowAction({ id, state }) {
  return (
    <Stack direction="row" spacing={2} justifyContent="center">
      <CreateModalBodega id={id} />

      <HandleDelete
        id={id}
        title={"¿Está seguro de ELIMINAR esta bodega?"}
        subtitle={"Al eliminar esta bodega, no podrá: "}
        showCustomTooltip={true}
        api={deleteApi.delete_bodega}
        data={data}
        query_client={"bodega"}
      />

      <HandleState
        id={id}
        state={state}
        title={
          state
            ? "¿Está seguro de DESACTIVAR esta bodega?"
            : "¿Está seguro de ACTIVAR esta bodega?"
        }
        subtitle={
          state
            ? "Al desactivar esta bodega, no podrá: "
            : "Al activar esta bodega, recuperará la posibilidad de: "
        }
        showCustomTooltip={true}
        api={stateApi.active_bodega}
        data={state ? desactiveData : activeData}
      />
    </Stack>
  );
}
