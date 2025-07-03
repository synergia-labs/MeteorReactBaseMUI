import { z } from "zod";

const sendUserEmailSchema = z.object({
	email: z.string().email().optional(),
	_id: z.string().optional()
});

type SendUserEmailType = z.infer<typeof sendUserEmailSchema>;
export default SendUserEmailType;
export { sendUserEmailSchema };
