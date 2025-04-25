import { useHelper } from "../../../../shared/helpers/useHelper"

export function useSpecialty() {

    const { api } = useHelper();

    const getSpecialties = async () => {
        const { data: { data } } = await api.get("specialties");
        return data
    }

    const getSpecialty = async (id) => {
        const { data: { data } } = await api.get(`specialties/${id}`);
        return data
    }

    const onSubmit = async (values, isEdit, id) => {
        if (isEdit) {
            const { data: { data } } = await api.patch(`specialties/${id}`, values);
            return data
        } else {
            const { data: { data } } = await api.post("specialties", values);
            return data
        }
    }

    return {
        getSpecialties,
        onSubmit, 
        getSpecialty
    }
}