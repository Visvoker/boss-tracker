import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getBosses } from "@/server/get-bosses";

import { cn } from "@/lib/utils";

type FormPickerProps = {
  errors?: Record<string, string[] | undefined>;
};

export async function FormPicker({ errors }: FormPickerProps) {
  const { orgId } = await auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const bosses = await getBosses();

  return (
    <div>
      <p className="text-xs font-semibold text-neutral-700 pb-3">Boss list</p>
      {bosses.map((boss) => (
        <div
          key={boss.id}
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
        </div>
      ))}
    </div>
  );
}
