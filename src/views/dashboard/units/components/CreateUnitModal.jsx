// @Column({ unique: true })
// name: string;

// @Column({ nullable: true })
// description: string;

// @Column()
// abrevation: string;

// react
import { useState } from "react";

//  mui
import {
    Modal,
    Fade,
    Backdrop,
    Typography,
    TextField,
    Button,
    Stack,
    Card,
    IconButton
} from "@mui/material";

// formik
import { Formik, Form, Field } from "formik"

// icons
import { PlusIcon, SpecialtyIcon, EditIcon, UnitIcon, AbrevationIcon, ParagraphIcon } from "../../../../shared/icons";

// TODO Hacer un provider global de sonner
// sonner
import { Toaster, toast } from 'sonner'

// tanstack
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { unitValidationSchema } from "../../../../shared/validations/unit.validation";

// axios
import { AxiosError } from "axios"

// hooks
import { useUnits } from "../hooks/useUnits";

export default function CreateUnitModal({ id }) {
    const queryClient = useQueryClient();

    const { getUnit, onSubmit } = useUnits();

    const [open, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const { data, isLoading } = useQuery(
        {
            queryKey: ["get_unit_by_id", id],
            queryFn: () => getUnit(id),
            enabled: !!id,
            refetchOnWindowFocus: false,
        }
    )

    const mutation = useMutation({
        mutationFn: (values) => onSubmit(values, !!id, id),
        onSuccess: () => {
            toast.success(id ? "Unidad editada correctamente" : "Unidad guardada correctamente");
            handleClose()
            queryClient.invalidateQueries(["units"])
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Ocurrió un error inesperado");
            }
        }
    });

    return (
        <>

            {
                id
                    ? (
                        <IconButton onClick={handleOpenModal}>
                            <EditIcon />
                        </IconButton>
                    )
                    : (
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{ width: "max-content" }}
                            onClick={handleOpenModal}
                            startIcon={<PlusIcon />}
                        >
                            Agregar Especialidad
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
                            initialValues={
                                id ? {
                                    name: data?.name,
                                    description: data?.description,
                                    abrevation: data?.abrevation
                                } : {
                                    name: "",
                                    description: "",
                                    abrevation: ""
                                }
                            }
                            validationSchema={unitValidationSchema}
                            onSubmit={(values) => {
                                mutation.mutate(values);
                            }}
                        >
                            {
                                ({ errors, touched }) => (
                                    <Form>
                                        <Stack spacing={2}>
                                            <Field
                                                as={TextField}
                                                name="name"
                                                label="Nombre"
                                                fullWidth
                                                placeholder="Optometría"
                                                error={touched.name && Boolean(errors.name)}
                                                helperText={touched.name && errors.name}
                                                disabled={isLoading}
                                                slotProps={{
                                                    input: {
                                                        startAdornment: (
                                                            <UnitIcon />
                                                        ),
                                                    }
                                                }
                                                }
                                            />

                                            <Field
                                                as={TextField}
                                                name="abrevation"
                                                label="Abreviatura"
                                                fullWidth
                                                placeholder="ml"
                                                error={touched.abrevation && Boolean(errors.abrevation)}
                                                helperText={touched.abrevation && errors.abrevation}
                                                disabled={isLoading}
                                                slotProps={{
                                                    input: {
                                                        startAdornment: (
                                                            <AbrevationIcon />
                                                        ),
                                                    }
                                                }
                                                }
                                            />

                                            <Field
                                                as={TextField}
                                                name="description"
                                                label="Descripción"
                                                fullWidth
                                                placeholder="Escriba aquí..."
                                                multiline
                                                minRows={1}
                                                maxRows={4}
                                                disabled={isLoading}
                                            />

                                            {/* ACTIONS BUTTONS */}
                                            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>

                                                <Button
                                                    onClick={handleClose}
                                                    variant="outlined"
                                                >
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
                                )
                            }
                        </Formik>
                    </Card>
                </Fade>
            </Modal>
            <Toaster richColors position="top-right" expand={true} />
        </>
    )
}