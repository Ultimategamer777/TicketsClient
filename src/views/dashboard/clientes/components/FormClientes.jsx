// react
import { useEffect, useState } from "react";

// routing
import { useParams } from "react-router-dom";

// tanstack
import { useMutation, useQuery } from "@tanstack/react-query";

// mui
import { TextField, Button, Stack, InputAdornment, IconButton, Grid } from "@mui/material";

// formik
import { Formik, Form, Field } from "formik";

// validations
// import { clienteSchema } from "../../../../shared/validations/clientes.validation";

// components
import MainCard from "../../../../ui-component/cards/MainCard";

// icons
import { OpenEyeIcon, CloseEyeIcon } from "../../../../shared/icons";

// helpers
import { useHelper } from "../../../../shared/helpers/useHelper";

// hooks
import useClientes from "../hooks/useClientes";
import useRoles from "../../roles/hooks/useRol";

// sonner
import { Toaster, toast } from 'sonner';

// axios
import { AxiosError } from "axios";

export default function FormClientes() {
    const { id } = useParams();
    const { navigation } = useHelper();
    const { onSubmit, getClienteById } = useClientes();
    const { getRoles } = useRoles();
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(prev => !prev);


    const { data, isLoading } = useQuery({
        queryKey: ["get_cliente_by_id", id],
        queryFn: () => getClienteById(id),
        enabled: !!id,
        refetchOnWindowFocus: false,
    });

    const { data: rolesData } = useQuery({
        queryKey: ["roles"],
        queryFn: getRoles,
        refetchOnWindowFocus: false,
    });


    const mutation = useMutation({
        mutationFn: (values) => onSubmit(values, !!id, id),
        onSuccess: () => {
            toast.success("Cliente guardado correctamente");
            navigation(-1);
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || "Error al guardar");
            } else {
                toast.error("Ocurrió un error inesperado");
            }
        }
    });

    return (
        <>
            <MainCard>
                <Formik
                    enableReinitialize
                    initialValues={{
                        razon_social: data?.data?.razon_social || "",
                        nombre_comercial: data?.data?.nombre_comercial || "",
                        email: data?.data?.email || "",
                        contraseña: "",
                        roles: data?.data?.roles?.id || "",
                        telefono: data?.data?.telefono || "",
                        direccion: data?.data?.direccion || "",
                        valor: data?.data?.valor || ""
                    }}
                    // validationSchema={clienteSchema}
                    onSubmit={(values) => {
                        mutation.mutate(values)
                    }}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form>
                            <Stack spacing={2}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <Field
                                            as={TextField}
                                            name="razon_social"
                                            label="Razón Social"
                                            fullWidth
                                            error={touched.razon_social && Boolean(errors.razon_social)}
                                            helperText={touched.razon_social && errors.razon_social}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Field
                                            as={TextField}
                                            name="nombre_comercial"
                                            label="Nombre Comercial"
                                            fullWidth
                                            error={touched.nombre_comercial && Boolean(errors.nombre_comercial)}
                                            helperText={touched.nombre_comercial && errors.nombre_comercial}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Field
                                            as={TextField}
                                            name="email"
                                            label="Email"
                                            type="email"
                                            fullWidth
                                            error={touched.email && Boolean(errors.email)}
                                            helperText={touched.email && errors.email}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Field name="contraseña">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    type={showPassword ? "text" : "password"}
                                                    label="Contraseña"
                                                    fullWidth
                                                    error={touched.contraseña && Boolean(errors.contraseña)}
                                                    helperText={touched.contraseña && errors.contraseña}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton onClick={handleShowPassword} edge="end">
                                                                    {showPassword ? <OpenEyeIcon /> : <CloseEyeIcon />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Field name="roles">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    select
                                                    fullWidth
                                                    label="Rol"
                                                    error={touched.roles && Boolean(errors.roles)}
                                                    helperText={touched.roles && errors.roles}
                                                    SelectProps={{
                                                        native: true,
                                                    }}
                                                >
                                                    <option value="">Selecciona un rol</option>
                                                    {rolesData?.map((rol) => (
                                                        <option key={rol.id} value={rol.id}>
                                                            {rol.name}
                                                        </option>
                                                    ))}
                                                </TextField>
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Field
                                            as={TextField}
                                            name="telefono"
                                            label="Teléfono"
                                            fullWidth
                                            error={touched.telefono && Boolean(errors.telefono)}
                                            helperText={touched.telefono && errors.telefono}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Field
                                            as={TextField}
                                            name="direccion"
                                            label="Dirección"
                                            fullWidth
                                            error={touched.direccion && Boolean(errors.direccion)}
                                            helperText={touched.direccion && errors.direccion}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Field
                                            as={TextField}
                                            name="valor"
                                            label="Valor"
                                            type="number"
                                            fullWidth
                                            error={touched.valor && Boolean(errors.valor)}
                                            helperText={touched.valor && errors.valor}
                                        />
                                    </Grid>
                                </Grid>

                                <Stack direction="row" justifyContent="flex-end">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={mutation.isPending}
                                    >
                                        Guardar
                                    </Button>
                                </Stack>
                            </Stack>
                        </Form>
                    )}
                </Formik>
            </MainCard>
            <Toaster richColors position="top-right" expand={true} />
        </>
    );
}
