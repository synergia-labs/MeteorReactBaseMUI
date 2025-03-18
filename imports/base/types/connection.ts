import { z } from "zod";

export const connectionSchema = z.object({
    id: z.string(),
    close: z.function().args().returns(z.void()),
    onClose: z.function().args().returns(z.void()),
    clientAddress: z.string(),
    httpHeaders: z.record(z.string(), z.any()),
});

export type ConnectionType = z.infer<typeof connectionSchema>;