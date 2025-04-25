import { useHelper } from "../../../../shared/helpers/useHelper";

export function useUser() {
    const { api } = useHelper();

    const getUsers = async () => {
        const { data: { data } } = await api.get(`/user`);
        return data;
    }

    const getUser = async (id) => {
        const { data: { data } } = await api.get(`/user/${id}`);
        return data;
    }

    return {
        getUsers,
        getUser
    }
}