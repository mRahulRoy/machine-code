import { z } from "zod";
export type LoginInput = z.infer<typeof loginSchema>;

const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters"),
});

export const validateLoginForm = (data: unknown) => {
    return loginSchema.safeParse(data);
};