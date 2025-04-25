import * as yup from 'yup';

export const unitValidationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    abrevation: yup.string().required('Specialty is required'),
    description: yup.string().optional(),
})