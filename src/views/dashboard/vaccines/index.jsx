// react
import React from 'react';

// mui 
import { Button } from '@mui/material';

// tanstack 
import { useQuery } from "@tanstack/react-query";

// components
import RowActions from './components/RowActions';
import AbstractTable from '../../../ui-component/table/AbstractTable';
import CreateVaccinesModal from './components/CreateVaccines';
import PieChart from '../../../ui-component/charts/PieChart';

// hooks
import { useVaccine } from "./hooks/useVaccines";

const columns = [
  {
    id: "name",
    header: "Nombre",
    title: "Nombre",
    accessorKey: "name",
  },
  {
    id: "recomendedAge",
    header: "Edad Recomendada",
    title: "Edad Recomendada",
    accessorKey: "recomendedAge",
  },
  {
    id: "dosesRequired",
    header: "Dosis Requeridas",
    title: "Dosis Requeridas",
    accessorKey: "dosesRequired",
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

export default function VaccineView() {
  const { getVaccines } = useVaccine();

  const { data: vaccines, isLoading } = useQuery({
    queryKey: ["vaccines"],
    queryFn: getVaccines,
    refetchOnWindowFocus: false
  });

  const chartData = vaccines?.map(vaccine => ({
    value: vaccine.dosesRequired,
    name: vaccine.name
  })) || [];

  return (
    <>
      <PieChart
        title="Vacunas por pacientes"
        // subtitle="Dosis requeridas por tipo de vacuna"
        name="Vacunas"
        data={chartData}
      />

      <AbstractTable
        columns={columns}
        rows={vaccines}
        inputText="Buscar vacuna"
        tableId="vaccines"
        isLoading={isLoading}
      >
        <CreateVaccinesModal />
      </AbstractTable>
    </>
  );
}
