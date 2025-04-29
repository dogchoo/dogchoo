"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { ko } from "date-fns/locale";
import { ComponentProps, useEffect, useMemo, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";

interface DatePickerProps {
  className?: string;
  placeholder?: string;
  value?: Date;
  onChange?: (date: Date | DateRange) => void;
  onSubmit?: (date: Date | DateRange) => void;
  time?: boolean;
  variant?: "outline" | "default" | "link" | "destructive" | "secondary" | "ghost";
  year?: boolean;
}

const format = new Intl.DateTimeFormat("ko-KR").format;

const DatePicker = ({ className, onChange, onSubmit, selected, numberOfMonths = 2, variant = "outline", mode, year, ...rest }: DatePickerProps & ComponentProps<typeof DayPicker>) => {
  const { placeholder = "날짜를 선택 해 주세요.", value = new Date() } = rest;

  const [dateRange, setDateRange] = useState<DateRange>();
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState<boolean>(false);
  const [month, setMonth] = useState<Date>(new Date());
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const [selectedMonth, setSelectedMonth] = useState<string>((new Date().getMonth() + 1).toString());

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const startYear = 2020;

    return Array.from(
      {
        length: currentYear - startYear + 1,
      },
      (_, index) => startYear + index,
    );
  }, []);

  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => `${i + 1}`), []);

  useEffect(() => {
    if (selected && mode === "range") {
      setDateRange(selected);
      if (selected.from) {
        setMonth(selected.from);
      }
    }

    if (selected && mode === "single") {
      setDate(selected);
      setMonth(selected);
    }
  }, [mode, selected, setDateRange]);

  useEffect(() => {
    if (open) {
      if (mode === "range" && dateRange?.from) {
        setMonth(dateRange.from);
      } else if (mode === "single" && date) {
        setMonth(date);
      }
    }
  }, [open, dateRange, date, mode]);

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant={variant}
          className={cn("w-[280px] justify-start text-left font-normal", !dateRange && "text-muted-foreground", className)}
        >
          <CalendarIcon className="mr-2 size-4" />

          {mode === "range" &&
            (dateRange ? (
              <span>
                {format(dateRange.from || new Date())} ~ {format(dateRange.to || new Date())}
              </span>
            ) : (
              <span>{placeholder}</span>
            ))}

          {mode === "single" && (date ? <span>{format(date)}</span> : <span>{placeholder}</span>)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col p-0">
        {year && (
          <div className="flex items-center justify-center gap-2 p-4 pb-0">
            {/* 연도 선택 */}
            <Select
              value={selectedYear}
              onValueChange={(year) => {
                setSelectedYear(year);
                const newDate = new Date(Number(year), Number(selectedMonth) - 1);
                setMonth(newDate);
              }}
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="연도" />
              </SelectTrigger>
              <SelectContent className="z-[100]">
                {years.map((year) => (
                  <SelectItem
                    value={year.toString()}
                    key={year}
                  >
                    {year}년
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* 월 선택 */}
            <Select
              value={selectedMonth}
              onValueChange={(monthStr) => {
                setSelectedMonth(monthStr);
                const newDate = new Date(Number(selectedYear), Number(monthStr) - 1);
                setMonth(newDate);
              }}
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="월" />
              </SelectTrigger>
              <SelectContent className="z-[100]">
                {months.map((month) => (
                  <SelectItem
                    key={month}
                    value={month}
                  >
                    {Number(month)}월
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        {mode === "single" ? (
          <Calendar
            {...rest}
            numberOfMonths={numberOfMonths}
            locale={ko}
            onMonthChange={setMonth}
            month={month}
            onSelect={setDate}
            onDayClick={(day) => {
              setDate(day);
              onChange && onChange(day);
              setOpen(false);
            }}
            selected={date}
            initialFocus
          />
        ) : (
          <>
            <Calendar
              {...rest}
              numberOfMonths={numberOfMonths}
              onMonthChange={setMonth}
              locale={ko}
              initialFocus
              month={month}
              mode="range"
              onSelect={(e) => {
                setDateRange(e);
                if (onChange && e && e.to && e.from) {
                  onChange(e);
                }
              }}
              selected={dateRange}
            />
            <div className="ml-auto space-x-2 p-2 pt-0">
              <Button
                onClick={() => {
                  setOpen(false);
                  if (dateRange && onSubmit) {
                    onSubmit(dateRange);
                  }
                }}
              >
                결정
              </Button>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
