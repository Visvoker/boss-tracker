import z from "zod";

import { BossLog } from "@/generated/prisma";
import { ActionState } from "@/lib/create-safe-action";

import { UpdateChannel } from "./schema";

export type InputType = z.infer<typeof UpdateChannel>;
export type ReturnType = ActionState<InputType, BossLog>;
