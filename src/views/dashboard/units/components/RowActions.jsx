import { Stack } from "@mui/material";

import { HandleDelete } from "../../../../components/HandleDelete"

import { HandleState } from "../../../../components/HandleState"
import { deleteApi } from "../../../../shared/const/delete-api.const";

import CreateUnitModal from "./CreateUnitModal"
import { stateApi } from "../../../../shared/const/state-api.const";

// information
const data = [
    "Puede causar conflictos con exámenes ya creados.",
    "Perderá la posibilidad de crear nuevos exámenes con esta unidad.",
];

const activeData = [
    "Podrá crear nuevos examenes con esta unidad.",
];

const desactiveData = [
    "Podrá crear nuevos examenes con esta unidad.",
];
export default function RowActions({ id, state }) {
    return (
        <>
            <Stack direction={"row"} spacing={2} justifyContent={"center"}>

                <CreateUnitModal id={id} />

                <HandleDelete
                    id={id}
                    title={"¿Está seguro de ELIMINAR esta unidad?"}
                    subtitle={"Al eliminar esta unidad:"}
                    showCustomTooltip={true}
                    api={deleteApi.delete_units}
                    data={data}
                />

                <HandleState
                    id={id}
                    state={state}
                    title={
                        state
                            ? "¿Está seguro de DESACTIVAR esta unidad?"
                            : "¿Está seguro de ACTIVAR esta unidad?"
                    }
                    subtitle={
                        state
                            ? "Al desactivar esta unidad no podrá:"
                            : "Al activar esta unidad:"
                    }
                    showCustomTooltip={true}
                    api={stateApi.active_units}
                    data={state ? desactiveData : activeData}
                />
            </Stack>
        </>
    )
}