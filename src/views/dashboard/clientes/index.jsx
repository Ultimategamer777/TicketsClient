import React from 'react'

import { Link } from "react-router-dom"

import { styled } from '@mui/material/styles';
import { Chip, Stack, Button } from '@mui/material';
import Badge, { badgeClasses } from '@mui/material/Badge';

import useClientes from './hooks/useClientes'

import { useQuery } from '@tanstack/react-query';

import AbstractTable from '../../../ui-component/table/AbstractTable';

import { PlusIcon } from '../../../shared/icons';

import RowActions from './components/RowActions';

const PlusBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

const columns = [
    {
        id: "razon_social",
        header: "Nombre",
        title: "Nombre",
        accessorKey: "razon_social",
        width: "25%",
    },
    {
        id: "nombre_comercial",
        header: "Empresa",
        title: "Empresa",
        accessorKey: "nombre_comercial",
        width: "25%",
    },
    {
        id: "email",
        header: "Email",
        title: "Email",
        accessorKey: "email",
        width: "20%",
    },
    // {
    //     id: "contraseña",
    //     header: "Contraseña",
    //     title: "Contraseña",
    //     accessorKey: "contraseña",
    //     width: "20%",
    // },
    {
        id: "roles",
        header: "Rol",
        title: "Rol",
        accessorKey: "roles.name",
        width: "20%",
    },
    {
        id: "telefono",
        header: "Teléfono",
        title: "Telefono",
        accessorKey: "telefono",
        width: "20%",
    },
    // {
    //     id: "direccion",
    //     header: "Dirección",
    //     title: "Direccion",
    //     accessorKey: "direccion",
    //     width: "20%",
    // },
    {
        id: "valor",
        header: "Valor",
        title: "Valor",
        accessorKey: "valor",
        width: "20%",
    },

    {
        id: "isActive",
        header: "Estado",
        title: "State",
        accessorKey: "isActive",
        width: "15%",
        cell: ({ getValue }) => {
            const isActive = getValue();
            return (
                <Chip
                    label={isActive ? "Activo" : "Inactivo"}
                    color={isActive ? "success" : "error"}
                    variant="outlined"
                />
            );
        },
    },
    {
        id: "actions",
        title: "Actions",
        header: "Acciones",
        width: "20%",
        cell: ({ row }) => {
            return (
                <RowActions id={row.original.id} state={row.original.isActive} />
            );
        },
    },
];

export default function ClientesView() {
    const { getClientes } = useClientes();

    const { data: clientes, isLoading } = useQuery({
        queryKey: ['clientes'],
        queryFn: getClientes,
        refetchOnWindowFocus: false,
    });

    return (
        <AbstractTable columns={columns} rows={clientes} inputText="Buscar" tableId="clientes" isLoading={isLoading}>

            <Link to="/home/clientes/add">
                <Button variant="contained" color="secondary" sx={{ width: "max-content" }} startIcon={<PlusIcon />}>
                    Agregar Cliente
                </Button>
            </Link>

        </AbstractTable>
    );
}
