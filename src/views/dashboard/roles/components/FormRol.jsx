// react
import { useState, useEffect } from "react"

// routing
import { useParams } from "react-router-dom"

// tanstack
import { useMutation, useQuery } from "@tanstack/react-query"

// mui
import { TextField, Button, Checkbox, Stack, Grid2 } from "@mui/material"
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

// formik
import { Formik, Form, Field } from "formik"

// helpers
import { useHelper } from "../../../../shared/helpers/useHelper"

// components
import MainCard from "../../../../ui-component/cards/MainCard"
// import DebouncedInput from "../../../../components/DebouncedInput"}

// sonner
import { Toaster, toast } from 'sonner'

// assets
import permissionsRolesLeft from "../permissions-roles-left.json"
import permissionsRolesRight from "../permissions-roles-right.json"
// import { ChevronDownIcon, ChevronUpIcon } from "../../../../shared/icons"

// validations
import { roleSchema } from "../../../../shared/validations/role.validation"

// hooks
import useRoles from "../hooks/useRol"

// axios
import { AxiosError } from "axios"

export default function FormRol() {
    const { id } = useParams();

    // const [openSections, setOpenSections] = useState({});

    const { navigation } = useHelper();

    const { onSubmit, getRolesById } = useRoles();

    // const toggleSection = (sectionValue) => {
    //     setOpenSections(prev => ({
    //         ...prev,
    //         [sectionValue]: !prev[sectionValue]
    //     }));
    // };

    const { data, isLoading } = useQuery(
        {
            queryKey: ["get_roles_by_id", id],
            queryFn: () => getRolesById(id),
            enabled: !!id,
            refetchOnWindowFocus: false,
        }
    )

    const mutation = useMutation({
        mutationFn: (values) => onSubmit(values, !!id, id),
        onSuccess: () => {
            toast.success("Rol guardado correctamente");
            navigation(-1);
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Ocurrió un error inesperado");
            }
        }
    });

    const handleGroupSelect = (value, currentValues, setFieldValue) => {
        const permissions = currentValues || []; // Ensure we have an array even if currentValues is undefined
        const isSelected = permissions.includes(value);
        const newPermissions = isSelected
            ? permissions.filter((item) => item !== value)
            : [...permissions, value];

        setFieldValue("permissions", newPermissions);
    };

    return (
        <>
            <MainCard>
                <Formik
                    enableReinitialize
                    initialValues={
                        id ? {
                            name: data?.data?.name || "Ken",
                            permissions: data?.data?.permissions
                        } :
                            {
                                name: "",
                                permissions: []
                            }
                    }
                    validationSchema={roleSchema}
                    onSubmit={(values) => {
                        mutation.mutate(values)
                    }}
                >
                    {
                        ({ isSubmitting, errors, touched, getFieldProps, values, props, setFieldValue }) => (
                            <Form>
                                <Stack direction={"column"} gap={2}>
                                    <Field
                                        as={TextField}
                                        name="name"
                                        label="Nombre"
                                        fullWidth
                                        error={touched.name && Boolean(errors.name)}
                                        helperText={touched.name && errors.name}
                                    />

                                    {/* <DebouncedInput label="Buscar rol" placeholder="Editar usuario"  sx={{ width: 400, margin: "auto" }}/> */}

                                    <Grid2 container justifyContent={"center"} spacing={3}>
                                        {/* LEFT SIDE */}
                                        <Grid2 size={{ xs: 12, md: 5 }} >
                                            <SimpleTreeView>
                                                {permissionsRolesLeft.map((permission) => (
                                                    <TreeItem
                                                        key={permission.value}
                                                        itemId={permission.value}
                                                        label={
                                                            <Stack direction="row" alignItems="center" gap={1}>
                                                                <Field
                                                                    as={Checkbox}
                                                                    value={permission.value}
                                                                    onChange={(e) => handleGroupSelect(permission.value, values.permissions, setFieldValue)}
                                                                    {...getFieldProps("permissions")}
                                                                />
                                                                <span>{permission.label}</span>
                                                            </Stack>
                                                        }
                                                        defaultExpanded={false}
                                                    >
                                                        {permission.children?.map((childPermission) => (
                                                            <TreeItem
                                                                key={childPermission.value}
                                                                itemId={childPermission.value}
                                                                label={
                                                                    <Stack direction="row" alignItems="center" gap={1}>
                                                                        <span>{childPermission.label}</span>
                                                                    </Stack>
                                                                }
                                                            >
                                                                {childPermission.children?.map((subChild) => (
                                                                    <TreeItem
                                                                        key={subChild.value}
                                                                        itemId={subChild.value}
                                                                        label={
                                                                            <Stack direction="row" alignItems="center" gap={1}>
                                                                                <Field
                                                                                    as={Checkbox}
                                                                                    value={subChild.value}
                                                                                    onChange={() =>
                                                                                        handleGroupSelect(
                                                                                            subChild.value,
                                                                                            values.permissions,
                                                                                            setFieldValue
                                                                                        )
                                                                                    }
                                                                                    checked={values.permissions?.includes(subChild.value) || false}
                                                                                />
                                                                                <span>{subChild.label}</span>
                                                                            </Stack>
                                                                        }
                                                                    />
                                                                ))}
                                                            </TreeItem>
                                                        ))}
                                                    </TreeItem>
                                                ))}
                                            </SimpleTreeView>
                                        </Grid2>

                                        {/* RIGHT SIDE */}
                                        <Grid2 size={{ xs: 12, md: 5 }} >
                                            <SimpleTreeView >
                                                {permissionsRolesRight.map((permission) => (
                                                    <TreeItem
                                                        key={permission.value}
                                                        itemId={permission.value}
                                                        label={
                                                            <Stack direction="row" alignItems="center" gap={1}>
                                                                <Field
                                                                    as={Checkbox}
                                                                    value={permission.value}
                                                                    onChange={(e) => handleGroupSelect(permission.value, values.permissions, setFieldValue)}
                                                                    {...getFieldProps("permissions")}
                                                                />
                                                                <span>{permission.label}</span>
                                                            </Stack>
                                                        }
                                                        defaultExpanded={false}
                                                    >
                                                        {permission.children?.map((childPermission) => (
                                                            <TreeItem
                                                                key={childPermission.value}
                                                                itemId={childPermission.value}
                                                                label={
                                                                    <Stack direction="row" alignItems="center" gap={1}>
                                                                        <span>{childPermission.label}</span>
                                                                    </Stack>
                                                                }
                                                            >
                                                                {childPermission.children?.map((subChild) => (
                                                                    <TreeItem
                                                                        key={subChild.value}
                                                                        itemId={subChild.value}
                                                                        label={
                                                                            <Stack direction="row" alignItems="center" gap={1}>
                                                                                <Field
                                                                                    as={Checkbox}
                                                                                    value={subChild.value}
                                                                                    onChange={() =>
                                                                                        handleGroupSelect(
                                                                                            subChild.value,
                                                                                            values.permissions || [],
                                                                                            setFieldValue
                                                                                        )
                                                                                    }
                                                                                    checked={values.permissions?.includes(subChild.value) || false}
                                                                                />
                                                                                <span>{subChild.label}</span>
                                                                            </Stack>
                                                                        }
                                                                    />
                                                                ))}
                                                            </TreeItem>
                                                        ))}
                                                    </TreeItem>
                                                ))}
                                            </SimpleTreeView>
                                        </Grid2>
                                    </Grid2>

                                    <Stack direction={"row"} justifyContent={"flex-end"} gap={4}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            disabled={mutation.isPending}
                                        >
                                            Guardar
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Form>
                        )
                    }
                </Formik>
            </MainCard>
            <Toaster richColors position="top-right" expand={true} />
        </>
    )
}
