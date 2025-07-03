import React from "react";
import { ButtonBaseProps, Typography } from "@mui/material";
import Styles from "./prodButtonAutonomy.styles";
import SysIcon from "../sysIcon/sysIcon";
import { enumAutonomy } from "/imports/enums/autonomy";
import { useTranslation } from "react-i18next";

interface IProdButtonAutonomyProps extends ButtonBaseProps {
	autonomy: enumAutonomy;
	average?: number;
	showAverage?: boolean;
}

export default function ProdButtonAutonomy({
	autonomy,
	average = 0,
	showAverage,
	...otherProps
}: IProdButtonAutonomyProps) {
	const { t } = useTranslation("common");

	return (
		<Styles.container autonomy={autonomy} {...otherProps}>
			{showAverage && (
				<Styles.alertCountContainer autonomy={autonomy}>
					<Typography variant="subtitle1">{average.toFixed(0)}</Typography>
				</Styles.alertCountContainer>
			)}
			<Typography variant="subtitle1" sx={{ flex: 1 }}>
				{t(`components.buttonAutonomy.${autonomy}`)}
			</Typography>
			<SysIcon name="chevronRight" />
		</Styles.container>
	);
}
