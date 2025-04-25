import { useHelper } from "../../../../shared/helpers/useHelper";

export function usePrioridades() {
  const { api } = useHelper();

  const getPrioridad = async () => {
    const {
      data: { data },
    } = await api.get("prioridades");
    return data;
  };

  const getPrioridades = async (id) => {
    const {
      data: { data },
    } = await api.get(`prioridades/${id}`);
    return data;
  };

  const onSubmit = async (values, isEdit, id) => {
    if (isEdit) {
      const {
        data: { data },
      } = await api.patch(`prioridades/${id}`, values);
      return data;
    } else {
      const {
        data: { data },
      } = await api.post("prioridades", values);
      return data;
    }
  };

  return {
    getPrioridad,
    getPrioridades,
    onSubmit,
  };
}
