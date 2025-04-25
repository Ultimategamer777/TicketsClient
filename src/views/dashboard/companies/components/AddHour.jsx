// react
import { useState } from "react";

// mui
import {
    Modal,
    Button,
    Fade,
    Backdrop,
    Typography,
    IconButton,
    Card,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Stack,
    TextField
} from "@mui/material";

// helpers
import { useHelper } from "../../../../shared/helpers/useHelper";

// assetss
import { PlusIcon } from "../../../../shared/icons";

import { toast, Toaster } from "sonner";

import { Formik, Form, Field } from "formik";

import dayjs from "dayjs";

import { validateHours } from "../../../../shared/validations/companies.validation";

import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function AddHour({ onAdd }) {
    const { isSmallService } = useHelper();


    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // const handleSubmit = async (values)=> {
    //     const i = `${values.initial_date.$H}:${values.initial_date.$m}:${values.initial_date.$s}`
    //     const e = `${values.final_date.$H}:${values.final_date.$m}:${values.final_date.$s}`
    //     console.log(i)
    //     console.log(e)
    // }

    const handleSubmit = async (values) => {
        const initial = values.initial_date.format("HH:mm:ss");
        const final = values.final_date.format("HH:mm:ss");
        
        onAdd({ initial, final }); // Pasar los valores al componente padre
        handleClose();
    };

    return (
        <>
            <Button onClick={handleOpen} variant="outlined" sx={{ width: "50px", height: "50px", border: "dashed 2px", borderSpacing: "10px" }}>
                < PlusIcon />
            </Button>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={() => setOpen(false)}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Card sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: isSmallService ? "90%" : "600px",
                        transition: (theme) => theme.transitions.create(['width'], {
                            easing: theme.transitions.easing.easeOut,
                            duration: theme.transitions.duration.shorter + 200
                        }),
                    }}
                    >
                        <Stack
                            sx={{
                                backgroundColor: 'background.paper',
                                borderRadius: 2,
                                p: 4
                            }}>
                            {isSmallService ? true : false}

                            <Formik
                                initialValues={{
                                    initial_date: dayjs().format("HH:mm:ss"),
                                    final_date: dayjs().format("HH:mm:ss")
                                }}
                                onSubmit={handleSubmit}
                                validationSchema={validateHours}
                            >
                                {
                                    () => (
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                      <Formik
                                                        initialValues={{
                                                            initial_date: dayjs(), // Usa el objeto dayjs directamente
                                                            final_date: dayjs()
                                                        }}
                                                        onSubmit={handleSubmit}
                                                        // validationSchema={validateHours}
                                                    >
                                                        {({ setFieldValue, values }) => (
                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                <Form>
                                                                    <Stack direction={"column"} spacing={3}>
                                                                        <DemoItem>
                                                                            <TimePicker
                                                                                label="Hora inicial"
                                                                                value={values.initial_date}
                                                                                onChange={(newValue) => setFieldValue('initial_date', newValue)}
                                                                                format="HH:mm:ss"
                                                                            />
                                                                        </DemoItem>

                                                                        <DemoItem>
                                                                            <TimePicker
                                                                                label="Hora final"
                                                                                value={values.final_date}
                                                                                onChange={(newValue) => setFieldValue('final_date', newValue)}
                                                                                format="HH:mm:ss"
                                                                            />
                                                                        </DemoItem>

                                                                        {/* ... Botones de acción */}
                                                                        <Stack
                                                                        direction={"row"}
                                                                        justifyContent={"end"}
                                                                        sx={{ width: "100%" }}
                                                                        spacing={3}
                                                                    >
                                                                        <Button onClick={handleClose}>
                                                                            Cancelar
                                                                        </Button>

                                                                        <Button type="submit" variant="contained" color={"success"} >
                                                                            Añadir
                                                                        </Button>
                                                                    </Stack>
                                                                    </Stack>
                                                                </Form>
                                                            </LocalizationProvider>
                                                        )}
                                                    </Formik>
                                        </LocalizationProvider>
                                    )
                                }
                            </Formik>

                    
                        </Stack>
                    </Card>
                </Fade>
            </Modal>
            <Toaster richColors position="top-right" expand={true} />
        </>
    )
}
