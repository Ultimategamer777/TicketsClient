// react
import React from 'react';

// mui 
import { Button, Chip } from '@mui/material';

// tanstack 
import { useQuery } from "@tanstack/react-query";

// components
import RowAction from './components/RowAction';
import AbstractTable from '../../../ui-component/table/AbstractTable';
import CreateModalPrioridades from './components/CreateModalPrioridades';

// hooks
import { usePrioridades } from "./hooks/usePrioridades";

const columns = [
  {
    id: "name",
    header: "Nombre",
    title: "Nombre",
    accessorKey: "name",
  },
  {
    id: "estado",
    header: "Estado",
    title: "Estado",
    accessorKey: "isActive",
    cell: ({ row }) => {
      const isActive = row.original.isActive;
      return (
        <Chip
          label={isActive ? "Activo" : "Inactivo"}
          color={isActive ? "info" : "error"}
          variant="outlined"
          size="small"
        />
      );
    },
  },
  {
    id: "actions",
    title: "Acciones",
    header: "Acciones",
    width: "25%",
    cell: ({ row }) => {
      return (
        <RowAction id={row.original.id} state={row.original.isActive} />
      );
    },
    enablePinning: true,
    pin: "right"
  },
];

export default function PrioridadesView() {
  const { getPrioridad } = usePrioridades();

  const { data: prioridades, isLoading } = useQuery({
    queryKey: ["prioridades"],
    queryFn: getPrioridad,
    refetchOnWindowFocus: false
  });

  return (
    <>
      <AbstractTable
        columns={columns}
        rows={prioridades}
        inputText="Buscar"
        tableId="prioridades"
        isLoading={isLoading}
      >
        <CreateModalPrioridades />
      </AbstractTable>
    </>
  );
}
