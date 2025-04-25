// reacrt
import React, { useState } from 'react';

// mui 
import { Button } from '@mui/material';

// tanstack 
import { useQuery } from "@tanstack/react-query";

// hooks
import { useUser } from './hooks/useUser';

// components
import RowActions from './components/RowActions';
import AbstractTable from '../../../ui-component/table/AbstractTable';

const columns = [
  {
    id: "name",
    header: "Nombre",
    title: "Nombre",
    align: "left",
    accessorKey: "name",
  },
  {
    id: "abrevation",
    header: "Abrevación",
    title: "Abrevación",
    accessorKey: "abrevation",
  },
  {
    id: "description",
    header: "Descripción",
    title: "Descripción",
    accessorKey: "description",
    cell: ({ row }) => row.original.description ? row.original.description : "-  -  -  -  -",
  },
  {
    id: "actions",
    header: "Acciones",
    title: "Acciones",
    align: "left",
    cell: ({ row }) => {
      return (
        <RowActions id={row.original.id} state={row.original.isActive} />
      );
    },
  }
]

export default function UserView() {
  return 'Hola user';
}
