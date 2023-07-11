"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-[20px] w-[20px] shrink-0 border-2 border-light-gray hover:border-lime focus:border-lime focus-visible:border-lime ring-offset-white focus-visible:outline-none data-[state=checked]:bg-lime data-[state=checked]:text-slate data-[state=checked]:border-lime",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="h-4 w-4"
      >
        <rect width="20" height="20" fill="#A4FFAF" />
        <path
          d="M4 10.6066L7.39341 14L15.3934 6"
          stroke="#18171F"
          strokeWidth="3"
        />
      </svg>
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
