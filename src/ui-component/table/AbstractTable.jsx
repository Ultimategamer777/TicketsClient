/**
 * AbstractTable
 * @component
 * @description A higher-order component that abstracts away the complexity of using TanStack Table
 * @param {Object} props Component props
 * @param {Object} props.columns Column definitions
 * @param {Object} props.data Data to be rendered
 * @param {Object} props.defaultColumn Optional default column definition
 * @param {Object} props.defaultSort Optional default sort definition
 * @param {Object} props.disableFilters Disable filters
 * @param {Object} props.disableGrouping Disable grouping
 * @param {Object} props.disablePagination Disable pagination
 * @param {Object} props.disableSorting Disable sorting
 * @param {Object} props.enableColumnFiltering Enable column filtering
 * @param {Object} props.enableColumnResizing Enable column resizing
 * @param {Object} props.enableColumnSelection Enable column selection
 * @param {Object} props.enablePinning Enable pinning
 * @param {Object} props.enableRowSelection Enable row selection
 * @param {Object} props.enableSorting Enable sorting
 * @param {Object} props.filterColumnOptions Optional filter column options
 * @param {Object} props.filterGlobally Optional filter globally
 * @param {Object} props.filterMode Optional filter mode
 * @param {Object} props.filterTypes Optional filter types
 * @param {Object} props.isPaginated Optional is paginated
 * @param {Object} props.isVirtualized Optional is virtualized
 * @param {Object} props.onDataChange Optional callback for data changes
 * @param {Object} props.onFilterChange Optional callback for filter changes
 * @param {Object} props.onRowClick Optional callback for row clicks
 * @param {Object} props.onRowDoubleClick Optional callback for row double clicks
 * @param {Object} props.onRowSelectionChange Optional callback for row selection changes
 * @param {Object} props.onSortChange Optional callback for sort changes
 * @param {Object} props.renderCell Optional custom cell renderer
 * @param {Object} props.renderHeader Optional custom header renderer
 * @param {Object} props.renderRow Optional custom row renderer
 * @param {Object} props.renderSubRow Optional custom subrow renderer
 * @param {Object} props.renderSummary Optional custom summary renderer
 * @param {Object} props.renderToolbar Optional custom toolbar renderer
 * @param {Object} props.sortColumn Optional sort column
 * @param {Object} props.sortDirection Optional sort direction
 * @param {Object} props.state Optional initial state
 */

// REACT 
import { useState, useEffect } from "react";

// MUI
import {
  TableContainer,
  TablePagination,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Table,
  Stack,
  Tooltip,
  Toolbar,
  Checkbox,
  Box,
  Card,
  MenuItem,
  IconButton,
  Menu,
  CircularProgress,
} from "@mui/material";

// helpers
import { useHelper } from "../../shared/helpers/useHelper";

// tanstack table
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  createColumnHelper,
} from "@tanstack/react-table";

// icons
import { ChevronUpIcon, ChevronDownIcon, FilterListIcon } from "../../shared/icons";

// store
import { useHiddenColumnStore } from "../../store/use-hide-columns-store";
import { usePaginationStore } from "../../store/use-pagination-store";

import { fuzzyFilter, DebouncedInput, Filter } from "./actions/TableHelpers";

