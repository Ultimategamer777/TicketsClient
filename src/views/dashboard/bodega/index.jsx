// react
import React from 'react';

// mui 
import { Button, Chip } from '@mui/material';

// tanstack 
import { useQuery } from "@tanstack/react-query";

// components
import RowAction from './components/RowAction';
import AbstractTable from '../../../ui-component/table/AbstractTable';
import CreateModalBodega from './components/CreateModalBodega';

// hooks
import { useBodega } from "./hooks/useBodega";

const columns = [
  {
    id: "name",
    header: "Nombre",
    title: "Nombre",
    accessorKey: "name",
  },
  {
    id: "ubicacion",
    header: "Ubicación",
    title: "Ubicación",
    accessorKey: "ubicacion",
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

export default function BodegasView() {
  const { getBodegas } = useBodega();

  const { data: bodegas, isLoading } = useQuery({
    queryKey: ["bodega"],
    queryFn: getBodegas,
    refetchOnWindowFocus: false,
  });

  return (
    <>

      <AbstractTable
        columns={columns}
        rows={bodegas}
        inputText="Buscar"
        tableId="bodega"
        isLoading={isLoading}
      >
        <CreateModalBodega />
      </AbstractTable>
    </>
  );
}
