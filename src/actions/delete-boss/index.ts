"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { DeleteChannel } from "./schema";
import { InputType, ReturnType } from "./type";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    return { error: "Unauthorized" };
  }

  const { id } = data;

  let bossLog;

  try {
    bossLog = await db.bossLog.delete({
      where: {
        orgId,
        id,
      },
    });
  } catch (_error) {
    return {
      error: "Failed to create.",
    };
  }

  revalidatePath(`/organization/${orgId}`);
  return { data: bossLog };
};

export const deleteChannel = createSafeAction(DeleteChannel, handler);
