"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { UpdateChannel } from "./schema";
import { InputType, ReturnType } from "./type";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    return { error: "Unauthorized" };
  }

  const { id } = data;

  let bossLog;

  try {
    bossLog = await db.bossLog.update({
      where: { id },
      data: {
        createdAt: new Date(),
      },
    });
  } catch (_error) {
    return {
      error: "Failed to update.",
    };
  }

  revalidatePath(`/organization/${orgId}`);
  return { data: bossLog };
};

export const updateChannel = createSafeAction(UpdateChannel, handler);
