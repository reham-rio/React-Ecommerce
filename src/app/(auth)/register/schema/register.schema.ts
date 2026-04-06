import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be less than 20 characters"),

    email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email address"),

    password: z
      .string()
      .nonempty("Password is required")
      .min(6, "Password must be at least 6 characters")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d).+$/,
        "Password must contain at least one letter and one number"
      ),

    rePassword: z.string().nonempty("Confirm password is required"),

phone: z
  .string()
  .nonempty("Phone is required")
  .regex(/^01[0-9]{9}$/, "Enter valid Egyptian phone number")
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

  export type registerSchemaType = z.infer<typeof registerSchema>