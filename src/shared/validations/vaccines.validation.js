import * as yup from 'yup';

export const vaccineSchema = yup.object().shape({
  name: yup
    .string()
    .required('El nombre de la vacuna es obligatorio'),

  // manufacturer: yup
  //   .string()
  //   .required('El fabricante es obligatorio'),

  recomendedAge: yup
    .number()
    .typeError('La edad recomendada debe ser un número')
    .min(0, 'La edad mínima debe ser mayor o igual a 0')
    .required('La edad recomendada es obligatoria'),

  dosesRequired: yup
    .number()
    .typeError('La cantidad de dosis debe ser un número')
    .min(1, 'Debe requerir al menos una dosis')
    .required('La cantidad de dosis es obligatoria'),
});
