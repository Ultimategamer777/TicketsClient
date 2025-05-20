import React from "react";
import { Link } from "react-router-dom";

import { styled } from "@mui/material/styles";
import { Chip, Button } from "@mui/material";
import Badge, { badgeClasses } from "@mui/material/Badge";

import { useQuery } from "@tanstack/react-query";

import AbstractTable from "../../../ui-component/table/AbstractTable";
import { PlusIcon } from "../../../shared/icons";

import useTicket from "./hooks/useTicket";
import RowActions from "./components/RowActions";

const PlusBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

const columns = [
  {
    id: "titulo",
    header: "Título",
    title: "Título",
    accessorKey: "titulo",
    width: "25%",
  },
  {
    id: "tag",
    header: "Tag",
    title: "Tag",
    accessorKey: "tag.name", 
    width: "20%",
  },
  {
    id: "prioridad",
    header: "Prioridad",
    title: "Prioridad",
    accessorKey: "prioridad.name",
    width: "15%",
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
    width: "20%",
    cell: ({ row }) => (
      <RowActions id={row.original.id} state={row.original.isActive} />
    ),
  },
];

export default function TicketView() {
  const { getTickets } = useTicket();

  const { data: tickets, isLoading } = useQuery({
    queryKey: ["tickets"],
    queryFn: getTickets,
    refetchOnWindowFocus: false,
  });

  return (
    <AbstractTable
      columns={columns}
      rows={tickets}
      inputText="Buscar tickets"
      tableId="tickets"
      isLoading={isLoading}
    >
      <Link to="/home/ticket/add">
        <Button
          variant="contained"
          color="secondary"
          sx={{ width: "max-content" }}
          startIcon={<PlusIcon />}
        >
          Agregar Ticket
        </Button>
      </Link>
    </AbstractTable>
  );
}
