"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { X } from "lucide-react";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { useAction } from "@/hooks/use-actions";
import { createChannel } from "@/actions/create-boss";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { cn } from "@/lib/utils";

type BossOption = { id: string; name: string; imageUrl: string };

type FormPopoverProps = {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  bosses: BossOption[];
};

export function FormPopover({
  children,
  bosses,
  side = "bottom",
  align = "start",
  sideOffset = 0,
}: FormPopoverProps) {
  const [selectedBossId, setSelectedBossId] = useState<string>("");

  const { execute, fieldErrors } = useAction(createChannel, {
    onSuccess: (data) => {
      console.log({ data });
      toast.success("Boss created!");
    },
    onError: (error) => {
      console.log({ error });
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const channelString = formData.get("channel");
    const bossId = formData.get("bossId");

    if (typeof channelString !== "string" || typeof bossId !== "string") return;

    const channel = Number(channelString); // <-- 這邊轉型

    execute({
      channel,
      bossId,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className="w-100 pt-3 "
        align={align}
        side={side}
        sideOffset={sideOffset}
      >
        <div className="font-semibold text-center text-neutral-600 pb-4">
          Create tracker
        </div>
        <div>
          <p className="text-xs font-semibold text-neutral-700 pb-3">
            Boss list
          </p>
          <ToggleGroup
            type="single"
            value={selectedBossId}
            onValueChange={(value) => setSelectedBossId(value || "")}
            className="flex flex-wrap gap-3"
          >
            {bosses.map((boss) => (
              <ToggleGroupItem
                key={boss.id}
                value={boss.id}
                className={cn(
                  "rounded-sm transition hover:opacity-50 cursor-pointer p-2",
                  "data-[state=on]:ring-1 data-[state=on]:ring-sky-700 data-[state=on]:border-sky-700 bg-none"
                )}
              >
                <Image
                  src={boss.imageUrl}
                  alt={boss.name}
                  width={140}
                  height={140}
                  className="rounded"
                />
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form className="space-y-4 pt-5" action={onSubmit}>
          <input type="hidden" name="bossId" value={selectedBossId} />
          <div className="space-y-4">
            <FormInput
              id="channel"
              label="Channel"
              type="number"
              errors={fieldErrors}
            />
            <FormSubmit className="w-full" disabled={!selectedBossId}>
              Create
            </FormSubmit>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
