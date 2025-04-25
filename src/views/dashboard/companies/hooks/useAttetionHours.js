import { validateAttentionHoursSchema } from "../../../../shared/validations/companies.validation"

const formAttentionHours = {
    // attention_hours: [],
    attention_days: [],
    schedules: [], 
    time_between_appointment: 30,
}

const attentionDays = [
    {
        label: "Lunes",
        value: "lunes"
    },
    {
        label: "Martes",
        value: "martes"
    },
    {
        label: "Miercoles",
        value: "miercoles"
    },
    {
        label: "Jueves",
        value: "jueves"
    },
    {
        label: "Viernes",
        value: "viernes"
    },
    {
        label: "Sábado",
        value: "sabado"
    },
    {
        label: "Domingo",
        value: "domingo"
    }
]

export const useAttentionHours = () => {
    return {
        formAttentionHours,
        validateAttentionHoursSchema,
        attentionDays
    }
}