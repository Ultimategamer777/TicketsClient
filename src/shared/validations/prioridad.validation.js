import * as yup from 'yup';

export const prioridadValidationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
})