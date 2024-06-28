import * as z from 'zod';

export const FromRoomAvailabilityPriceSchema = z.object({
  id: z
    .string()
    .min(1, {
      message: "A room is required"
    })
    .trim(),
  fromDate: z.date({
    required_error: "A from date is required.",
  }),
  toDate: z.date({
    required_error: "A to date is required.",
  }),
});
