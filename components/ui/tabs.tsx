"use client";

import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import * as React from "react";

interface Context {
  defaultValue: string;
  hrefFor: (value: string) => LinkProps["href"];
  searchParam: string;
  selected: string;
  baseUrl: string;
}
const TabsContext = React.createContext<Context>(null as any);

export function Tabs(props: {
  children: React.ReactNode;
  baseUrl: string;
  className?: string;
  /**
   * The default tab
   */
  defaultValue: string;
  /**
   * Which search param to use
   * @default "tab"
   */
  searchParam?: string;
}) {
  const { children, className, baseUrl, searchParam = "tab", ...other } = props;
  const searchParams = useSearchParams()!;

  const selected = searchParams.get(searchParam) || props.defaultValue;

  const hrefFor: Context["hrefFor"] = React.useCallback(
    (value) => {
      return `${baseUrl}/${value}`;
    },
    [searchParams, props.searchParam],
  );

  return (
    <TabsContext.Provider value={{ ...other, hrefFor, searchParam, selected, baseUrl }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

const useContext = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs compound components cannot be rendered outside the Tabs component");
  }

  return context;
};

export function TabsList(props: { children: React.ReactNode; className?: string }) {
  return (
    <div
      {...props}
      className={cn("bg-muted text-muted-foreground inline-flex h-10 items-center justify-center rounded-md p-1", props.className)}
    />
  );
}

export const TabsTrigger = (props: { children: React.ReactNode; className?: string; value: string }) => {
  const context = useContext();
  const pathname = usePathname();

  return (
    <Link
      {...props}
      className={cn(
        "ring-offset-background focus-visible:ring-ring data-[state=active]:bg-primary inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-white data-[state=active]:shadow-sm dark:data-[state=active]:text-black",
        props.className,
      )}
      data-state={pathname.includes(props.value) ? "active" : "inactive"}
      href={context.hrefFor(props.value)}
      scroll={false}
      shallow={true}
    />
  );
};

export function TabsContent(props: { children: React.ReactNode; className?: string; value: string }) {
  const context = useContext();

  if (context.selected !== props.value) {
    return null;
  }

  return (
    <div
      {...props}
      className={cn("ring-offset-background focus-visible:ring-ring mt-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none", props.className)}
    />
  );
}

// data-[state=active]:bg-primary
