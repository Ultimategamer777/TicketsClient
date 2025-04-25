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
    "Crear nuevos usuarios con este rol",
    "Editar los usuarios con este rol",
    "Eliminar los usuarios con este rol",
]

const activeData = [
    "Crear nuevos usuarios con este rol"
]

const desactiveData = [
    "Crear nuevos usuarios con este rol"
]

export default function RowActions({ id, state }) {
    return (
        <Stack direction="row" spacing={2}>
            <Link to={`/home/roles/edit/${id}`}>
                <IconButton>
                    <EditIcon />
                </IconButton>
            </Link>

            <HandleDelete
                id={id}
                title={"¿Está seguro de ELIMINAR este rol?"}
                subtitle={"Al eliminar este rol, no podrá: "}
                showCustomTooltip={true}
                api={deleteApi.delete_role}
                data={data}
            />

            <HandleState
                id={id}
                state={state}
                title={
                    state
                        ? "¿Está seguro de DESACTIVAR este rol?"
                        : "¿Está seguro de ACTIVAR este rol?"
                }
                subtitle={
                    state
                        ? "Al desactivar este rol, no podrá: "
                        : "Al activar este rol, recuperará la posibilidad de: "
                }
                showCustomTooltip={true}
                api={stateApi.active_role}
                data={state
                    ? desactiveData
                    : activeData
                }
            />
        </Stack>
    );
}