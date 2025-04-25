import * as yup from 'yup';

export const bodegaValidationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    ubicacion: yup.string().required('Ubicacion is required'),
})