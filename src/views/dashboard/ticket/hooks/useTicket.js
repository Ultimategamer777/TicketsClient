import { useHelper } from "../../../../shared/helpers/useHelper";

export default function useTicket() {
    const { api } = useHelper();

    const getTickets = async () => {
        const { data: { data } } = await api.get("/tickets");
        return data;
    };


    const getTicketById = async (id) => {
        const { data: { data } } = await api.get(`/tickets/${id}`);
        return data;
    };


    const handleTicket = async (values, isEdit) => {
        const { data: { data } } = await api.post(`/tickets/${isEdit ? values.id : ""}`, values);
        return data;
    };

    const onSubmit = async (values, isEdit = false, id = "") => {
        if (isEdit) {
            const { data } = await api.patch(`/tickets/${id}`, values);
            return data;
        } else {
            const { data } = await api.post("/tickets", values);
            return data;
        }
    };

    return {
        getTickets,
        getTicketById,
        handleTicket,
        onSubmit,
    };
}