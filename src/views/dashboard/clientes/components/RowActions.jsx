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
const data = [
    "Visualizar información del cliente",
    "Editar datos del cliente",
    "Consultar historial de nodos asociados",
];

const activeData = [
    "Visualizar y administrar sus nodos activos"
];

const desactiveData = [
    "Acceder al panel del cliente",
    "Gestionar sus servicios contratados"
];

export default function RowActions({ id, state }) {
    return (
        <Stack direction="row" spacing={2}>
            <Link to={`/home/clientes/edit/${id}`}>
                <IconButton>
                    <EditIcon />
                </IconButton>
            </Link>

            <HandleDelete
                id={id}
                title={"¿Está seguro de ELIMINAR este cliente?"}
                subtitle={"Al eliminar este cliente, perderá la capacidad de:"}
                showCustomTooltip={true}
                api={deleteApi.delete_clientes}
                data={data}
            />

            <HandleState
                id={id}
                state={state}
                title={
                    state
                        ? "¿Está seguro de DESACTIVAR este cliente?"
                        : "¿Está seguro de ACTIVAR este cliente?"
                }
                subtitle={
                    state
                        ? "Al desactivarlo, el cliente no podrá:"
                        : "Al activarlo, el cliente podrá:"
                }
                showCustomTooltip={true}
                api={stateApi.active_clientes}
                data={state ? desactiveData : activeData}
            />
        </Stack>
    );
}
