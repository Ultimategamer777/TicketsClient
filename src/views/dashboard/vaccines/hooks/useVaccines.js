import { useHelper } from "../../../../shared/helpers/useHelper";

export function useVaccine() {

    const { api } = useHelper();

    const getVaccines = async () => {
        const { data: { data } } = await api.get("vaccines");
        return data;
    };

    const getVaccine = async (id) => {
        const { data: { data } } = await api.get(`vaccines/${id}`);
        return data;
    };

    const onSubmit = async (values, isEdit, id) => {
        if (isEdit) {
            const { data: { data } } = await api.patch(`vaccines/${id}`, values);
            return data;
        } else {
            const { data: { data } } = await api.post("vaccines", values);
            return data;
        }
    };

    return {
        getVaccines,
        getVaccine,
        onSubmit,
    };
}
