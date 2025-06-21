import z from "zod";

export const logActivitySchema = z.object({
  text: z.string().min(3, "Text is required and must be meaningful"),
});
