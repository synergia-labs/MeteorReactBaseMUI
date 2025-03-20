import { z } from "zod";

export const resetUserPasswordSchema = z.object({
	token: z.string().nonempty("Necessário token para resetar a senha"),
	newPassword: z.string().min(6, "Senha deve ter no mínimo 6 caracteres").nonempty("Necessário nova senha")
});

export type ResetUserPasswordType = z.infer<typeof resetUserPasswordSchema>;
