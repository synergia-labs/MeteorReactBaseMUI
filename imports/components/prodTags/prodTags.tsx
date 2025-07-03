import React from "react";
import { enumAutonomy } from "/imports/enums/autonomy";
import { enumAlertPriority } from "/imports/modules/alerts/common/enums/alertPriority";
import Styles from "./prodTags.styles";
import { BoxProps, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface IProps extends BoxProps {
	variant: enumAutonomy | enumAlertPriority | "default";
	disabled?: boolean;
}

export default function ProdTags({ variant, disabled, ...otherProps }: IProps) {
	const { t } = useTranslation("common");
	const isAutonomy = Object.values(enumAutonomy).includes(variant as any);
	return (
		<Styles.container variant={variant} isAutonomy={isAutonomy} disabled={disabled} {...otherProps}>
			<Typography variant="caption2">{t(`components.prodTags.${variant}`)}</Typography>
		</Styles.container>
	);
}
