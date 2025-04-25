import * as yup from 'yup';

export const tagValidationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
})