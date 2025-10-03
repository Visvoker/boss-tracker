"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function BossOptions() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>123</Button>
      </PopoverTrigger>
    </Popover>
  );
}
