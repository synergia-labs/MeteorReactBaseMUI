import React from "react";
import Styles from "./baseErrorPage.styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SysIcon from "../../../../../../components/sysIcon/sysIcon";
import { MaterialSymbolsIconsNamesType } from "../../../../../../components/sysIcon/materialSymbolsIcons";
import { useNavigate } from "react-router-dom";

interface IBaseErrorPageProps {
	codeError: string;
	errorTitle: string;
	errorDescription: string;
	buttonText?: string;
	buttonIconName?: MaterialSymbolsIconsNamesType;
	onButtonClick?: () => void;
}

const BaseErrorPage: React.FC<IBaseErrorPageProps> = ({
	codeError,
	errorTitle,
	errorDescription,
	buttonText = "Voltar à página inicial",
	buttonIconName = "arrowBack",
	onButtonClick
}) => {
	const navigate = useNavigate();
	const onClick = () => onButtonClick ?? navigate("/");

	return (
		<Styles.container>
			<Styles.header>
				<Typography variant="h1">{codeError}</Typography>
				<Styles.divider />
				<Typography variant="h6">{errorTitle}</Typography>
			</Styles.header>
			<Styles.body>
				<Typography variant="body2" color={(theme) => theme.palette.sysText?.auxiliary} textAlign={"center"}>
					{errorDescription}
				</Typography>
				<Button startIcon={<SysIcon name={buttonIconName} />} onClick={onClick}>
					{buttonText}
				</Button>
			</Styles.body>
		</Styles.container>
	);
};

export default BaseErrorPage;
export type { IBaseErrorPageProps };
