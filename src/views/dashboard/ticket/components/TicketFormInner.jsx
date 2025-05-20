import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import {
    TextField,
    Button,
    Stack,
    Grid,
    MenuItem,
} from "@mui/material";

export default function TicketFormInner({
    id,
    user,
    ticketData,
    clientes,
    tags,
    prioridades,
    nodos,
    contactOptions,
    mutation,
}) {
    const [nodosDelCliente, setNodosDelCliente] = useState([]);

    return (
        <Formik
            enableReinitialize
            initialValues={{
                titulo: ticketData?.titulo || "",
                repor_falla_client: ticketData?.repor_falla_client || "",
                m_contacto: ticketData?.m_contacto || "",
                descripcion: ticketData?.descripcion || "",
                estado_ticket: ticketData?.estado_ticket || "abierto",
                user_id: user?.id || "",
                client_id: ticketData?.client?.id || "",
                tag: ticketData?.tag?.id || "",
                prioridad: ticketData?.prioridad?.id || "",
                nodo_id: ticketData?.client?.nodos?.[0]?.id || "",
                proveedor: ticketData?.client?.nodos?.[0]?.proveedores || "",
                ip_publica: ticketData?.client?.nodos?.[0]?.ip_publicas || "",
                ip_privadas: ticketData?.client?.nodos?.[0]?.ip_privadas || "",
                ip_enganches: ticketData?.client?.nodos?.[0]?.ip_enganches || "",
                modelo_router: ticketData?.client?.nodos?.[0]?.modelo_router || "",
                id_proveedores: ticketData?.client?.nodos?.[0]?.id_proveedores || "",
            }}
            onSubmit={(values) => mutation.mutate(values)}
        >
            {({ values, setFieldValue, isSubmitting }) => {
                useEffect(() => {
                    if (!id && values.client_id) {
                        const cliente = clientes?.find(c => c.id === values.client_id);
                        setNodosDelCliente(cliente?.nodos || []);
                    }
                }, [values.client_id, clientes]);

                const nodosActivos = id ? nodos : nodosDelCliente;

                return (
                    <Form>
                        <Stack spacing={2}>
                            <Grid container spacing={2}>
                                {/* TITULO */}
                                <Grid item xs={12} md={4}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        name="titulo"
                                        label="Título"
                                    />
                                </Grid>

                                {/* REPORTE FALLA */}
                                <Grid item xs={12} md={2}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        name="repor_falla_client"
                                        label="Reporte del Cliente"
                                    />
                                </Grid>

                                {/* CLIENTe NOMBRE */}
                                <Grid item xs={12} md={2}>
                                    {id ? (
                                        <Field
                                            as={TextField}
                                            fullWidth
                                            name="client_id"
                                            label="Cliente"
                                            value={ticketData?.client?.razon_social || ""}
                                            InputProps={{ readOnly: true }}
                                        />
                                    ) : (
                                        <Field
                                            as={TextField}
                                            select
                                            fullWidth
                                            name="client_id"
                                            label="Cliente"
                                        >
                                            <MenuItem value="">Selecciona un cliente</MenuItem>
                                            {clientes?.map((cliente) => (
                                                <MenuItem key={cliente.id} value={cliente.id}>
                                                    {cliente.razon_social}
                                                </MenuItem>
                                            ))}
                                        </Field>
                                    )}
                                </Grid>

                                {/* METODO CONTACTO */}
                                <Grid item xs={12} md={2}>
                                    <Field
                                        as={TextField}
                                        select
                                        fullWidth
                                        name="m_contacto"
                                        label="Medio de Contacto"
                                    >
                                        {contactOptions.map(({ value, Icon }) => (
                                            <MenuItem key={value} value={value}>
                                                <Icon style={{ marginRight: 8 }} fontSize="small" />
                                            </MenuItem>
                                        ))}
                                    </Field>
                                </Grid>

                                {/* NODOS */}
                                <Grid item xs={12} md={2}>
                                    <Field
                                        as={TextField}
                                        select
                                        fullWidth
                                        name="nodo_id"
                                        label="Nodo"
                                    >
                                        <MenuItem value="">Selecciona un nodo</MenuItem>
                                        {nodosActivos?.filter(n => n.nodos && n.id).map((nodo) => (
                                            <MenuItem key={`${nodo.id}-${nodo.nodos}`} value={nodo.id}>
                                                {nodo.nodos}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                </Grid>

                                {/* PROVEEDORES */}
                                <Grid item xs={12} md={2}>
                                    <Field
                                        as={TextField}
                                        select
                                        fullWidth
                                        name="proveedor"
                                        label="Proveedor"
                                    >
                                        <MenuItem value="">Selecciona un Proveedor</MenuItem>
                                        {nodosActivos?.filter(n => n.proveedores).map((nodo) => (
                                            <MenuItem key={`${nodo.id}-${nodo.proveedores}`} value={nodo.proveedores}>
                                                {nodo.proveedores}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                </Grid>

                                {/* TAG */}
                                <Grid item xs={12} md={2}>
                                    <Field
                                        as={TextField}
                                        select
                                        fullWidth
                                        name="tag"
                                        label="Etiqueta"
                                    >
                                        <MenuItem value="">Selecciona una etiqueta</MenuItem>
                                        {tags?.map((tag) => (
                                            <MenuItem key={tag.id} value={tag.id}>
                                                {tag.name}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                </Grid>

                                {/* PRIORIDAD */}
                                <Grid item xs={12} md={2}>
                                    <Field
                                        as={TextField}
                                        select
                                        fullWidth
                                        name="prioridad"
                                        label="Prioridad"
                                    >
                                        <MenuItem value="">Selecciona una prioridad</MenuItem>
                                        {prioridades?.map((p) => (
                                            <MenuItem key={p.id} value={p.id}>
                                                {p.name}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                </Grid>

                                {/* IP Pública */}
                                <Grid item xs={12} md={2}>
                                    <Field
                                        as={TextField}
                                        select
                                        fullWidth
                                        name="ip_publica"
                                        label="IP Pública"
                                    >
                                        <MenuItem value="">Selecciona una IP Pública</MenuItem>
                                        {nodosActivos?.filter(n => n.ip_publicas).map((nodo) => (
                                            <MenuItem key={`${nodo.id}-${nodo.ip_publicas}`} value={nodo.ip_publicas}>
                                                {nodo.ip_publicas}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                </Grid>

                                {/* IP Privada */}
                                <Grid item xs={12} md={2}>
                                    <Field
                                        as={TextField}
                                        select
                                        fullWidth
                                        name="ip_privadas"
                                        label="IP Privada"
                                    >
                                        <MenuItem value="">Selecciona una IP Privada</MenuItem>
                                        {nodosActivos?.filter(n => n.ip_privadas).map((nodo) => (
                                            <MenuItem key={`${nodo.id}-${nodo.ip_privadas}`} value={nodo.ip_privadas}>
                                                {nodo.ip_privadas}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                </Grid>

                                {/* IP Enganche */}
                                <Grid item xs={12} md={2}>
                                    <Field
                                        as={TextField}
                                        select
                                        fullWidth
                                        name="ip_enganches"
                                        label="IP Enganche"
                                    >
                                        <MenuItem value="">Selecciona una IP Enganche</MenuItem>
                                        {nodosActivos?.filter(n => n.ip_enganches).map((nodo) => (
                                            <MenuItem key={`${nodo.id}-${nodo.ip_enganches}`} value={nodo.ip_enganches}>
                                                {nodo.ip_enganches}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                </Grid>

                                {/* Modelo Router */}
                                <Grid item xs={12} md={2}>
                                    <Field
                                        as={TextField}
                                        select
                                        fullWidth
                                        name="modelo_router"
                                        label="Modelo Router"
                                    >
                                        <MenuItem value="">Selecciona un Modelo</MenuItem>
                                        {nodosActivos?.filter(n => n.modelo_router).map((nodo) => (
                                            <MenuItem key={`${nodo.id}-${nodo.modelo_router}`} value={nodo.modelo_router}>
                                                {nodo.modelo_router}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                </Grid>

                                {/*Ip Proveedores */}
                                <Grid item xs={12} md={2}>
                                    <Field
                                        as={TextField}
                                        select
                                        fullWidth
                                        name="id_proveedores"
                                        label="Ip Proveedores"
                                    >
                                        <MenuItem value="">Selecciona un Id</MenuItem>
                                        {nodosActivos?.filter(n => n.id_proveedores).map((nodo) => (
                                            <MenuItem key={`${nodo.id}-${nodo.id_proveedores}`} value={nodo.id_proveedores}>
                                                {nodo.id_proveedores}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                </Grid>

                                {/* DESCRIPCION */}
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        multiline
                                        rows={4}
                                        name="descripcion"
                                        label="Descripción"
                                    />
                                </Grid>
                            </Grid>

                            <Stack direction="row" justifyContent="flex-end">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={mutation.isPending || isSubmitting}
                                >
                                    Guardar
                                </Button>
                            </Stack>
                        </Stack>
                    </Form>
                );
            }}
        </Formik>
    );
}
