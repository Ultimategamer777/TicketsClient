// reacrt
import React, { useState } from 'react';

// mui 
import { Button } from '@mui/material';

// tanstack 
import { useQuery } from "@tanstack/react-query";

// components
import RowActions from './components/RowActions';
import AbstractTable from '../../../ui-component/table/AbstractTable';
import CreateSpecialtyModal from './components/CreateSpecialty';

// hooks
import { useSpecialty } from "./hooks/useSpecialty";

const columns = [
  {
    id: "name",
    header: "Nombre",
    title: "Nombre",
    accessorKey: "name",
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
    enablePinning: true,
    pin: "right"
  },
];

export default function SpecialtyView() {
  const { getSpecialties } = useSpecialty();

  const { data: specialties, isLoading } = useQuery({
    queryKey: ["specialties"],
    queryFn: getSpecialties,
    refetchOnWindowFocus: false
  });

  return (
    <>
      <AbstractTable
        columns={columns}
        rows={specialties}
        inputText="Buscar"
        tableId="specialties"
        isLoading={isLoading}
      >
        <CreateSpecialtyModal />
      </AbstractTable>

    </>
  );
}
