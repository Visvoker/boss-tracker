"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { CreateChannel } from "./schema";
import { InputType, ReturnType } from "./type";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    return { error: "Unauthorized" };
  }

  const { channel, bossId } = data;

  let bossLog;

  try {
    bossLog = await db.bossLog.create({
      data: {
        channel,
        bossId,
        orgId,
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

export const createChannel = createSafeAction(CreateChannel, handler);
