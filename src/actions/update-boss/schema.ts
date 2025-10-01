import { z } from "zod";

export const UpdateChannel = z.object({
  id: z.string(),
});
