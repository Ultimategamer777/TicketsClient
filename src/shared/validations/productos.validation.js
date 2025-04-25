import * as yup from 'yup';

export const ProductosValidationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    description: yup.string().required('Descripcion is required'),
    category: yup.string().required('Categoria is required'),
    cantidad: yup.string().required('Cantidad is required'),
    // stock: yup.string().required('Stock is required'),
    bodegaId: yup.string().required("La bodega es obligatoria"),


})