import React, { useMemo } from "react";
import { ISysTemplateProps } from "../../templateProvider";
import Styles from "./templateLoginStyles";

const TemplateLogin: React.FC<ISysTemplateProps> = ({ children }) => {
	const usedImage = useMemo(() => {
		const minIdentifier = 1;
		const maxIdentifier = 12;
		const imageTime = 53;

		const now = Date.now();
		const totalMinutes = Math.floor(now / 1000 / 60);
		const imageIndex = (Math.floor(totalMinutes / imageTime) % (maxIdentifier - minIdentifier + 1)) + minIdentifier;
		const formattedIndex = String(imageIndex).padStart(2, "0");
		return `/images/loginBackgrounds/${formattedIndex}.jpg`;
	}, []);

	return (
		<Styles.container source={usedImage}>
			<Styles.content>
				<Styles.formContainer>{children}</Styles.formContainer>
			</Styles.content>
		</Styles.container>
	);
};

export default TemplateLogin;
