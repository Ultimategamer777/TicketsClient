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
import CreateModalNodos from "./CreateModalNodos"; 

// information
const data = [
  "Asignar este nodo a clientes",
  "Administrar conexiones basadas en el nodo",
  "Visualizar estadísticas del nodo"
];

const activeData = [
  "Asignar este nodo a clientes",
  "Administrar conexiones basadas en el nodo"
];

const desactiveData = [
  "Asignar este nodo a clientes",
  "Administrar conexiones basadas en el nodo"
];

export default function RowAction({ id, state }) {
  return (
    <Stack direction="row" spacing={2} justifyContent={"center"}>
      <CreateModalNodos id={id} />

      <HandleDelete
        id={id}
        title={"¿Está seguro de ELIMINAR este nodo?"}
        subtitle={"Al eliminar este nodo, no podrá: "}
        showCustomTooltip={true}
        api={deleteApi.delete_nodos} 
        query_client={"nodos"}
      />

      <HandleState
        id={id}
        state={state}
        title={
          state
            ? "¿Está seguro de DESACTIVAR este nodo?"
            : "¿Está seguro de ACTIVAR este nodo?"
        }
        subtitle={
          state
            ? "Al desactivar este nodo, no podrá: "
            : "Al activar este nodo, recuperará la posibilidad de: "
        }
        showCustomTooltip={true}
        api={stateApi.active_nodos} 
        data={state ? desactiveData : activeData}
      />
    </Stack>
  );
}
