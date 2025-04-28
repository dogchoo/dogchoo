import { Column } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CheckIcon, FilterIcon } from "lucide-react";
import { ComponentType, ReactNode, useMemo } from "react";

export interface FacedFilterOption<T> {
  value: T | string;
  label: string;
  icon?: any;
  raw?: any;
  selected?: boolean;
  className?: string;
}

export type FacetedFilter<TData> = {
  [K in keyof TData]: {
    key: K;
    label: ReactNode;
    options: FacedFilterOption<TData[K]>[];
  };
}[keyof TData];

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: ReactNode;
  options: {
    label: string;
    value: any;
    icon?: ComponentType<{ className?: string }>;
    selected?: boolean;
  }[];
  onFilterChange?: (raw: any) => void;
  filterKey: string;
}

export const DataTableFacetedFilter = <TData, TValue>({ column, title, options, filterKey, onFilterChange }: DataTableFacetedFilterProps<TData, TValue>) => {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = useMemo(() => new Set(column?.getFilterValue() as string[]), [column]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center border-dashed"
        >
          <FilterIcon className="mr-2 size-4" />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator
                orientation="vertical"
                className="mx-2 h-4"
              />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} 선택됨
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="size-14 rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[200px] p-0"
        align="start"
      >
        <Command>
          <CommandInput placeholder="필터 검색" />
          <CommandList>
            <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    className="cursor-pointer"
                    key={option.value}
                    onSelect={() => {
                      if (!isSelected) {
                        selectedValues.add(option.value);
                      } else {
                        selectedValues.delete(option.value);
                      }
                      onFilterChange?.((option as any).raw);
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(filterValues.length ? filterValues : undefined);
                    }}
                  >
                    <div
                      className={cn(
                        "border-primary mr-2 flex size-4 items-center justify-center rounded-sm border",
                        isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <CheckIcon className="size-4" />
                    </div>
                    {option.icon && <option.icon className="text-muted-foreground mr-2 size-4" />}
                    <span>{option.label}</span>
                    {facets?.get(option.value) && <span className="ml-auto flex size-4 items-center justify-center font-mono text-xs">{facets.get(option.value)}</span>}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      column?.setFilterValue(undefined);
                      selectedValues.clear();
                      onFilterChange?.({
                        type: (options[0] as any).raw.type,
                        value: null,
                      });
                    }}
                    className="cursor-pointer justify-center text-center"
                  >
                    필터 해제
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
