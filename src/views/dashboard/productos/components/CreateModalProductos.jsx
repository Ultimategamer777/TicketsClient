import { useState } from "react";

// mui
import {
    Modal,
    Fade,
    Backdrop,
    Typography,
    TextField,
    Button,
    Stack,
    Card,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";


// formik
import { Formik, Form, Field } from "formik";

// icons
import { PlusIcon, EditIcon, ProductosIcon } from "../../../../shared/icons";

// sonner
import { Toaster, toast } from "sonner";

// tanstack
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// validations
import { ProductosValidationSchema } from "../../../../shared/validations/productos.validation";

// axios
import { AxiosError } from "axios";

// hooks
import { useProductos } from "../hooks/useProductos";
import { useBodega } from "../../bodega/hooks/useBodega";

export default function CreateModalProductos({ id }) {
    const { getBodegas } = useBodega();
    const queryClient = useQueryClient();
    const { onSubmit, getProductos } = useProductos();

    const [open, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const { data, isLoading } = useQuery({
        queryKey: ["get_producto_by_id", id],
        queryFn: async () => await getProductos(id),
        enabled: open && !!id,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
    });

    const { data: bodegas = [] } = useQuery({
        queryKey: ["bodegas"],
        queryFn: getBodegas,
        refetchOnWindowFocus: false,
    });

    const mutation = useMutation({
        mutationFn: (values) => onSubmit(values, !!id, id),
        onSuccess: () => {
            toast.success(id ? "Producto editado correctamente" : "Producto guardado correctamente");
            handleClose();
            queryClient.invalidateQueries(["productos"]);
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Ocurrió un error inesperado");
            }
        },
    });

    return (
        <>
            {id ? (
                <IconButton onClick={handleOpenModal}>
                    <EditIcon />
                </IconButton>
            ) : (
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ width: "max-content" }}
                    onClick={handleOpenModal}
                    startIcon={<PlusIcon />}
                >
                    Agregar Producto
                </Button>
            )}

            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{ backdrop: { timeout: 500 } }}
            >
                <Fade in={open}>
                    <Card
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 500,
                            p: 4,
                        }}
                    >

                        <Formik
                            enableReinitialize
                            initialValues={
                                id
                                    ? {
                                        name: data?.name || "",
                                        description: data?.description || "",
                                        category: data?.category || "",
                                        cantidad: data?.cantidad || "",
                                        // stock: data?.stock || "",
                                        bodegaId: data?.bodega?.id || "",

                                    }
                                    : {
                                        name: "",
                                        description: "",
                                        category: "",
                                        cantidad: "",
                                        // stock: "",
                                        bodegaId: "",
                                    }
                            }
                            validationSchema={ProductosValidationSchema}
                            onSubmit={(values) => {
                                mutation.mutate(values);
                            }}
                        >
                            {({ errors, touched, values, handleChange }) => (
                                <Form>
                                    <Stack spacing={2}>

                                        <FormControl fullWidth error={touched.bodegaId && Boolean(errors.bodegaId)}>
                                            <InputLabel id="bodega-label">Bodega</InputLabel>
                                            <Select
                                                labelId="bodega-label"
                                                name="bodegaId"
                                                value={values.bodegaId}
                                                label="Bodega"
                                                onChange={handleChange}

                                            >
                                                {bodegas.map((bodega) => (
                                                    <MenuItem key={bodega.id} value={bodega.id}>
                                                        {bodega.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>

                                        <Field
                                            as={TextField}
                                            name="name"
                                            label="Nombre del producto"
                                            fullWidth
                                            placeholder="Ej. Switch TP-Link"
                                            error={touched.name && Boolean(errors.name)}
                                            helperText={touched.name && errors.name}
                                            disabled={isLoading}

                                        />

                                        <Field
                                            as={TextField}
                                            name="description"
                                            label="Descripción"
                                            fullWidth
                                            placeholder="Ej. Switch 24 puertos, 10/100/1000 Mbps"
                                            error={touched.description && Boolean(errors.description)}
                                            helperText={touched.description && errors.description}
                                            disabled={isLoading}
                                        />

                                        <Field
                                            as={TextField}
                                            name="category"
                                            label="Categoría"
                                            fullWidth
                                            placeholder=" TP-Link, Netgear, Cisco"
                                            error={touched.category && Boolean(errors.category)}
                                            helperText={touched.category && errors.category}
                                            disabled={isLoading}
                                        />

                                        <Field
                                            as={TextField}
                                            name="cantidad"
                                            label="Cantidad"
                                            fullWidth
                                            placeholder="Ej. 10"
                                            error={touched.cantidad && Boolean(errors.cantidad)}
                                            helperText={touched.cantidad && errors.cantidad}
                                            disabled={isLoading}
                                        />

                                        {/* <Field
                                            as={TextField}
                                            name="stock"
                                            label="Stock"
                                            fullWidth
                                            placeholder="Ej. 10"
                                            error={touched.stock && Boolean(errors.stock)}
                                            helperText={touched.stock && errors.stock}
                                            disabled={isLoading}
                                        /> */}



                                        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
                                            <Button onClick={handleClose} variant="outlined">
                                                Cancelar
                                            </Button>
                                            <Button type="submit" variant="contained" color="primary" disabled={mutation.isPending}>
                                                {id ? "Editar" : "Guardar"}
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Form>
                            )}
                        </Formik>

                    </Card>
                </Fade>
            </Modal>

            <Toaster richColors position="top-right" expand={true} />
        </>
    );
}
