import { useHelper } from "../../../../shared/helpers/useHelper";

export function useNodos() {
    const { api } = useHelper();

    const getNodos = async () => {
        const {
            data: { data },
        } = await api.get("nodos");
        return data;
    };

    const getNodo = async (id) => {
        const {
            data: { data },
        } = await api.get(`nodos/${id}`);
        return data;
    };

    const getNodosIdClient = async (clienteId) => {
        const {
            data: { data },
        } = await api.post("/nodos/filter", { clienteId });
        return data; 
    };
      

    const onSubmit = async (values, clienteId, isEdit, id) => {
        if (isEdit) {
            const {
                data: { data },
            } = await api.patch(`nodos/${id}`, { ...values, clienteId });
            return data;
        } else {
            const {
                data: { data },
            } = await api.post("nodos", { ...values, clienteId });
            return data;
        }
    };

    return {
        getNodos,
        getNodo,
        getNodosIdClient,
        onSubmit,
    };
}
