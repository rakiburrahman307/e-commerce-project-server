const { z } = require("zod");

const createUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .max(50, "Name must not exceed 50 characters"),
    email: z
      .string()
      .email("Invalid email address")
      .max(100, "Email must not exceed 100 characters"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(30, "Password must not exceed 30 characters"),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
    gender: z.enum(["male", "female", "other"], "Invalid gender"),

    address: z
      .object({
        street: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        postalCode: z.string().optional(),
        country: z.string().optional(),
      })
      .optional(),
  }),
});
const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required.' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const userZodValidation= {
  createUserValidationSchema,
  loginValidationSchema
}
module.exports = userZodValidation;