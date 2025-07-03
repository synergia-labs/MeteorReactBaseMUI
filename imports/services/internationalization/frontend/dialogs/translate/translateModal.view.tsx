import React, { useEffect, useState } from "react";
import Styles from "./translateModal.styles";
import { TextField, Typography } from "@mui/material";
import translate from "translate";

interface IProps {
	text: string;
	to: string;
	from: string;
}

const TranslateModal: React.FC<IProps> = ({ text, to, from }) => {
	const [translateText, setTranslateText] = useState<string>("");

	useEffect(() => {
		translate(text, { to, from }).then((res) => setTranslateText(res));
	}, []);

	return (
		<Styles.container>
			<Typography variant="h5">Sugerir Tradução</Typography>
			<Styles.textFieldContainer>
				<TextField multiline rows={6} defaultValue={text} />
				<TextField multiline rows={6} value={translateText} onChange={(e) => setTranslateText(e.target.value)} />
			</Styles.textFieldContainer>
		</Styles.container>
	);
};

export default TranslateModal;
