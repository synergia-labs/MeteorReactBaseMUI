import React, { useContext } from "react";
import Styles from "./translate.styles";
import Context, { ITranslatePageContext } from "./translate.context";
import { i18nResources } from "../../..";
import { RichTreeView } from "@mui/x-tree-view";
import convertResourceToTreeViewBase from "../../../utils/convertResourcesToTreeViewBase";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import TranslateItem from "../../components/translateItem/translateItem.view";
import enumSupportedLanguages from "../../../common/enum/supportedLanguages";
import Textfield from "@mui/material/TextField";
import SysIcon from "/imports/components/sysIcon/sysIcon";
import IconButton from "@mui/material/IconButton";
import { SysFab } from "/imports/components/sysFab/sysFab";
import Zoom from "@mui/material/Zoom";

const TranslatePageView: React.FC = () => {
	const context = useContext<ITranslatePageContext>(Context);
	const { t } = useTranslation("internationalization");

	return (
		<Styles.container hasChanges={context.hasChanges}>
			<Styles.header>
				<Typography variant="h5" sx={{ textWrap: "nowrap" }}>
					{t("pages.translate.title")}
				</Typography>
				<Textfield
					placeholder={t("pages.translate.searchPlaceholder")}
					InputProps={{
						startAdornment: <SysIcon name="search" />,
						endAdornment: context.searchText && (
							<IconButton onClick={() => context.setSearchText("")}>
								<SysIcon name="close" />
							</IconButton>
						)
					}}
					disabled={context.selectedItem == undefined}
					value={context.searchText}
					onChange={(e) => context.setSearchText(e.target.value)}
				/>
				<Typography variant="h5" sx={{ opacity: 0, textWrap: "nowrap" }}>
					{t("pages.translate.title")}
				</Typography>
			</Styles.header>
			<Styles.content>
				<Styles.treeViewContainer>
					<RichTreeView
						items={convertResourceToTreeViewBase(i18nResources.pt)}
						onItemSelectionToggle={context.handleItemSelectionToggle}
					/>
				</Styles.treeViewContainer>
				{context.selectedItem == undefined ? (
					<Typography sx={{ m: "32px auto" }}>{t("pages.translate.empty")}</Typography>
				) : (
					<Styles.translateContent>
						<Styles.translateContentHeader>
							<Typography variant="subtitle1" sx={{ flex: 1.5 }} textAlign="center">
								{t("pages.translate.identificator")}
							</Typography>
							{Object.values(enumSupportedLanguages).map((lang) => (
								<Typography key={lang} variant="subtitle1" sx={{ flex: 1 }} textAlign="center">
									{t(`languages.${lang}`)}
								</Typography>
							))}
						</Styles.translateContentHeader>
						{context.translatedItems.map((item) => (
							<TranslateItem
								key={item.label + context.deletedKeys[`${context.selectedItem}.${item.label}`]}
								{...item}
								onChange={context.onChangeTextField}
								deletedKeys={context.deletedKeys[`${context.selectedItem}.${item.label}`]}
							/>
						))}
					</Styles.translateContent>
				)}
			</Styles.content>
			<Zoom in={context.hasChanges}>
				<SysFab
					onClick={context.exportFile}
					fixed
					startIcon={<SysIcon name="download" />}
					text={t("pages.translate.exportButtonMessage")}
				/>
			</Zoom>
		</Styles.container>
	);
};

export default TranslatePageView;
