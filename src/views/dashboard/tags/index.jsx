// react
import React from 'react';

// mui 
import { Button, Chip } from '@mui/material';

// tanstack 
import { useQuery } from "@tanstack/react-query";

// components
import RowActions from './components/RowActions';
import AbstractTable from '../../../ui-component/table/AbstractTable';
import CreateTagsModal from './components/CreateTags';

// hooks
import { useTags } from "./hooks/useTags";

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
        <RowActions id={row.original.id} state={row.original.isActive} />
      );
    },
    enablePinning: true,
    pin: "right"
  },

];

export default function TagsView() {
  const { getTag } = useTags();

  const { data: tags, isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: getTag,
    refetchOnWindowFocus: false
  });

  return (
    <>
      <AbstractTable
        columns={columns}
        rows={tags}
        inputText="Buscar"
        tableId="tags"
        isLoading={isLoading}
      >
        <CreateTagsModal />
      </AbstractTable>
    </>
  );
}
