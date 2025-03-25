import React, { ReactNode } from "react";
import Styles from "./baseUserEmailsStyles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

interface IBaseEmailsProps {
	title?: string;
	children?: ReactNode;
}

const BaseUserEmails: React.FC<IBaseEmailsProps> = ({ title = "Olá, ", children }) => {
	return (
		<Styles.container>
			<Box sx={{ textAlign: "center" }}>
				<img
					src="https://i.postimg.cc/7Zjqm6k4/slogan-neon-preta-vertical.png"
					alt="Synergia Logo"
					style={{ maxWidth: "270px" }}
				/>
			</Box>
			<Styles.content>
				<Typography variant="h3" sx={{ mb: 2 }}>
					{title}
				</Typography>
				{children && children}
			</Styles.content>
			<Styles.footer>
				<Typography variant="body2" color="textSecondary">
					Se você não solicitou este email, ignore esta mensagem.
				</Typography>
				<Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
					Precisa de ajuda? Acesse nossa <Link href="https://www.synergia.dcc.ufmg.br/">Central de Suporte</Link>.
				</Typography>
				<Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
					&copy; {new Date().getFullYear()} Synergia. Todos os direitos reservados.
				</Typography>
			</Styles.footer>
		</Styles.container>
	);
};

export default BaseUserEmails;
