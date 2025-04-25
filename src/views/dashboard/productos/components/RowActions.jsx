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
import CreateModalProductos from "./CreateModalProductos";

// information
const data = [
  "Visualizar este producto en el inventario",
  "Relacionar el producto a una bodega",
  "Gestionar stock o información relacionada"
];

const activeData = [
  "Visualizar este producto en el inventario",
  "Relacionar el producto a una bodega"
];

const desactiveData = [
  "Visualizar este producto en el inventario",
  "Relacionar el producto a una bodega"
];

export default function RowAction({ id, state }) {
  return (
    <Stack direction="row" spacing={2} justifyContent={"center"}>
      <CreateModalProductos id={id} />

      <HandleDelete
        id={id}
        title={"¿Está seguro de ELIMINAR este producto?"}
        subtitle={"Al eliminar este producto, no podrá: "}
        showCustomTooltip={true}
        api={deleteApi.delete_productos}
        data={data}
        query_client={"productos"}
      />

      <HandleState
        id={id}
        state={state}
        title={
          state
            ? "¿Está seguro de DESACTIVAR este producto?"
            : "¿Está seguro de ACTIVAR este producto?"
        }
        subtitle={
          state
            ? "Al desactivar este producto, no podrá: "
            : "Al activar este producto, recuperará la posibilidad de: "
        }
        showCustomTooltip={true}
        api={stateApi.active_productos}
        data={state ? desactiveData : activeData}
      />
    </Stack>
  );
}
