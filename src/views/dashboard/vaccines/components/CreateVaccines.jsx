// react
import { useState } from "react";

// mui
import {
    Modal,
    Fade,
    Backdrop,
    TextField,
    Button,
    Stack,
    Card,
    IconButton
} from "@mui/material";

// formik
import { Formik, Form, Field } from "formik";

// icons
import { PlusIcon, VaccinesIcon, EditIcon } from "../../../../shared/icons";

// sonner
import { Toaster, toast } from "sonner";

// tanstack
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// validations
import { vaccineSchema } from "../../../../shared/validations/vaccines.validation";

// axios
import { AxiosError } from "axios";

// hooks
import { useVaccine } from "../hooks/useVaccines";

export default function CreateVaccinesModal({ id }) {
    const queryClient = useQueryClient();
    const { onSubmit, getVaccine } = useVaccine();
    const [open, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const { data, isLoading } = useQuery({
        queryKey: ["get_vaccine_by_id", id],
        queryFn: () => getVaccine(id),
        enabled: !!id,
        refetchOnWindowFocus: false,
    });

    const mutation = useMutation({
        mutationFn: (values) => onSubmit(values, !!id, id),
        onSuccess: () => {
            toast.success(id ? "Vacuna editada correctamente" : "Vacuna guardada correctamente");
            handleClose();
            queryClient.invalidateQueries(["vaccines"]);
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
            {
                id ? (
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
                        Agregar Vacuna
                    </Button>
                )
            }

            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{ backdrop: { timeout: 500 } }}
            >
                <Fade in={open}>
                    <Card sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 500,
                        p: 4,
                    }}>
                        <Formik
                            initialValues={{
                                name: data?.name || "",
                                // manufacturer: data?.manufacturer || "",
                                recomendedAge: data?.recomendedAge || "",
                                dosesRequired: data?.dosesRequired || "",
                            }}
                            validationSchema={vaccineSchema}
                            onSubmit={(values) => {
                                mutation.mutate(values);
                            }}
                            enableReinitialize
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    <Stack spacing={2}>
                                        <Field
                                            as={TextField}
                                            name="name"
                                            label="Nombre"
                                            fullWidth
                                            placeholder="Hepatitis B"
                                            error={touched.name && Boolean(errors.name)}
                                            helperText={touched.name && errors.name}
                                            disabled={isLoading}
                                        />

                                        {/* <Field
                                            as={TextField}
                                            name="manufacturer"
                                            label="Fabricante"
                                            fullWidth
                                            placeholder="Pfizer"
                                            error={touched.manufacturer && Boolean(errors.manufacturer)}
                                            helperText={touched.manufacturer && errors.manufacturer}
                                            disabled={isLoading}
                                        /> */}

                                        <Field
                                            as={TextField}
                                            type="number"
                                            name="recomendedAge"
                                            label="Edad Recomendada"
                                            fullWidth
                                            placeholder="12"
                                            error={touched.recomendedAge && Boolean(errors.recomendedAge)}
                                            helperText={touched.recomendedAge && errors.recomendedAge}
                                            disabled={isLoading}
                                        />

                                        <Field
                                            as={TextField}
                                            type="number"
                                            name="dosesRequired"
                                            label="Dosis Requeridas"
                                            fullWidth
                                            placeholder="2"
                                            error={touched.dosesRequired && Boolean(errors.dosesRequired)}
                                            helperText={touched.dosesRequired && errors.dosesRequired}
                                            disabled={isLoading}
                                        />

                                        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
                                            <Button onClick={handleClose} variant="outlined">
                                                Cancelar
                                            </Button>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                disabled={mutation.isPending}
                                            >
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
