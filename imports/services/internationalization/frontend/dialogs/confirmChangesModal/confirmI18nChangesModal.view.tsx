import React, { useContext } from "react";
import Styles from "./confirmI18nChangesModal.styles";
import { useTranslation } from "react-i18next";
import { Box, Button, Typography } from "@mui/material";
import SysIcon from "/imports/components/sysIcon/sysIcon";
import diffObjects from "../../../../../libs/compare/diffObjects";
import exportJsonFile from "/imports/libs/export/json";
import LayoutContext, { IAppLayoutContext } from "/imports/app/appLayoutProvider/appLayoutContext";
import SysTextOverflow from "/imports/components/layoutComponents/sysTextOverflow";

interface IProps {
	originalObject: Record<string, any>;
	editedObject: Record<string, any>;
}

const ConfirmI18nChangesModal: React.FC<IProps> = ({ originalObject, editedObject }) => {
	const { t } = useTranslation(["internationalization", "common"]);
	const { closeModal } = useContext<IAppLayoutContext>(LayoutContext);

	const { deletedKeys, ...originalWithoutDeleted } = originalObject;
	const { deletedKeys: _, ...editedWithoutDeleted } = editedObject;

	const { changedValues, totalChanges, addedValues } = diffObjects(originalWithoutDeleted, editedWithoutDeleted);
	const handleConfirm = () => {
		exportJsonFile(
			{
				...editedObject,
				addedValues: addedValues,
				changedValues: changedValues
			},
			"tacito_translate.json"
		);
		closeModal();
	};

	return (
		<Styles.container>
			<Typography variant="h5">{t("dialogs.confirmChanges.title")}</Typography>
			<Styles.body>
				<Typography>{t("dialogs.confirmChanges.message", { totalChanges })}</Typography>
				<Styles.table.container>
					<Styles.absolute.container>
						<Box sx={{ flex: 1.5 }} />
						<Styles.absolute.changeContainer sx={{ flex: 1, backgroundColor: (theme) => theme.palette.error.main }} />
						<Styles.absolute.changeContainer sx={{ flex: 1, backgroundColor: (theme) => theme.palette.success.main }} />
					</Styles.absolute.container>
					<Styles.table.header>
						<Typography textAlign={"center"} sx={{ flex: 1.5 }}>
							{t("dialogs.confirmChanges.table.header.identificator")}
						</Typography>
						<Typography variant="subtitle1" textAlign={"center"} sx={{ flex: 1, pl: 1, pr: 1 }}>
							{t("dialogs.confirmChanges.table.header.before")}
						</Typography>
						<Typography variant="subtitle1" textAlign={"center"} sx={{ flex: 1, pl: 1, pr: 1 }}>
							{t("dialogs.confirmChanges.table.header.after")}
						</Typography>
					</Styles.table.header>
					<Styles.table.body>
						{changedValues.map((item) => (
							<Styles.translateItem key={item.key}>
								<SysTextOverflow maxLines={3} sx={{ flex: 1.5, pr: 1 }}>
									{item.key}
								</SysTextOverflow>
								<Typography sx={{ flex: 1 }}>{item.valueBase}</Typography>
								<Typography sx={{ flex: 1 }}>{item.valueCompare}</Typography>
							</Styles.translateItem>
						))}
						{addedValues.map((item) => (
							<Styles.translateItem key={item.key}>
								<SysTextOverflow maxLines={3} sx={{ flex: 1.5, pr: 1 }}>
									{item.key}
								</SysTextOverflow>
								<Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
									<SysIcon name="close" sx={{ m: "auto" }} />
								</Box>
								<Typography sx={{ flex: 1 }}>{item.value}</Typography>
							</Styles.translateItem>
						))}
					</Styles.table.body>
				</Styles.table.container>
			</Styles.body>
			<Styles.footer>
				<Button onClick={closeModal} variant="outlined">
					{t("generics.action.cancel", { ns: "common" })}
				</Button>
				<Button onClick={handleConfirm} startIcon={<SysIcon name="download" />}>
					{t("generics.action.confirm", { ns: "common" })}
				</Button>
			</Styles.footer>
		</Styles.container>
	);
};

export default ConfirmI18nChangesModal;
