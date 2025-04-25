import * as yup from 'yup';

export const LoginValidation = yup.object({
  email: yup.string().email("Formato incorrecto del correo").required('Este campo es requerido'),
  password: yup.string().required('Este campo es requerido').min(8, 'Debe ingresar al menos 8 caracteres')
});

// .test(
//   "valid-domain",
//   "Dominio no permitido. Contacte con soporte para más información: +593 992419399",
//   (value) => {
//     const validDomains = [
//       "gmail.com",
//       "outlook.com",
//       "hotmail.com",
//       "yahoo.com",
//     ];
//     const domain = value.split("@")[1];
//     return validDomains.includes(domain);
//   }
// ),