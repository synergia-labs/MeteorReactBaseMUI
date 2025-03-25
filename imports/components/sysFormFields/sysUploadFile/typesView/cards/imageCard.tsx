import React, { useState } from "react";
import Styles from "./cardStyles";
import { IFileCard } from "./interfaces";
import { Button } from "@mui/material";
import { hasValue } from "/imports/libs/hasValue";

export function ImageCard({ item, sxMap, viewType = "row", canEdit = true, onRemove }: IFileCard) {
	const [imageSrc, setImageSrc] = useState<string>();

	// Gerar URL da imagem
	if (item && !imageSrc && !!item.file) {
		const objectUrl = URL.createObjectURL(item.file);
		setImageSrc(objectUrl);
	} else if (item && !imageSrc && !!item.url) {
		setImageSrc(item.url);
	}

	return (
		<Styles.individualCard.container sx={sxMap?.card} url={imageSrc} canedit={canEdit.toString()}>
			{!hasValue(item.file) && !hasValue(item.url) && !canEdit && (
				<Styles.individualCard.alt variant="h1">{item.alt}</Styles.individualCard.alt>
			)}
			{canEdit && (
				<Styles.individualCard.body>
					<Button
						variant="text"
						startIcon={<Styles.deleteIcon canedit={canEdit.toString()} typeview={viewType} withposition="false" />}
						onClick={() => canEdit && onRemove()}>
						Excluir imagem
					</Button>
				</Styles.individualCard.body>
			)}
		</Styles.individualCard.container>
	);
}
