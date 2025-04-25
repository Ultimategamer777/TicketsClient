// react
import React from 'react';

// mui 
import { Chip } from '@mui/material';

// tanstack 
import { useQuery } from "@tanstack/react-query";

// components
import RowAction from './components/RowActions';
import AbstractTable from '../../../ui-component/table/AbstractTable';
import CreateModalProductos from './components/CreateModalProductos';
import PieChart from '../../../ui-component/charts/PieChart';

// hooks
import { useProductos } from "./hooks/useProductos";

const columns = [
    { id: "name", header: "Nombre", title: "Nombre", accessorKey: "name" },
    { id: "description", header: "Descripción", title: "Descripción", accessorKey: "description" },
    {
        id: "category",
        header: "Categoría",
        title: "Categoría",
        accessorKey: "category",
      },
      {
        id: "cantidad",
        header: "Cantidad",
        title: "Cantidad",
        accessorKey: "cantidad",
      },
      // {
      //   id: "stock",
      //   header: "Stock",
      //   title: "Stock",
      //   accessorKey: "stock",
      // },
      {
        id: "bodega",
        header: "Bodega",
        title: "Bodega",
        accessorKey: "bodega.name",
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
  

export default function ProductosView() {
  const { getProducto } = useProductos();

  const { data: productos, isLoading } = useQuery({
    queryKey: ["productos"],
    queryFn: getProducto,
    refetchOnWindowFocus: false
  });

  const chartData = productos?.map(producto => ({
    value: producto.cantidad,
    name: producto.name
  })) || [];

  return (
    <>
      <PieChart
        title="Productos por bodega"
        // subtitle="Dosis requeridas por tipo de vacuna"
        name="Productos"
        data={chartData}
      />

      <AbstractTable
        columns={columns}
        rows={productos}
        inputText="Buscar"
        tableId="productos"
        isLoading={isLoading}
      >
        <CreateModalProductos />
      </AbstractTable>
    </>
  );
}
