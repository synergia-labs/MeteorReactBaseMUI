import React from "react";
import LibraryBooks from "@mui/icons-material/LibraryBooks";
import LibraryMusic from "@mui/icons-material/LibraryMusic";
import VideoLibrary from "@mui/icons-material/VideoLibrary";
import AttachFile from "@mui/icons-material/AttachFile";
import Book from "@mui/icons-material/Book";
import Image from "@mui/icons-material/Image";

import Styles from "./cardStyles";
import { IFileCard } from "./interfaces";

function getIcon(type: string, sxIcon?: any) {
	switch (type) {
		case "text":
			return <LibraryBooks color="primary" sx={sxIcon} />;
		case "audio":
			return <LibraryMusic color="primary" sx={sxIcon} />;
		case "image":
			return <Image color="primary" sx={sxIcon} />;
		case "video":
			return <VideoLibrary color="primary" sx={sxIcon} />;
		case "application":
			return <Book color="primary" sx={sxIcon} />;
		default:
			return <AttachFile color="primary" sx={sxIcon} />;
	}
}

export function FileCardWithIcons({ item, sxMap, viewType = "row", canEdit = true, onRemove }: IFileCard) {
	const size = item?.file ? `${(item?.file?.size / (1024 * 1024)).toFixed(3)}MB` : "unknown";

	return (
		<Styles.card sx={sxMap?.card} typeview={viewType}>
			<Styles.withIcons.iconCircleBox sx={sxMap?.boxIcon} typeview={viewType}>
				{getIcon(item?.type, sxMap?.icon)}
			</Styles.withIcons.iconCircleBox>

			<Styles.withIcons.cardInfo typeview={viewType}>
				<Styles.title variant="body2" sx={sxMap?.title} title={item?.alt}>
					{item?.alt}
				</Styles.title>
				<Styles.subtitle variant="caption" sx={sxMap?.subtitle} title={size}>
					{size}
				</Styles.subtitle>
			</Styles.withIcons.cardInfo>

			<Styles.withIcons.iconsGroup typeview={viewType}>
				<Styles.deleteIcon
					canedit={(!!canEdit).toString()}
					typeview={viewType}
					sx={sxMap?.icon}
					onClick={() => onRemove()}
				/>
			</Styles.withIcons.iconsGroup>
		</Styles.card>
	);
}
