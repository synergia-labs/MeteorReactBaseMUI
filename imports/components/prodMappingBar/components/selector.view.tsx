import React from "react";
import Styles from "./selector.styles";

interface ISelector {
	selected: boolean;
	autonomy: number | undefined;
	onClick: () => void;
}

export const Selector: React.FC<ISelector> = ({ selected, autonomy, onClick }) => {
	const subAutonomy = (((autonomy ?? 0) - 1) % 4) + 1;
	return (
		<Styles.container>
			<Styles.selector autonomy={autonomy} onClick={onClick}>
				{selected && (
					<Styles.subAutonomyIndicator variant="caption2" autonomy={autonomy}>
						{subAutonomy}
					</Styles.subAutonomyIndicator>
				)}
			</Styles.selector>
		</Styles.container>
	);
};
