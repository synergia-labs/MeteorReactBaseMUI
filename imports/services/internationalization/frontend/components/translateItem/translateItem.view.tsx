import React, { useContext } from "react";
import enumSupportedLanguages from "../../../common/enum/supportedLanguages";
import Styles from "./translateItem.styles";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import SysTextOverflow from "/imports/components/layoutComponents/sysTextOverflow";
import { IconButton, Tooltip, Typography } from "@mui/material";
import SysIcon from "/imports/components/sysIcon/sysIcon";
import LayoutContext, { IAppLayoutContext } from "/imports/app/appLayoutProvider/appLayoutContext";
import TranslateModal from "../../dialogs/translate/translateModal.view";

type SupportedLanguageValuesType = (typeof enumSupportedLanguages)[keyof typeof enumSupportedLanguages];

interface ITranslateItemProps {
	label: string;
	onChange: (language: string, relativePath: string, value: string) => void;
	deletedKeys?: Array<string>;
}
export type TranslateItemPropsType = ITranslateItemProps & {
	[key in SupportedLanguageValuesType]: string;
};

const TranslateItem: React.FC<TranslateItemPropsType> = ({ label, onChange, deletedKeys, ...props }) => {
	const { t } = useTranslation("internationalization");
	const { showModal } = useContext<IAppLayoutContext>(LayoutContext);

	const suggestTranslation = () =>
		showModal({
			children: (
				<TranslateModal
					text={props[enumSupportedLanguages.PT]}
					to={enumSupportedLanguages.EN}
					from={enumSupportedLanguages.PT}
				/>
			)
		});

	return (
		<Styles.contaienr>
			<Styles.textContainer sx={{ flex: 1.5 }}>
				<SysTextOverflow maxLines={3} sx={{ textWrap: "wrap" }}>
					{label}
				</SysTextOverflow>
				{!!deletedKeys?.length && deletedKeys?.length > 0 && (
					<Typography variant="caption">
						{t("components.translateItem.deletedKeys", { deletedKeys: deletedKeys?.join(", ") })}
					</Typography>
				)}
			</Styles.textContainer>
			{Object.values(enumSupportedLanguages).map((lang) => (
				<TextField
					sx={{ flex: 1, flexShrink: 0, minWidth: "300px" }}
					key={lang}
					defaultValue={props[lang]}
					multiline
					placeholder={t("components.translateItem.notSpecified")}
					minRows={3}
					maxRows={3}
					onChange={(e) => {
						const value = e.target.value;
						if (value === props[lang]) return;
						onChange(lang, label, value);
					}}
				/>
			))}
			<Tooltip title={t("components.translateItem.translateTooltip")}>
				<IconButton onClick={suggestTranslation}>
					<SysIcon name="public" />
				</IconButton>
			</Tooltip>
		</Styles.contaienr>
	);
};

export default TranslateItem;
