import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type HintProps = {
  children: React.ReactNode;
  description: string;
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: number;
};

export function Hint({
  children,
  description,
  side = "bottom",
  sideOffset,
}: HintProps) {
  return (
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent
        sideOffset={sideOffset}
        side={side}
        className="text-xs max-w-[220px] break-words"
      >
        {description}
      </TooltipContent>
    </Tooltip>
  );
}
