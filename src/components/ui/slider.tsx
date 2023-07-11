"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden bg-slate">
      <SliderPrimitive.Range className="absolute h-full bg-lime" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-[28px] w-[28px] rounded-full border border-light-gray bg-light-gray outline-none focus:bg-slate hover:bg-slate focus:border-lime hover:border-lime" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
