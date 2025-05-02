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
  Grid
} from "@mui/material";

// formik
import { Formik, Form, Field } from "formik";

// icons
import { PlusIcon, EditIcon } from "../../../../shared/icons";

// sonner
import { Toaster, toast } from "sonner";

// tanstack
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// validations
// import { nodoValidationSchema } from "../../../../shared/validations/nodo.validation"; 

// axios
import { AxiosError } from "axios";

// hooks
import { useNodos } from "../hooks/useNodos";

export default function CreateModalNodos({ id, clienteId }) {
  const queryClient = useQueryClient();
  const { onSubmit, getNodo } = useNodos();

  const [open, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    console.log("Abrir modal"); // Depuración
    setOpenModal(true);
  };
  const handleClose = () => setOpenModal(false);

  const { data, isLoading } = useQuery({
    queryKey: ["get_nodo_by_id", id],
    queryFn: async () => await getNodo(id),
    enabled: open && !!id,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: (values) => {
      console.log("Valores enviados a onSubmit desde mutationFn:", values); // Depuración
      return onSubmit(values, clienteId, !!id, id);
    },
    onSuccess: () => {
      console.log("Mutación exitosa"); // Depuración
      toast.success(id ? "Nodo editado correctamente" : "Nodo guardado correctamente");
      handleClose();
      queryClient.invalidateQueries(["nodos"]);
    },
    onError: (error) => {
      console.error("Error en la mutación:", error); // Depuración
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
          Agregar Nodo
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
              width: 600,
              maxHeight: "90vh",
              overflowY: "auto",
              p: 4,
            }}
          >
            <Formik
              enableReinitialize
              initialValues={
                id
                  ? {
                    nodos: data?.nodos || "",
                    proveedores: data?.proveedores || "",
                    ip_publicas: data?.ip_publicas || "",
                    ip_privadas: data?.ip_privadas || "",
                    ip_enganches: data?.ip_enganches || "",
                    modelo_router: data?.modelo_router || "",
                    // enganches: data?.enganches || false,
                    velocidades: data?.velocidades || "",
                    id_proveedores: data?.id_proveedores || "",
                    respaldo: data?.respaldo || false,
                    intervalo_respaldo: data?.intervalo_respaldo || "",
                    version_mikrotik: data?.version_mikrotik || "",
                    firewall: data?.firewall || false,
                  }
                  : {
                    nodos: "",
                    proveedores: "",
                    ip_publicas: "",
                    ip_privadas: "",
                    ip_enganches: "",
                    modelo_router: "",
                    // enganches: false,
                    velocidades: "",
                    id_proveedores: "",
                    respaldo: false,
                    intervalo_respaldo: "",
                    version_mikrotik: "",
                    firewall: false,
                  }
              }
              // validationSchema={nodoValidationSchema}
              onSubmit={(values) => {
                console.log("Valores enviados al submit del formulario:", values); // Depuración
                mutation.mutate(values);
              }}
            >
              {({ errors, touched, values, setFieldValue }) => (
                <Form>
                  <Stack spacing={2}>

                    <Grid container spacing={2}>
                      {/* Primera fila */}
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          name="nodos"
                          label="Nodo"
                          fullWidth
                          placeholder="Ej. Nodo 1"
                          error={touched.nodos && Boolean(errors.nodos)}
                          helperText={touched.nodos && errors.nodos}
                          disabled={isLoading}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          name="proveedores"
                          label="Proveedor"
                          fullWidth
                          placeholder="Proveedor de internet"
                          error={touched.proveedores && Boolean(errors.proveedores)}
                          helperText={touched.proveedores && errors.proveedores}
                          disabled={isLoading}
                        />
                      </Grid>

                      {/* Segunda fila */}
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          name="ip_publicas"
                          label="IP Públicas"
                          fullWidth
                          placeholder="Ej. 192.168.1.1"
                          error={touched.ip_publicas && Boolean(errors.ip_publicas)}
                          helperText={touched.ip_publicas && errors.ip_publicas}
                          disabled={isLoading}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          name="ip_privadas"
                          label="IP Privadas"
                          fullWidth
                          placeholder="Ej. 10.0.0.1"
                          error={touched.ip_privadas && Boolean(errors.ip_privadas)}
                          helperText={touched.ip_privadas && errors.ip_privadas}
                          disabled={isLoading}
                        />
                      </Grid>

                      {/* Tercera fila */}
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          name="ip_enganches"
                          label="IP Enganches"
                          fullWidth
                          placeholder="IPs de Enganches"
                          error={touched.ip_enganches && Boolean(errors.ip_enganches)}
                          helperText={touched.ip_enganches && errors.ip_enganches}
                          disabled={isLoading}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          name="modelo_router"
                          label="Modelo Router"
                          fullWidth
                          placeholder="Ej. Mikrotik RB3011"
                          error={touched.modelo_router && Boolean(errors.modelo_router)}
                          helperText={touched.modelo_router && errors.modelo_router}
                          disabled={isLoading}
                        />
                      </Grid>

                      {/* Cuarta fila */}
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          name="velocidades"
                          label="Velocidades"
                          fullWidth
                          placeholder="Ej. 500Mbps / 50Mbps"
                          error={touched.velocidades && Boolean(errors.velocidades)}
                          helperText={touched.velocidades && errors.velocidades}
                          disabled={isLoading}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          name="id_proveedores"
                          label="ID Proveedor"
                          fullWidth
                          placeholder="ID del proveedor"
                          error={touched.id_proveedores && Boolean(errors.id_proveedores)}
                          helperText={touched.id_proveedores && errors.id_proveedores}
                          disabled={isLoading}
                        />
                      </Grid>

                      {/* Quinta fila */}
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          name="intervalo_respaldo"
                          label="Intervalo Respaldo"
                          fullWidth
                          placeholder="Ej. Cada 6 horas"
                          error={touched.intervalo_respaldo && Boolean(errors.intervalo_respaldo)}
                          helperText={touched.intervalo_respaldo && errors.intervalo_respaldo}
                          disabled={isLoading}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          name="version_mikrotik"
                          label="Versión Mikrotik"
                          fullWidth
                          placeholder="Ej. v7.10"
                          error={touched.version_mikrotik && Boolean(errors.version_mikrotik)}
                          helperText={touched.version_mikrotik && errors.version_mikrotik}
                          disabled={isLoading}
                        />
                      </Grid>

                      {/* Botones */}
                      <Grid item xs={12}>
                        <Grid container spacing={2} justifyContent="center">
                          <Grid item xs={6} md={4}>
                            <Button
                              fullWidth
                              variant={values.respaldo ? "contained" : "outlined"}
                              color="secondary"
                              onClick={() => setFieldValue("respaldo", !values.respaldo)}
                              sx={{
                                whiteSpace: 'nowrap',
                                fontWeight: 'bold'
                              }}
                            >
                              {values.respaldo ? "Respaldo: Sí" : "Respaldo: No"}
                            </Button>
                          </Grid>

                          <Grid item xs={6} md={4}>
                            <Button
                              fullWidth
                              variant={values.firewall ? "contained" : "outlined"}
                              color="secondary"
                              onClick={() => setFieldValue("firewall", !values.firewall)}
                              sx={{
                                whiteSpace: 'nowrap',
                                fontWeight: 'bold'
                              }}
                            >
                              {values.firewall ? "Firewall: Sí" : "Firewall: No"}
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>

                    </Grid>


                    {/* Botones */}
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
