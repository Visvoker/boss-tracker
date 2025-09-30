import { z } from "zod";

export const CreateChannel = z.object({
  bossId: z.string().min(1, "Boss is required"),
  channel: z.coerce.number().int().min(1, { message: "Channel is required" }),
});
