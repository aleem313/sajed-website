import { z } from "zod";

export const sendMessageSchema = z.object({
  conversationId: z.string().min(1).optional(),
  listingId: z.string().min(1),
  recipientId: z.string().min(1),
  content: z.string().trim().min(1, "Message cannot be empty").max(5000, "Message is too long"),
});

export type SendMessageInput = z.infer<typeof sendMessageSchema>;
