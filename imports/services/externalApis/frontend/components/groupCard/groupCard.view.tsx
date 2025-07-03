import React from "react";
import Styles from "./groupCard.styles";
import { Group } from "@microsoft/microsoft-graph-types";
import { Checkbox, Typography } from "@mui/material";
import SysLabelView from "/imports/components/sysLabelView/sysLabelView";
import { useTranslation } from "react-i18next";
import SysIcon from "/imports/components/sysIcon/sysIcon";
import SysTextOverflow from "/imports/components/layoutComponents/sysTextOverflow";
import { hasValue } from "/imports/libs/hasValue";

interface IProps extends Group {
	totalMembers?: number;
	checked?: boolean;
	onChange?: (event?: React.ChangeEvent<HTMLInputElement>, checked?: boolean) => void;
	readonly?: boolean;
}

const GroupCard: React.FC<IProps> = ({ displayName, totalMembers, checked, onChange, readonly }) => {
	const { t } = useTranslation("ExternalApiService");
	return (
		<Styles.container>
			{!readonly && <Checkbox checked={checked} onChange={onChange} />}
			<SysLabelView label={t("components.groupCard.nameLabel")}>
				<SysTextOverflow maxLines={1}>{displayName}</SysTextOverflow>
			</SysLabelView>
			{hasValue(totalMembers) && (
				<Styles.groupIconContainer>
					<SysIcon name="groupsFilled" />
					<Typography variant="body2" color="text.secondary">
						{totalMembers || 0}
					</Typography>
				</Styles.groupIconContainer>
			)}
		</Styles.container>
	);
};

export default GroupCard;
