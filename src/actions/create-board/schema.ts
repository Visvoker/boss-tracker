import z from "zod";

export const CreateBoard = z.object({
  title: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Title is required" : "Not a string",
    })
    .min(1, { error: "Title is required" }),
});
