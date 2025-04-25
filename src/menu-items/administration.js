import { SpecialtyIcon, UnitIcon, VaccinesIcon, CompaniesIcon } from "../shared/icons"

const icons = {
    SpecialtyIcon,
    UnitIcon,
    VaccinesIcon,
    CompaniesIcon,
}

export const AdminConfigs = {
    id: "admin",
    title: "Administración",
    type: "group",
    children: [
        {
            id: "companies",
            title: "Empresas",
            type: "item",
            url: "/home/companies",
            icon: icons.CompaniesIcon
        }, 
        {
            id: "specialty",
            title: "Especialidades",
            type: "item",
            url: "/home/specialty",
            icon: icons.SpecialtyIcon
        },
        {
            id: "units",
            title: "Unidades",
            type: "item",
            url: "/home/units",
            icon: icons.UnitIcon
        },
        {
            id: "vaccines",
            title: "Vacunas",
            type: "item",
            url: "/home/vaccines",
            icon: icons.VaccinesIcon
        },


    ]
}