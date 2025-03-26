import React from "react";
import styled from "@mui/material/styles/styled";
import Box, { BoxProps } from "@mui/material/Box";
import { FilesViewType } from "../acceptableTypes";
import { sysSizes } from "../../../../theme/sizes";

interface ISysUploadFileStyle {
	container: React.ComponentType<ICardStyle>;
}
interface ICardStyle extends BoxProps {
	typeview: FilesViewType;
	ismultiple: string;
}

const SysUploadFileStyle: ISysUploadFileStyle = {
	container: styled(Box)<ICardStyle>(({ typeview, ismultiple, theme }) => ({
		width: "100%",
		...(ismultiple == "true"
			? {
					...(typeview == "row"
						? { display: "flex", flexDirection: "row", overflowX: "auto" }
						: typeview == "column"
							? { display: "flex", flexDirection: "column" }
							: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))" })
				}
			: {
					display: "flex",
					justifyContent: "center"
				}),
		gap: sysSizes.spacingRem.xs,
		padding: sysSizes.spacingRem.xs,
		...(ismultiple === "true" ? { minHeight: "100px" } : {})
	}))
};

export default SysUploadFileStyle;
