import { useHelper } from "../../../../shared/helpers/useHelper";

export function useProductos() {
  const { api } = useHelper();

  const getProducto = async () => {
    const {
      data: { data },
    } = await api.get("productos");
    return data;
  };

  const getProductos = async (id) => {
    const {
      data: { data },
    } = await api.get(`productos/${id}`);
    return data;
  };

  const onSubmit = async (values, isEdit, id) => {
    if (isEdit) {
      const {
        data: { data },
      } = await api.patch(`productos/${id}`, values);
      return data;
    } else {
      const {
        data: { data },
      } = await api.post("productos", values);
      return data;
    }
  };

  return {
    getProducto,
    getProductos,
    onSubmit,
  };
}
