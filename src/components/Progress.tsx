import { cn } from "@/utils/utils";

export default function Progress({
  ratio = 0,
  size = "md",
  barClassName = "",
  wrapClassName = "",
}: {
  ratio: number;
  size?: "md" | "lg";
  barClassName?: string;
  wrapClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-full bg-black overflow-hidden",
        size === "md" ? "h-2 w-[200px]" : "h-3 w-[300px]",
        wrapClassName
      )}
    >
      <div
        className={cn(
          "absolute left-[1px] top-[1px] rounded-full bg-gradient-to-r from-[#59ECC5] to-[#FFCE42]",
          size === "md" ? "h-1.5 w-[200px]" : "h-[10px] w-[300px]",
          barClassName
        )}
        style={{ width: `${ratio * 100}%` }}
      ></div>
    </div>
  );
}
