import * as yup from 'yup';

export const nodoValidationSchema = yup.object().shape({
  clienteId: yup
    .string()
    .uuid('Debe ser un UUID válido')
    .required('El cliente es obligatorio'),

  nodos: yup
    .string()
    .required('El nombre del nodo es obligatorio'),

  proveedores: yup
    .string()
    .required('El proveedor es obligatorio'),

  ip_publicas: yup
    .string()
    .required('La IP pública es obligatoria'),

  ip_privadas: yup
    .string()
    .required('La IP privada es obligatoria'),

  ip_enganches: yup
    .string()
    .required('La IP de enganches es obligatoria'),

  modelo_router: yup
    .string()
    .required('El modelo de router es obligatorio'),

  enganches: yup
    .boolean()
    .required('Debes indicar si tiene enganches'),

  velocidades: yup
    .string()
    .required('La velocidad es obligatoria'),

  id_proveedores: yup
    .string()
    .required('El ID del proveedor es obligatorio'),

  respaldo: yup
    .boolean()
    .required('Debes indicar si tiene respaldo'),

  intervalo_respaldo: yup
    .string()
    .required('El intervalo de respaldo es obligatorio'),

  version_mikrotik: yup
    .string()
    .required('La versión de Mikrotik es obligatoria'),

  firewall: yup
    .boolean()
    .required('Debes indicar si tiene firewall'),
});
