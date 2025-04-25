import * as yup from "yup";

import { validarRuc } from "../utils/rucValidation";

export const validateGeneralSchema = yup.object().shape({
    company_name: yup.string().required("Nombre de la compañía requerido"),
    comercial_name: yup.string().required("Nombre comercial requerido"),
    company_ruc: yup.string().required("RUC requerido").test("ruc", "RUC inválido", (value) => {
        if (value) {
            return validarRuc(value);
        }
        return true;
    }).length(13, "RUC debe tener 13 dígitos"),
    company_address: yup.string().required("Dirección de la compañía requerido"),
    city: yup.string().required("Ciudad requerida"),
    company_email: yup.string().email("Correo electrónico inválido").required("Correo electrónico requerido"),
    company_phone: yup.string().required("Teléfono requerido"),
    // company_logo: yup.string().required("Logo requerido"),
})

// export const validateAttentionHoursSchema = yup.object().shape({
//     attention_hours: yup.array().of(
//         yup.object().shape({
//             day: yup.string().required("Día requerido"),
//             start_time: yup.string().required("Hora de inicio requerida"),
//             end_time: yup.string().required("Hora de fin requerida"),
//         })
//     ),
//     attention_days: yup.array().of(
//         yup.object().shape({
//             day: yup.string().required("Día requerido"),
//             start_time: yup.string().required("Hora de inicio requerida"),
//             end_time: yup.string().required("Hora de fin requerida"),
//         })
//     ),
//     time_between_appointment: yup.number().required("Tiempo entre citas requerido"),
// })

export const validateAttentionHoursSchema = yup.object().shape({
    attention_hours: yup.string().required("Nombre de la compañía requerido"),
    attention_days: yup.string().required("Nombre de la compañía requerido"),
    time_between_appointment: yup.number().required("Tiempo entre citas requerido"),
})

export const validateHours = yup.object().shape({
    initial_date: yup.string().required("Hora requerida"),
    final_date: yup.string()
        .required("Hora requerida")
        .test('not-equal', 'La hora de inicio no puede ser la misma que la de fin', function (value) {
            const initialDate = this.parent.initial_date;
            if (initialDate && value) {
                return initialDate !== value;
            }
            return true;
        }),
})