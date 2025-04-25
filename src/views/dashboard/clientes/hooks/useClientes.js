import { useHelper } from "../../../../shared/helpers/useHelper";

export default function useClientes() {
  const { api } = useHelper();

  const getClientes = async () => {
    const { data: { data } } = await api.get('/clientes');
    return data;
  };

  const getClienteById = async (id) => {
    const response = await api.get(`/clientes/${id}`);
    return response.data;
  };

  const handleCliente = async (values, isEdit) => {
    const { data: { data } } = await api.post(`/clientes/${isEdit ? values.id : ''}`, values);
    return data;
  };

  const onSubmit = async (values, isEdit = false, id = "") => {
    if (isEdit) {
      const { data } = await api.patch(`/clientes/${id}`, values);
      return data;
    } else {
      const { data } = await api.post('/clientes', values);
      return data;
    }
  };

  return {
    getClientes,
    getClienteById,
    handleCliente,
    onSubmit
  };
}