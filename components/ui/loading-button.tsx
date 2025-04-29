"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";

interface LoadingButtonProps {
  isLoading: boolean;
  children?: ReactNode;
  className?: string;
}

const LoadingButton = forwardRef<HTMLButtonElement, Partial<typeof Button> & LoadingButtonProps & ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps>(
  ({ isLoading, children, className, $$typeof = "", type = "submit", disabled, ...rest }, ref) => (
    <Button
      type={type}
      ref={ref}
      disabled={disabled || isLoading}
      {...rest}
      className={cn("flex w-full gap-x-2", className)}
    >
      {isLoading ? <Loader2Icon className="animate-spin" /> : children}
    </Button>
  ),
);

LoadingButton.displayName = "LoadingButton";

export default LoadingButton;
