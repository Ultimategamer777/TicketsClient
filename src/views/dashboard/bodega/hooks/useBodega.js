import { useHelper } from "../../../../shared/helpers/useHelper";

export function useBodega() {
  const { api } = useHelper();

  const getBodegas = async () => {
    const {
      data: { data },
    } = await api.get("bodega");
    return data;
  };

  const getBodega = async (id) => {
    const {
      data: { data },
    } = await api.get(`bodega/${id}`);
    return data;
  };

  const onSubmit = async (values, isEdit, id) => {
    if (isEdit) {
      const {
        data: { data },
      } = await api.patch(`bodega/${id}`, values);
      return data;
    } else {
      const {
        data: { data },
      } = await api.post("bodega", values);
      return data;
    }
  };

  return {
    getBodegas,
    getBodega,
    onSubmit,
  };
}
