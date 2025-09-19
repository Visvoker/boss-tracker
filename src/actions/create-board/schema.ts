import z from "zod";

export const CreateBoard = z.object({
  title: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Title is required" : "Not a string",
    })
    .min(3, { error: "Title is too short." }),
});
