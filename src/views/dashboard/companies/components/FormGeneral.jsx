// react
import React, { useEffect, useState } from 'react'

// mui
import { Grid2, Stack, FormGroup } from '@mui/material'

// custom components
import InputField from '../../../../components/form_fields/InputField'

import { CompaniesIcon } from '../../../../shared/icons/companies-icon'

export default function FormGeneral() {
    return <Grid2 container justifyContent={"center"} spacing={3} sx={{ height: "max-content" }}>
        {/* LEFT SIDE */}
        <Grid2 size={{ xs: 12, md: 5 }}>
            <Stack direction={"column"} gap={3}>
                <InputField
                    name="company_name"
                    label="Razon social"
                    placeholder="Pepe Payo"
                    fullWidth
                />

                <InputField
                    name="comercial_name"
                    label="Nombre comercial"
                    placeholder="Pepe Payo"
                    fullWidth
                />

                <InputField
                    name="company_email"
                    label="Correo"
                    placeholder="mi_correo@gmail.com"
                    fullWidth
                />

                <InputField
                    name="company_phone"
                    label="Teléfono"
                    placeholder="0556161616"
                    fullWidth
                />
            </Stack>
        </Grid2>

        {/* RIGHT SIDE */}
        <Grid2 size={{ xs: 12, md: 5 }}>
            <Stack direction={"column"} gap={3}>
                <InputField
                    name="company_ruc"
                    label="RUC"
                    placeholder="12345678901"
                ></InputField>

                <InputField
                    name="company_address"
                    label="Dirección"
                    placeholder="Av. Orellana"
                    fullWidth
                />

                <InputField
                    name="city"
                    label="Ciudad"
                    placeholder="Ambato"
                    fullWidth
                />

                <InputField
                    name="company_logo"
                    label="Logo"
                    placeholder="mi_logo.png"
                    fullWidth
                />
            </Stack>
        </Grid2>
    </Grid2>
}