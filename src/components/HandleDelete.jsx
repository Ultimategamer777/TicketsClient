// react
import { useState } from "react";

// muui
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
import { DeleteIcon, DotIcon } from "../shared/icons";

// types
import PropTypes from "prop-types";

// utils
import { formatTitle } from "../shared/utils/format_modal_titles.util";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast, Toaster } from "sonner";

export function HandleDelete({ id, title, subtitle, showCustomTooltip, api, data, query_client }) {
    const { isSmallService, api: consult } = useHelper();

    const queryClient = useQueryClient();

    const query = `${api.url}/${id}`;

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const mutate = useMutation({
        mutationKey: ["delete_", id],
        mutationFn: async () => {
            const { data: { data } } = await consult.delete(query);
            return data;
        },
        onSuccess: () => {
            toast.success("Registro eliminado correctamente");
            handleClose();
            queryClient.invalidateQueries([query_client]);
        },
        onError: () => {
            toast.error("Error al eliminar el registro")
            handleClose();
        }
    })

    return (
        <>
            <IconButton onClick={handleOpen} >
                < DeleteIcon />
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
                                <Button variant="contained" color="error" onClick={() => mutate.mutate()}>
                                    Eliminar
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

// HandleDelete.propTypes = {
//     id: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     subtitle: PropTypes.string.isRequired,
//     api: PropTypes.string.isRequired,
//     showCustomTooltip: PropTypes.bool,
//     data: PropTypes.array,
// }