import { useHelper } from "../../../../shared/helpers/useHelper"

export function useTags() {

    const { api } = useHelper();

    const getTag = async () => {
        const { data: { data } } = await api.get("tags");
        return data
    }

    const getTags = async (id) => {
        const { data: { data } } = await api.get(`tags/${id}`);
        return data
    }

    const onSubmit = async (values, isEdit, id) => {
        if (isEdit) {
            const { data: { data } } = await api.patch(`tags/${id}`, values);
            return data
        } else {
            const { data: { data } } = await api.post("tags", values);
            return data
        }
    }

    return {
        getTag,
        getTags,
        onSubmit, 
    }
}