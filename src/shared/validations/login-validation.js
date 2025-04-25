import * as yup from "yup";

export const validationSchemaLogin = yup.object({
    email: yup
        .string()
        .email("El correo ingresado no tiene un formato correcto")
        .required("Este campo es obligatorio"),
    password: yup
        .string()
        .required("Este campo es obligatorio")
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .max(20, "La contraseña debe tener máximo 20 caracteres"),
});