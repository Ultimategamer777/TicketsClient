import { useHelper } from "../../../../shared/helpers/useHelper"

export function useUnits() {
    const { api } = useHelper();

    const getUnits = async () => {
        const { data: { data } } = await api.get('units');
        return data;
    }

    const getUnit = async (id) => {
        const { data: { data } } = await api.get('units/' + id);
        return data;
    }

    const onSubmit = async (values, isEdit, id) => {
        if (isEdit) {
            const { data: { data } } = await api.patch(`units/${id}`, values);
            return data;
        } else {
            const { data: { data } } = await api.post('units', values);
            return data;
        }
    }

    return {
        getUnits,
        getUnit, 
        onSubmit
    }
}