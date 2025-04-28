"use client";

import { Button } from "@/components/ui/button";
import DataTable, { SortHeader } from "@/components/ui/data-table";
import { FacetedFilter } from "@/components/ui/data-table-faceted-filter";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { TopicListItem } from "@/features/topic/model/types/topic-list-item";
import { cn } from "@/lib/utils";
import { dateFormat } from "@/libs/utils";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";

const AdminTopicDataTable = ({ topics }: { topics: TopicListItem[] }) => {
  const columns: ColumnDef<TopicListItem>[] = [
    {
      accessorKey: "id",
      header: "ID",
      meta: "ID",
    },
    {
      accessorKey: "title",
      header: "제목",
      meta: "제목",
    },
    {
      accessorKey: "startDate",
      header: ({ column }) => <SortHeader column={column}>시작 날짜</SortHeader>,
      meta: "시작 날짜",
      cell: ({ row }) => dateFormat(new Date(row.original.startDate)),
    },
    {
      accessorKey: "created",
      header: ({ column }) => <SortHeader column={column}>생성 날짜</SortHeader>,
      meta: "생성 날짜",
      cell: ({ row }) => dateFormat(new Date(row.original.created)),
    },
    {
      accessorKey: "isDone",
      header: "종료 여부",
      meta: "종료 여부",
      cell: ({ row }) => (
        <div className="flex items-center gap-x-2">
          <Popover>
            <PopoverTrigger className="flex cursor-pointer flex-row items-center gap-x-2">
              <div className={cn("size-3 rounded-full", row.original.isDone ? "bg-emerald-400" : "bg-muted-foreground")} />
              <span className="hover:underline">{row.original.isDone ? "종료됨" : "진행중"}</span>
            </PopoverTrigger>
          </Popover>
        </div>
      ),
      filterFn: (row, id, value) => value.includes(row.getValue(id)),
    },
    {
      enableColumnFilter: false,
      accessorKey: "동작",
      cell: () => (
        <Button
          variant="outline"
          size="icon"
        >
          <MoreHorizontalIcon />
        </Button>
      ),
    },
  ];

  const facetedFilters: FacetedFilter<TopicListItem>[] = [
    {
      key: "isDone",
      label: "종료 여부",
      options: [
        { label: "종료됨", value: true, selected: true },
        { label: "진행중", value: false },
      ],
    },
  ];

  return (
    <DataTable
      facetedFilters={facetedFilters}
      className="w-full"
      columns={columns}
      search
      data={topics}
    />
  );
};

export default AdminTopicDataTable;
