"use client";

import { Button } from "@/components/ui/button";
import DataTable, { SortHeader } from "@/components/ui/data-table";
import { FacetedFilter } from "@/components/ui/data-table-faceted-filter";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { TopicListItem } from "@/features/topic/model/types/topic-list-item";
import { cn } from "@/lib/utils";
import { dateFormat } from "@/libs/utils";
import { useDialogStore } from "@/store/dialog/use-dialog-store";
import { useSheetStore } from "@/store/sheet/use-sheet-store";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, MoreHorizontalIcon, PlusIcon, Trash2Icon } from "lucide-react";

const AdminTopicDataTable = ({ topics }: { topics: TopicListItem[] }) => {
  const openSheet = useSheetStore((state) => state.actions.openWithAction);
  const openDialog = useDialogStore((state) => state.actions.openWithAction);

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
              <div className={cn("size-3 rounded-full", row.original.isDone ? "bg-muted-foreground" : "bg-emerald-400")} />
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
      cell: ({ row }) => {
        const topic = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="cursor-pointer"
                size="icon"
              >
                <MoreHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{topic.title}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup className="space-y-1">
                <DropdownMenuItem
                  onClick={() => {
                    openSheet({
                      type: "update-topic",
                      payload: topic,
                    });
                  }}
                >
                  <EditIcon className="size-4" />
                  <p>주제 수정</p>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    openDialog({
                      type: "delete-topic",
                      payload: {
                        id: topic.id,
                      },
                    });
                  }}
                >
                  <Trash2Icon className="size-4" />
                  <p>주제 삭제</p>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const facetedFilters: FacetedFilter<TopicListItem>[] = [
    {
      key: "isDone",
      label: "종료 여부",
      options: [
        { label: "종료됨", value: true },
        { label: "진행중", value: false },
      ],
    },
  ];

  return (
    <DataTable
      addCompoennt={() => (
        <Button
          className="flex h-9 items-center gap-x-2"
          onClick={() => {
            openDialog({
              type: "create-topic",
            });
          }}
        >
          <PlusIcon />
          주제 추가
        </Button>
      )}
      facetedFilters={facetedFilters}
      className="w-full"
      columns={columns}
      search
      data={topics}
    />
  );
};

export default AdminTopicDataTable;
