import * as yup from "yup"; 

export const roleSchema = yup.object({
    name: yup.string().required("Nombre es requerido"),
    permissions: yup.array().min(1, "Debe seleccionar al menos un permiso").required("Permisos es requerido"),
  })