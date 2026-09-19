import { z } from "zod";

export const bookingSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full Name must be at least 2 characters long." })
    .max(100, { message: "Full Name cannot exceed 100 characters." }),
  phone: z
    .string()
    .min(10, { message: "Please enter a valid 10-digit phone number." })
    .max(15, { message: "Phone number is too long." })
    .regex(/^[0-9+\-\s]+$/, { message: "Phone number contains invalid characters." }),
  whatsapp: z
    .string()
    .optional()
    .or(z.literal("")),
  address: z
    .string()
    .min(5, { message: "Please enter your complete address/locality." })
    .max(255, { message: "Address cannot exceed 255 characters." }),
  applianceType: z
    .string()
    .min(1, { message: "Please select the appliance type." }),
  serviceRequired: z
    .string()
    .min(1, { message: "Please select the service required." }),
  problemDescription: z
    .string()
    .min(5, { message: "Please briefly describe the problem (at least 5 characters)." })
    .max(1000, { message: "Problem description is too long." }),
  preferredDate: z
    .string()
    .min(1, { message: "Please pick your preferred service date." }),
  preferredTime: z
    .string()
    .min(1, { message: "Please choose your preferred time slot." }),
  additionalMessage: z
    .string()
    .max(500, { message: "Additional message cannot exceed 500 characters." })
    .optional()
    .or(z.literal("")),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
