import React, { useEffect } from 'react'

import { Link } from "react-router-dom"

import { styled } from '@mui/material/styles';
import { Chip, Stack, IconButton, Button } from '@mui/material';
import Badge, { badgeClasses } from '@mui/material/Badge';

import useRoles from './hooks/useRol'

import { useQuery } from '@tanstack/react-query';

import AbstractTable from '../../../ui-component/table/AbstractTable';

import { useHelper } from '../../../shared/helpers/useHelper';

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
    id: "name",
    header: "Nombre",
    title: "Nombre",
    accessorKey: "name",
    width: "25%"
  },
  {
    id: "permissions",
    header: "Permisos",
    title: "Permissions",
    accessorKey: "permissions",
    width: "45%",
    cell: ({ getValue }) => {
      const permissions = getValue();

      return loadPermissions(permissions);
    },
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
    width: "25%",
    cell: ({ row }) => {
      return (
        <RowActions id={row.original.id} state={row.original.isActive} />
      );
    },
  },
];

export default function RolesView() {
  const { getRoles } = useRoles();

  const { data: roles, isLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: getRoles,
    refetchOnWindowFocus: false,
  });

  return (
    <AbstractTable columns={columns} rows={roles} inputText="Buscar" tableId="roles" isLoading={isLoading}>

      <Link to="/home/roles/add">
        <Button variant="contained" color="secondary" sx={{ width: "max-content" }} startIcon={<PlusIcon />}>
          Agregar Rol
        </Button>
      </Link>

    </AbstractTable>
  )
}

function loadPermissions(row) {
  return (
    <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} gap={1}>
      {row[0].name || row[0]} <span>...</span>
      <Button
        variant="outlined"
        sx={{
          width: "max-content",
          padding: "0 4px",
          minWidth: "25px"
        }}>
        {`+ ${row.length - 1}`}
      </Button>
    </Stack>
  )
}