import { z } from "zod";

export const DeleteChannel = z.object({
  id: z.string(),
});
