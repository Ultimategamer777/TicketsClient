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
    Stack
} from "@mui/material";

// helpers
import { useHelper } from "../shared/helpers/useHelper";

// assets
import { DotIcon, ActiveIcon, DesactiveIcon } from "../shared/icons";

// types
import PropTypes from "prop-types";

// utils
import { formatTitle } from "../shared/utils/format_modal_titles.util";

import { useQueryClient, useMutation } from "@tanstack/react-query";

import { toast, Toaster } from "sonner";

export function HandleState({ id, state, title, subtitle, showCustomTooltip, api, data }) {
    const { isSmallService, api: consult } = useHelper();

    const queryClient = useQueryClient();

    const query = `${api.url}${id}?cond=${!state}`;

    const query_verb = api.method; 

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const mutate = useMutation({
        mutationKey: ["handleState"],
        mutationFn: async () => {
            const { data: { data } } = await consult[query_verb](query)
            return data;
        },
        onSuccess: () => {
            toast.success("Estado actualizado correctamente");
            handleClose();
            queryClient.invalidateQueries(['roles'])
        },
        onError: (error) => {
            console.log(error);
            toast.error("Error al actualizar el estado");
            handleClose();
        }
    })

    return (
        <>
            <IconButton onClick={handleOpen} >
                {state ? < ActiveIcon stroke_color={"#2e7d32"} /> : < DesactiveIcon fill={"#d32f2f"} />}
            </IconButton>

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

                            <Typography
                                id="transition-modal-title"
                                variant="h3"
                                component="h2"
                                textAlign={"center"}
                            >
                                {formatTitle(title)}
                            </Typography>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                {subtitle}
                            </Typography>

                            {
                                data &&
                                (
                                    <List>
                                        {
                                            data.map((item, index) => (
                                                <ListItem key={index}>
                                                    <ListItemIcon >
                                                        <DotIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={item} />
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                )
                            }

                            <Stack
                                direction={"row"}
                                justifyContent={"end"}
                                sx={{ width: "100%" }}
                                spacing={3}
                            >
                                <Button onClick={handleClose}>
                                    Cancelar
                                </Button>
                                <Button variant="contained" color={state ? "error" : "success"} onClick={() => mutate.mutate()}>
                                    {state ? "Desactivar" : "Activar"}
                                </Button>
                            </Stack>
                        </Stack>
                    </Card>
                </Fade>
            </Modal>
            <Toaster richColors position="top-right" expand={true} />
        </>
    )
}

HandleState.propTypes = {
    id: PropTypes.string.isRequired,
    state: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    api: PropTypes.string.isRequired,
    showCustomTooltip: PropTypes.bool,
    data: PropTypes.array,
}