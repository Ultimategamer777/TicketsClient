//  react
import { useState } from 'react';

// react-router-dom
import { useNavigate } from 'react-router';

// mui
import { Stack, Card, TextField, Button, Typography, IconButton } from '@mui/material';

// icons
import { EmailIcon, PasswordIcon, OpenEyeIcon, CloseEyeIcon } from '../../shared/icons';

// formik
import { Formik, Form, Field } from 'formik';

// helpers
import { useHelper } from '../../shared/helpers/useHelper';

// sonner
import { toast, Toaster } from 'sonner';

// tanstack
import { useMutation } from "@tanstack/react-query"

// validations
import { validationSchemaLogin } from '../../shared/validations/login-validation';

// stpores
import { useAuthStore } from '../../store/auth.store';
import { AxiosError } from 'axios';

export default function LoginPage() {
  const { api } = useHelper();

  const setToken = useAuthStore((state) => state.setToken);
  const setUsers = useAuthStore((state) => state.setUser);
  const setRoles = useAuthStore((state) => state.setRoles);
  const setPermissions = useAuthStore((state) => state.setPermissions);

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { mutate: handleSubmit } = useMutation({
    mutationKey: ['login'],
    mutationFn: async (values) => {
      const response = await api.post('/auth/login', values);
      return response;
    },
    onSuccess: (response) => {
      toast.success("Inicio de sesión exitoso");
      console.log(response)
      setToken(response?.data?.token);
      setUsers(response?.data);
      setRoles(response?.data?.roles?.name); 
      navigate('/home');
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      }
    }
  })

  return (
    <Stack justifyContent={'center'} alignItems={'center'} sx={{ height: '100svh', background: `url(/src/assets/images/auth/login-background.svg)`, backgroundSize: 'cover' }}>
      <Card variant="outlined" sx={{ p: 4, borderRadius: '20px', width: 450, height: "max-content", background: "transparent" }}>
        <Stack gap={4}>
          <Typography variant="h2" textAlign={'center'} color="textSecondary">
            Iniciar Sesión
          </Typography>

          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchemaLogin}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <Stack gap={4}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Correo"
                    placeholder="correo@gmail.com"
                    name="email"
                    InputProps={{
                      startAdornment: <EmailIcon />
                    }}
                    helperText={errors.email && touched.email ? errors.email : ''}
                    error={errors.email && touched.email ? true : false}
                  />

                  <Field
                    as={TextField}
                    fullWidth
                    label="Contraseña"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="correo@gmail.com"
                    name="password"
                    InputProps={{
                      startAdornment: <PasswordIcon />,
                      endAdornment: (
                        <IconButton onClick={handleShowPassword}>
                          {
                            showPassword ? <OpenEyeIcon /> : <CloseEyeIcon />
                          }
                        </IconButton>
                      )
                    }}
                    sx={{
                      '& ::-ms-reveal, & ::-ms-clear': { display: 'none' },
                      '& input::-webkit-credentials-auto-fill-button': { visibility: 'hidden', display: 'none' }
                    }}
                    helperText={errors.password && touched.password ? errors.password : ''}
                    error={errors.password && touched.password ? true : false}
                  />

                  <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    sx={{
                      minWidth: "200px",
                      maxWidth: "max-content",
                      margin: 'auto',
                      borderRadius: "50px",
                      boxShadow: 'none'
                    }}
                  >
                    <Typography variant="button" color='white' disabled={isSubmitting}>
                      Iniciar Sesión
                    </Typography>
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Stack>
      </Card>
      <Toaster richColors position="top-right" expand={true} />
    </Stack>
  );
}
