import * as React from "react";
import { cn } from "@/lib/utils";

const FILL_COLOR_MAP = [
  ["red", "orange", "yellow", "lime"],
  [null, "orange", "yellow", "lime"],
  [null, null, "yellow", "lime"],
  [null, null, null, "lime"],
];

export default function StrengthIndicator({
  index,
  strength,
}: {
  index: number;
  strength: number | null;
}) {
  let fillColor = null;

  if (typeof strength === "number") {
    fillColor = FILL_COLOR_MAP[index][strength];
  }

  return (
    <div
      role="presentation"
      className={cn(
        "border-2 border-light-gray h-[28px] w-[10px] ",
        fillColor === "red" && "bg-red border-red",
        fillColor === "orange" && "bg-orange border-orange",
        fillColor === "yellow" && "bg-yellow border-yellow",
        fillColor === "lime" && "bg-lime border-lime"
      )}
    ></div>
  );
}
