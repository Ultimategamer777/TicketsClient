import * as yup from 'yup';

export const specialtySchema = yup.object().shape({
    name: yup.string().required('Name is required'),
})