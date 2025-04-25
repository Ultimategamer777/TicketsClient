import { validateGeneralSchema } from "../../../../shared/validations/companies.validation"

const formGeneral = {
    company_name: '',
    comercial_name: '',
    company_address: '',
    company_ruc: '',
    city: '',
    company_email: '',
    company_phone: '',
    company_logo: '',
}

export const useGeneral = () => {
    return {
        formGeneral,
        validateGeneralSchema
    }
}