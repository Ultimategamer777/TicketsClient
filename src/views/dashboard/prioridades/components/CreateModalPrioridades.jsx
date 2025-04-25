
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
} from "@mui/material";

// formik
import { Formik, Form, Field } from "formik";

// icons
import { PlusIcon, PrioridadIcon, EditIcon } from "../../../../shared/icons";

// sonner
import { Toaster, toast } from "sonner";

// tanstack
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// validations
import { prioridadValidationSchema } from "../../../../shared/validations/prioridad.validation";

// axios
import { AxiosError } from "axios";

// hooks
import { usePrioridades } from "../hooks/usePrioridades";

export default function CreateModalPrioridades({ id }) {
  const queryClient = useQueryClient();
  const { onSubmit, getPrioridades } = usePrioridades();

  const [open, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const { data, isLoading } = useQuery({
    queryKey: ["get_prioridad_by_id", id],
    queryFn: async () => await getPrioridades(id),
    enabled: open && !!id,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: (values) => onSubmit(values, !!id, id),
    onSuccess: () => {
      toast.success(id ? "Prioridad editada correctamente" : "Prioridad guardada correctamente");
      handleClose();
      queryClient.invalidateQueries(["prioridades"]);
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
          Agregar Prioridad
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
                    }
                  : {
                      name: "",
                    }
              }
              validationSchema={prioridadValidationSchema}
              onSubmit={(values) => {
                mutation.mutate(values);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <Stack spacing={2}>
                    <Field
                      as={TextField}
                      name="name"
                      label="Nombre"
                      fullWidth
                      placeholder="Ej. Alta"
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                      disabled={isLoading}
                      slotProps={{
                        input: {
                          startAdornment: <PrioridadIcon />,
                        },
                      }}
                    />

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
