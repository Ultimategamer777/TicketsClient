// routing
import { Link } from "react-router-dom";

// mui
import { Stack, IconButton } from "@mui/material";

// utils
import { deleteApi } from "../../../../shared/const/delete-api.const";
import { stateApi } from "../../../../shared/const/state-api.const";

// assets
import { EditIcon } from "../../../../shared/icons";

// components
import { HandleDelete } from "../../../../components/HandleDelete";
import { HandleState } from "../../../../components/HandleState";

// information
const deleteData = [
  "Consultar el historial del ticket",
  "Realizar seguimiento del estado",
  "Revisar comentarios o notas asociadas",
];

const activeData = [
  "Actualizar el estado del ticket",
  "Ver el progreso del ticket",
];

const desactiveData = [
  "Realizar cambios o agregar comentarios",
  "Enviar actualizaciones al cliente",
];

export default function RowActions({ id, state }) {
  return (
    <Stack direction="row" spacing={2}>
      <Link to={`/home/ticket/edit/${id}`}>
        <IconButton>
          <EditIcon />
        </IconButton>
      </Link>

      <HandleDelete
        id={id}
        title={"¿Está seguro de ELIMINAR este ticket?"}
        subtitle={"Al eliminar este ticket, perderá la capacidad de:"}
        showCustomTooltip={true}
        api={deleteApi.delete_ticket} 
        data={deleteData}
      />

      <HandleState
        id={id}
        state={state}
        title={
          state
            ? "¿Está seguro de DESACTIVAR este ticket?"
            : "¿Está seguro de ACTIVAR este ticket?"
        }
        subtitle={
          state
            ? "Al desactivarlo, ya no podrá:"
            : "Al activarlo, podrá:"
        }
        showCustomTooltip={true}
        api={stateApi.active_ticket} 
        data={state ? desactiveData : activeData}
      />
    </Stack>
  );
}
