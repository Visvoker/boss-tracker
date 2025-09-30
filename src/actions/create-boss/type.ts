import z from "zod";

import { BossLog } from "@/generated/prisma";
import { ActionState } from "@/lib/create-safe-action";

import { CreateChannel } from "./schema";

export type InputType = z.infer<typeof CreateChannel>;
export type ReturnType = ActionState<InputType, BossLog>;
