import React, { Fragment, useRef } from "react";
import Styles from "./changeLanguageComponent.styles";
import SysIcon from "/imports/components/sysIcon/sysIcon";
import SysMenuItemDefault from "/imports/components/sysMenu/components/sysMenuItemDefault";
import SysMenuProvider, { ISysMenuItem, ISysMenuRef } from "/imports/components/sysMenu/sysMenuProvider";
import { MenuProps } from "@mui/material/Menu";
import { useTranslation } from "react-i18next";
import enumSupportedLanguages from "../../../common/enum/supportedLanguages";
import { typedObjectValues } from "/imports/libs/object/typed";

interface IChangeLanguageComponent {
	anchorOrigin?: MenuProps["anchorOrigin"];
	transformOrigin?: MenuProps["transformOrigin"];
	customOnChange?: (language: enumSupportedLanguages) => void;
	language?: enumSupportedLanguages;
}

const ChangeLanguageComponent: React.FC<IChangeLanguageComponent> = ({
	anchorOrigin,
	transformOrigin,
	customOnChange,
	language
}) => {
	const subMenuRef = useRef<ISysMenuRef | null>(null);
	const { t, i18n } = useTranslation("internationalization");

	const selectedLanguage = language ?? i18n.language;

	const menuOptions: Array<ISysMenuItem> = typedObjectValues(enumSupportedLanguages).map((lang) => ({
		key: lang,
		otherProps: {
			label: t(`languages.${lang}`),
			endIcon: <SysIcon name={lang} sx={{ width: "24px", mt: 1.5 }} />,
			disabled: selectedLanguage === lang,
			onClick: () => {
				customOnChange ? customOnChange(lang) : i18n.changeLanguage(lang);
				subMenuRef.current?.closeMenu();
			}
		}
	}));

	return (
		<Styles.container>
			<Fragment>
				<SysMenuItemDefault
					key="label"
					label={t(`languages.${selectedLanguage}`)}
					sx={{ height: "41px" }}
					onClick={(e) => subMenuRef.current?.openMenu(e)}
					endIcon={<SysIcon name={selectedLanguage} sx={{ width: "24px", mt: 1.5 }} />}
				/>
				<SysMenuProvider
					ref={subMenuRef}
					anchorOrigin={anchorOrigin}
					transformOrigin={transformOrigin}
					options={menuOptions}
				/>
			</Fragment>
		</Styles.container>
	);
};

export default ChangeLanguageComponent;
