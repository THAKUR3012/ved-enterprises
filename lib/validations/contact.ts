import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(100, { message: "Name cannot exceed 100 characters." }),
  phone: z
    .string()
    .min(10, { message: "Please provide a valid 10-digit phone number." })
    .max(15, { message: "Phone number is too long." })
    .regex(/^[0-9+\-\s]+$/, { message: "Phone number contains invalid characters." }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .min(3, { message: "Subject must be at least 3 characters long." })
    .max(200, { message: "Subject cannot exceed 200 characters." }),
  message: z
    .string()
    .min(5, { message: "Message must be at least 5 characters long." })
    .max(1000, { message: "Message cannot exceed 1000 characters." }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
