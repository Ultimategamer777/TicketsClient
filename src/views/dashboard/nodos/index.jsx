// react
import React from 'react';

// mui 
import { Button, Chip } from '@mui/material';

// tanstack 
import { useQuery } from "@tanstack/react-query";

// components
import RowAction from './components/RowAction';
import AbstractTable from '../../../ui-component/table/AbstractTable';
import CreateModalNodos from './components/CreateModalNodos';

// hooks
import { useNodos } from "./hooks/useNodos";

const columns = [
  {
    id: "nodos",
    header: "Nodo",
    title: "Nodo",
    accessorKey: "nodos",
  },
  {
    id: "proveedores",
    header: "Proveedor",
    title: "Proveedor",
    accessorKey: "proveedores",
  },
  {
    id: "ip_publicas",
    header: "IP Públicas",
    title: "IP Públicas",
    accessorKey: "ip_publicas",
  },
  {
    id: "ip_privadas",
    header: "IP Privadas",
    title: "IP Privadas",
    accessorKey: "ip_privadas",
  },
  {
    id: "ip_enganches",
    header: "IP Enganches",
    title: "IP Enganches",
    accessorKey: "ip_enganches",
  },
  {
    id: "modelo_router",
    header: "Modelo Router",
    title: "Modelo Router",
    accessorKey: "modelo_router",
  },
  {
    id: "version_mikrotik",
    header: "Version Mikrotik",
    title: "Version Mikrotik",
    accessorKey: "version_mikrotik",
  },
  {
    id: "velocidades",
    header: "Velocidades",
    title: "Velocidades",
    accessorKey: "velocidades",
  },
  {
    id: "respaldo",
    header: "¿Tiene Respaldo?",
    title: "¿Tiene Respaldo?",
    accessorKey: "respaldo",
    cell: ({ row }) => {
      const respaldo = row.original.respaldo;
      return (
        <Chip
          label={respaldo ? "Sí" : "No"}
          color={respaldo ? "success" : "error"}
          variant="outlined"
          size="small"
        />
      );
    },
  },
  // {
  //   id: "enganches",
  //   header: "¿Tiene Enganches?",
  //   title: "¿Tiene Enganches?",
  //   accessorKey: "enganches",
  //   cell: ({ row }) => {
  //     const enganches = row.original.enganches;
  //     return (
  //       <Chip
  //         label={enganches ? "Sí" : "No"}
  //         color={enganches ? "success" : "error"}
  //         variant="outlined"
  //         size="small"
  //       />
  //     );
  //   },
  // },
  {
    id: "firewall",
    header: "¿Firewall Activo?",
    title: "¿Firewall Activo?",
    accessorKey: "firewall",
    cell: ({ row }) => {
      const firewall = row.original.firewall;
      return (
        <Chip
          label={firewall ? "Sí" : "No"}
          color={firewall ? "success" : "error"}
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

export default function NodosView({ clienteId }) {
  const { getNodosIdClient } = useNodos();

  // Usamos useQuery para obtener los nodos solo cuando clienteId esté disponible
  const { data: nodos, isLoading, isError, error } = useQuery({
    queryKey: ["nodos_by_cliente", clienteId],
    queryFn: () => getNodosIdClient(clienteId),
    enabled: !!clienteId,  // Solo se ejecuta si clienteId es verdadero
    refetchOnWindowFocus: false,
  });

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <AbstractTable
      columns={columns}
      rows={nodos || []}
      inputText="Buscar Nodo"
      tableId="nodos"
      isLoading={isLoading}
    >
      <CreateModalNodos clienteId={clienteId} />
    </AbstractTable>
  );
}

