import React from "react";
import Styles from "./simpleEmailTemplate.styles";
import Typography from "@mui/material/Typography";

interface ISimpleEmailTemplateProps {
	title?: string;
	message: string;
	footer?: string;
}

const SimpleEmailTemplate: React.FC<ISimpleEmailTemplateProps> = ({ title, message, footer }) => {
	return (
		<Styles.wrapper>
			<Styles.container>
				{title && <Typography variant="h3">{title}</Typography>}
				<Styles.body>
					<Typography>{message}</Typography>
				</Styles.body>
				{footer && <Typography variant="body2">{footer}</Typography>}
			</Styles.container>
		</Styles.wrapper>
	);
};

export default SimpleEmailTemplate;
