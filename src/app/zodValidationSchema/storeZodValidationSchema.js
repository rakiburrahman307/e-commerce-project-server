const { z } = require("zod");

const storeValidationSchema = z.object({
  userId: z.string(),
  storeName: z
    .string()
    .min(1, "Store name is required")
    .max(100, "Store name must not exceed 100 characters"),
  storeDescription: z
    .string()
    .max(500, "Store description must not exceed 500 characters")
    .optional(),
  storeLogo: z.string().url("Invalid store logo URL").optional(),
  storeAddress: z
    .object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      postalCode: z.string().optional(),
      country: z.string().optional(),
    })
    .optional(),
  storeRating: z
    .number()
    .min(0, "Store rating must be at least 0")
    .max(5, "Store rating must not exceed 5")
    .optional(),
});

module.exports = storeValidationSchema;
