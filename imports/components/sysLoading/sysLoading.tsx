import React from "react";
import Typography, { TypographyProps } from "@mui/material/Typography";
import LoadingStyle from "./sysLoadingStyle";
import { SxProps, Theme } from "@mui/material";
import { useTranslation } from "react-i18next";

const { Container, Loading } = LoadingStyle;

/**
 * Props para o componente SysLoading.
 */
interface ISysLoading {
	/** O rótulo a ser exibido embaixo do indicador de carregamento. */
	label?: string;
	withLabel?: boolean;
	/** O tamanho do indicador de carregamento. */
	size?: "small" | "medium" | "large";
	/** Mapeamento de estilos personalizados para o componente e seus elementos filhos. */
	sxMap?: {
		/** Estilos personalizados para o container principal. */
		container?: SxProps<Theme>;
		/** Estilos personalizados para o indicador de carregamento. */
		loading?: SxProps<Theme>;
	};
	typographyProps?: TypographyProps;
}

/**
 * O componente `SysLoading` é um componente React personalizado que exibe um indicador de carregamento.
 *
 * Notas:
 * - O componente pode exibir um rótulo opcional ao lado do indicador de carregamento.
 * - O tamanho do indicador de carregamento pode ser ajustado através da propriedade `size`.
 * - Estilos personalizados podem ser fornecidos através da propriedade `sxMap`.
 */
export const SysLoading: React.FC<ISysLoading> = ({ withLabel, label, size = "medium", sxMap, typographyProps }) => {
	const { t } = useTranslation("common");
	if (!label && withLabel) {
		label = t("generics.action.loading");
	}
	return (
		<Container sx={sxMap?.container}>
			<Loading sx={sxMap?.loading} size={size} />
			{label && (
				<Typography
					variant={size === "small" ? "caption" : "body1"}
					color={(theme) => theme.palette.sysText?.primary}
					{...typographyProps}>
					{label}
				</Typography>
			)}
		</Container>
	);
};