export default function AbstractTable({
  rows = [],
  columns = [],
  isLoading = false,
  inputText = "Buscar",
  tableId = "default",
  children = null
}) {
  const { isSmallService } = useHelper();

  // initial states
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);
  const [visible, setVisible] = useState(false);
  const [_, setOpenFilter] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const { hiddenColumns, setHiddenColumn, resetHiddenColumns } =
    useHiddenColumnStore();

  //   TABLE INDENTIFIER
  const { pageSizes, setPageSize } = usePaginationStore();
  const pageSize = pageSizes[tableId] || 5;

  //   USED TO OPEN FILTER MENU
  const handleOpenMenu = (event) => {
    setAnchor(event.currentTarget);
    setOpenFilter(true);
  };
  //   USED TO CLOSE FILTER MENU
  const handleCloseMenu = () => {
    setAnchor(null);
    setOpenFilter(false);
  };

  //   OBJECT USED FOR CREATE THE TABLE
  const table = useReactTable({
    data: rows,
    columns: columns,
    enableColumnPinning: true,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    getRowId: (row) => row.id,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "fuzzy",
    initialState: {
      pagination: {
        pageSize: pageSize,
      },
    },
  });

  const { pageIndex } = table.getState().pagination;

  const handlePageSizeChange = (e) => {
    const newSize = Number(e.target.value);
    setPageSize(tableId, newSize);
    table.setPageSize(newSize);
  };

  const handleVisible = (event) => {
    setVisible(event.target.checked);
  };

  useEffect(() => {
    if (table.getState().columnFilters[0]?.id === "areaName") {
      if (table.getState().sorting[0]?.id !== "areaName") {
        table.setSorting([{ id: "areaName", desc: false }]);
      }
    }
  }, [table.getState().columnFilters[0]?.id]);

  useEffect(() => {
    // Aplicar la visibilidad de las columnas guardada
    const tableHiddenColumns = hiddenColumns[tableId] || {};
    Object.keys(tableHiddenColumns).forEach((columnId) => {
      const column = table.getColumn(columnId);
      if (column) {
        column.toggleVisibility(!tableHiddenColumns[columnId]); // Actualizar la visibilidad de la columna en la tabla
      }
    });
  }, [hiddenColumns, tableId, table]); // Se ejecuta cuando cambia `hiddenColumns` o `tableId`

  const toggleColumnVisibility = (columnId) => {
    // Alternar visibilidad en el store
    const newVisibility = !hiddenColumns[tableId]?.[columnId];
    setHiddenColumn(tableId, columnId, newVisibility);

    // Cambiar visibilidad en la tabla
    const column = table.getColumn(columnId);
    if (column) {
      column.toggleVisibility(newVisibility); // Asegúrate de que esta función esté disponible
    }
  };

  return (
    <>
      <Card elevation={0} sx={{ width: "100%", overflow: "hidden" }}>
        <Toolbar>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ width: "100%" }}
          >
            {/* INPUT SEARCH */}
            <DebouncedInput
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              placeholder={inputText ?? "Filtrar tabla..."}
            />
            {/* CHECKBOX FOR FILTER COLUMNS */}
            <Tooltip title="Activar búsquedas">
              <Checkbox
                checked={visible}
                onChange={handleVisible}
                color="primary"
                size="medium"
                sx={{ width: 30, height: 30, padding: 0 }}
              />
            </Tooltip>

            {/* CHECKBOX FOR HIDE OR SHOW COLUMNS */}
            <Tooltip title="Filtrar columnas">
              <IconButton onClick={handleOpenMenu}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchor}
              open={Boolean(anchor)}
              onClose={handleCloseMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <MenuItem key="toggle-all">
                <Checkbox
                  checked={table.getIsAllColumnsVisible()}
                  onChange={table.getToggleAllColumnsVisibilityHandler()}
                />
                Todos
              </MenuItem>
              {table.getAllLeafColumns().map((column) => (
                <MenuItem key={column.id}>
                  <Checkbox
                    checked={column.getIsVisible()}
                    onChange={() => toggleColumnVisibility(column.id)}
                  />
                  {column.id}
                </MenuItem>
              ))}
            </Menu>
          </Stack>

          <Box sx={{
            display: 'flex',
            flexGrow: 1,
            width: '100%',
          }}>
          </Box>

          <Box>
            {children}
          </Box>
        </Toolbar>

        <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
          <Table
            sx={{
              direction: table.options.columnResizeDirection,
              width: isSmallService ? "max-content" : "100%",
              overflowX: "auto",
            }}
          >
            <TableHead>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((header) => (
                    <TableCell key={header.id}>
                      <Box
                        sx={{
                          userSelect: "none",
                          cursor: header.column.getCanSort()
                            ? "pointer"
                            : "default",
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          justifyContent: "center",
                          // "&:hover": {
                          //   backgroundColor: header.column.getCanSort()
                          //     ? "action.hover"
                          //     : "transparent",
                          // },
                          "& svg": {
                            marginLeft: 1,
                          },
                        }}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <ChevronUpIcon />,
                          desc: <ChevronDownIcon />,
                        }[header.column.getIsSorted()] ?? null}
                      </Box>

                      {visible && header.column.getCanFilter() ? (
                        <div>
                          <Filter column={header.column} />
                        </div>
                      ) : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>

            <TableBody>
              {isLoading ? (
                <TableRow >
                  <TableCell colSpan={table.getVisibleLeafColumns().length}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "150px",
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => {
                  return (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          align="center"
                          sx={{ width: cell.column.getSize() }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={table.getVisibleLeafColumns().length}>
                    <Box
                      sx={{
                        width: "100%",
                        height: "150px",
                        backgroundImage:
                          "url('/assets/images/ic-folder-empty.svg')",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "contain",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: 2,
                        textAlign: "center",
                      }}
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* FOOTER */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={pageSize}
          page={pageIndex}
          labelRowsPerPage="Filas por página"
          slotProps={{
            select: {
              inputProps: { "aria-label": "rows per page" },
              native: true,
            },
          }}
          onPageChange={(_, page) => {
            table.setPageIndex(page);
          }}
          onRowsPerPageChange={handlePageSizeChange}
        //   ActionsComponent={TablePaginationActions}
        />
      </Card>
    </>
  );
}