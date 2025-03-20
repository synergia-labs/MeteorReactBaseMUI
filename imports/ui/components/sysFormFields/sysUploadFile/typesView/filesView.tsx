import React from "react";
import { ITypesView } from "./interfaces";
import Styles from "./typesViewStyles";
import { FileCardWithIcons } from "./cards/fileCardWithIcon";
import { ImageCard } from "./cards/imageCard";
import { IFile } from "./cards/interfaces";

function FilesView({
	files,
	sxMap,
	viewType = "row",
	canEdit = true,
	onRemove,
	isMultiple
}: ITypesView & { isMultiple?: boolean }) {
	return (
		<Styles.container typeview={viewType} ismultiple={(!!isMultiple).toString()}>
			{files.map((item: IFile, idx: number) => {
				return (
					<div key={(item?.alt ?? "xs") + idx}>
						{isMultiple
							? FileCardWithIcons({
									item,
									sxMap,
									viewType,
									canEdit,
									onRemove: () => onRemove(idx)
								})
							: item?.type === "image"
								? ImageCard({
										item,
										sxMap,
										viewType,
										canEdit,
										onRemove: () => onRemove(idx)
									})
								: FileCardWithIcons({
										item,
										sxMap,
										viewType,
										canEdit,
										onRemove: () => onRemove(idx)
									})}
					</div>
				);
			})}
		</Styles.container>
	);
}

export default FilesView;
