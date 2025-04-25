// react
import React, { useState, useRef, lazy, Suspense } from "react";

// mui
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  Container,
  Stack,
} from "@mui/material";

// formik
import { Formik, Form } from "formik";

// helpers
import { useHelper } from "../../../../shared/helpers/useHelper";

// hooks
import useCompanies from "../hooks/useCompanies";

// tanstack
import { useMutation, useQueryClient } from "@tanstack/react-query";

// sonner
import { toast, Toaster } from "sonner";

// components
const FormGeneral = lazy(() => import("./FormGeneral"));
const FormAttentionDays = lazy(() => import("./FormAttentionDays"));

const steps = ["Información General", "Horarios de Atención"];

function _renderStepContent(step) {
  switch (step) {
    case 0:
      return <FormGeneral />;
    case 1:
      return <FormAttentionDays />;
    default:
      throw new Error("Unknown step");
  }
}

export default function FormCompany() {
  const { objPayload, onSubmit } = useCompanies();

  const [activeStep, setActiveStep] = useState(0);

  const isLastStep = activeStep === steps.length - 1;

  const formRef = useRef(); // Ref to access the formik instance

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  const mutation = useMutation({
    mutationKey: ["submit_companies"],
    mutationFn: async (values) => onSubmit(values),
    onSuccess: () => {
      toast.success("Empresa creada correctamente");
    },
    onError: () => {
      toast.error("Error al crear la empresa");
    },
  });

  // async function _submitForm(values, actions) {
  //     console.log("Hola mundo")
  //     console.log(values);
  //     // await _sleep(1000);
  //     // alert(JSON.stringify(values, null, 2));
  //     actions.setSubmitting(false);
  //     // setActiveStep(activeStep + 1);
  // }

  function _handleSubmit(values, actions) {
    if (formRef.current) {
      formRef.current.validateForm().then((errors) => {
        if (Object.keys(errors).length === 0) {
          if (isLastStep) {
            mutation.mutate(values);
          } else {
            setActiveStep(activeStep + 1);
            actions.setTouched({});
            actions.setSubmitting(false);
          }
        } else {
          // Mark all fields as touched to trigger error display
          formRef.current.setTouched(
            Object.keys(errors).reduce(
              (acc, key) => ({ ...acc, [key]: true }),
              {}
            )
          );
          actions.setSubmitting(false);
        }
      });
    }
  }

  return (
    <>
      <Paper
        sx={{ p: 4, overflow: "auto", minWidth: "60%", height: "max-content" }}
        elevation={0}
      >
        <Stack direction={"column"} gap={3}>
          {/* HEADER */}
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* CONTENT */}
          <Formik
            initialValues={
              objPayload[Object.keys(objPayload)[activeStep]].content
            }
            validationSchema={
              objPayload[Object.keys(objPayload)[activeStep]].validations
            }
            onSubmit={_handleSubmit}
            innerRef={formRef}
          >
            {({}) => (
              <Form
                id={`form-step-${objPayload[Object.keys(objPayload)[activeStep]].id}`}
              >
                {_renderStepContent(activeStep, formRef)}

                {/* FOOTER */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 20,
                  }}
                >
                  {activeStep !== 0 && (
                    <Button onClick={_handleBack}>Volver</Button>
                  )}
                  <div>
                    <Button type="submit" variant="contained" color="primary">
                      {isLastStep ? "Guardar y crear contrato" : "Siguiente"}
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Stack>
      </Paper>
    </>
  );
}
