import z from "zod";

import { BossLog } from "@/generated/prisma";
import { ActionState } from "@/lib/create-safe-action";

import { DeleteChannel } from "./schema";

export type InputType = z.infer<typeof DeleteChannel>;
export type ReturnType = ActionState<InputType, BossLog>;
