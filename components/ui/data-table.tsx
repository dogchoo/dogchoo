"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnSizingState, type Table as TTable } from "@tanstack/react-table";

import {
  Column,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { ContextMenu, ContextMenuContent, ContextMenuTrigger } from "@/components/ui/context-menu";

import { DataTableFacetedFilter, FacetedFilter } from "@/components/ui/data-table-faceted-filter";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useArrayCookie } from "@/hooks/use-array-cookie";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import _ from "lodash";
import { ArrowDownIcon, ArrowUpDown, ArrowUpIcon } from "lucide-react";
import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react";

interface DataTableProps<TData, TValue> {
  cookieKey?: string;
  autoFocus?: boolean;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filter?: boolean;
  search?: boolean;
  pagination?: boolean;
  searchPlaceholder?: string;
  selectBox?: boolean;
  facetedFilters?: FacetedFilter<TData>[];
  className?: string;
  rowClassName?: string;
  pageSize?: number;
  selectedRowHandler?: (rows: Row<TData>[]) => ReactNode;
  searchInput?: (globalFilter: string, setGlobalFilter: (filter: string) => void) => ReactNode;
  contextMenu?: (row: TData) => ReactNode;
  render?: (table: TTable<TData>) => ReactNode;
  onClickRow?: (e: MouseEvent, row: Row<TData>) => void;
  onFilterChange?: (raw: { value: string | null; type: string }) => void;
  onRowChange?: (rows: Row<TData>[]) => void;
  selectedChange?: (row: Row<TData>[]) => void;
  addCompoennt?: () => ReactNode;
}

interface SortHeaderProps<TData> {
  className?: string;
  column: Column<TData>;
  children?: ReactNode;
  ascIcon?: ReactNode;
  descIcon?: ReactNode;
}

export const TruncatedCell = ({ content, maxLength = 50 }: { content: string; maxLength: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDoubleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const displayText = isExpanded ? content : content.length > maxLength ? content.slice(0, maxLength) + "..." : content;

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className={`cursor-pointer p-2 ${isExpanded ? "whitespace-pre-wrap" : "truncate"}`}
      title={isExpanded ? "" : content}
    >
      {displayText}
    </div>
  );
};

export const SortHeader = <TData,>({ className, column, children, ascIcon = <ArrowUpIcon className="size-4" />, descIcon = <ArrowDownIcon className="size-4" /> }: SortHeaderProps<TData>) => (
  <Button
    className={cn("pl-0", className)}
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    {children}
    {!column.getIsSorted() && <ArrowUpDown className="size-4" />}

    {column.getIsSorted() === "asc" && ascIcon}
    {column.getIsSorted() === "desc" && descIcon}
  </Button>
);

const DataTable = <TData, TValue>({
  cookieKey = "",
  autoFocus = false,
  columns,
  data,
  facetedFilters,
  pagination = true,
  className,
  rowClassName,
  searchPlaceholder = "검색",
  search = false,
  selectBox = false,
  filter = false,
  pageSize = 10,
  searchInput,
  contextMenu,
  onClickRow,
  onRowChange,
  selectedChange,
  selectedRowHandler,
  onFilterChange,
  render,
  addCompoennt,
}: DataTableProps<TData, TValue>) => {
  const [hydrated, setHydrated] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [colSizing, setColSizing] = useState<ColumnSizingState>({});

  const { value: cookie, setValue: setCookie } = useArrayCookie<string>(`${cookieKey}_visibility`, []);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const table = useReactTable({
    columns,
    data,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    onColumnSizingChange: setColSizing,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    initialState: {
      pagination: {
        pageSize,
      },
    },

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      columnSizing: colSizing,
    },
  });

  const filtered = table.getFilteredRowModel();
  const selected = table.getSelectedRowModel();

  useEffect(() => {
    onRowChange && onRowChange(filtered.rows);
  }, [filtered, onRowChange]);

  useEffect(() => {
    selectedChange && selectedChange(selected.rows);
  }, [selected, selectedChange]);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    const keys = columns.map((column) => (column as any).accessorKey);
    const initialState = (value: boolean) => _.fromPairs(keys.map((key) => [key, value]));
    if (cookieKey && cookie.length > 0) {
      const state = initialState(false);
      cookie.forEach((id) => {
        state[id] = true;
      });
      setColumnVisibility(state);
    }

    if (cookie.length === 0) {
      const state = initialState(true);
      setColumnVisibility(state);
    }
  }, [cookieKey]);

  useEffect(() => {
    if (cookieKey) {
      const visibleColumns = Object.entries(columnVisibility)
        .filter(([_, isVisible]) => isVisible)
        .map(([columnId]) => columnId);
      setCookie(visibleColumns);
    }
  }, [columnVisibility, cookieKey]);

  useEffect(() => {
    setHydrated(true);

    facetedFilters &&
      facetedFilters.forEach((facetedFilter) => {
        const initFilter = facetedFilter.options.filter((option) => option.selected).map((option) => option.value);
        if (initFilter.length > 0) {
          table.getColumn(facetedFilter.key as string)?.setFilterValue(initFilter);
        }
      });
  }, []);

  if (!hydrated) {
    return null;
  }

  return (
    <div className={className}>
      <div className={cn("flex items-center space-y-2 gap-x-2 lg:space-y-0", (search || filter || addCompoennt) && "mb-2")}>
        {table.getSelectedRowModel().rows.length > 0 && selectedRowHandler && selectedRowHandler(table.getSelectedRowModel().rows)}

        <div className="flex-1">
          <ScrollArea className="whitespace-nowrap">
            <div className="items-center gap-2 space-y-2 space-x-2 lg:flex lg:space-y-0">
              {facetedFilters &&
                facetedFilters.map((facetedFilter) => (
                  <DataTableFacetedFilter
                    key={facetedFilter.key as string}
                    filterKey={facetedFilter.key as string}
                    onFilterChange={onFilterChange}
                    column={table.getColumn(facetedFilter.key as string)}
                    title={facetedFilter.label}
                    options={facetedFilter.options}
                  />
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {search &&
          (searchInput ? (
            searchInput(globalFilter, setGlobalFilter)
          ) : (
            <Input
              autoFocus={autoFocus}
              placeholder={searchPlaceholder}
              ref={inputRef}
              value={globalFilter ?? ""}
              onChange={(event) => {
                setGlobalFilter(event.target.value);
              }}
              className="ml-auto lg:w-[140px]"
            />
          ))}
        {filter && (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                className="flex w-full cursor-pointer items-center gap-x-2 lg:w-auto"
              >
                행 보기
                <MixerHorizontalIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      onClick={(e) => {
                        column.toggleVisibility(!column.getIsVisible());
                        e.preventDefault();
                      }}
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      <div>{(column.columnDef.meta as string) || column.id}</div>
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <div className="self-start">{addCompoennt?.()}</div>
      </div>

      <ScrollArea className="w-full rounded-md border">
        <div className="w-max min-w-full">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="relative"
                      >
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <ContextMenu
                    key={row.id}
                    modal={false}
                  >
                    <ContextMenuTrigger asChild>
                      <TableRow
                        className={cn(onClickRow && "cursor-pointer")}
                        data-state={row.getIsSelected() && "selected"}
                        onClick={(e) => onClickRow && onClickRow(e, row)}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            className={cn(rowClassName, !isDesktop && "p-2")}
                            key={cell.id}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    </ContextMenuTrigger>
                    {contextMenu && <ContextMenuContent>{contextMenu(row.original)}</ContextMenuContent>}
                  </ContextMenu>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    검색 결과 없음
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {pagination && (
        <div className="mt-2">
          <DataTablePagination
            table={table}
            selectBox={selectBox}
          />
        </div>
      )}

      {render?.(table)}
    </div>
  );
};

export default DataTable;
