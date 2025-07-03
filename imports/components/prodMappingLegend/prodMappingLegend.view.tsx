import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { enumAutonomy } from "/imports/enums/autonomy";
import Styles from "./prodMappingLegend.styles";
import { useTranslation } from "react-i18next";
import { Collapse, Typography } from "@mui/material";
import { IQuillTextHandle } from "../prodQuillText/quillText";
import enumSupportedLanguages from "/imports/services/internationalization/common/enum/supportedLanguages";

interface IProdMappingLegend {
	autonomy: enumAutonomy;
	edit: boolean;
	onChange?: (content: string) => void;
	language?: enumSupportedLanguages;
	retracted?: boolean;
}

export interface IProdMappingLegendHandle {
	setContent: (content: string) => void;
}

const useVaryingTranslation = (language?: enumSupportedLanguages, ns?: string) => {
	const { t: defaultT, i18n } = useTranslation(ns);
	return language ? i18n.getFixedT(language, ns) : defaultT;
};

const ProdMappingLegend = forwardRef<IProdMappingLegendHandle, IProdMappingLegend>(
	({ autonomy, edit, onChange, language, retracted = false }, ref) => {
		const collectiveT = useVaryingTranslation(language, "collective");
		const commonT = useVaryingTranslation(language, "common");
		const quillRef = useRef<IQuillTextHandle>(null);

		useImperativeHandle(ref, () => ({
			setContent: (content: string) => {
				quillRef.current?.setContent(content);
			}
		}));

		return (
			<Styles.container>
				<Styles.title autonomy={autonomy} variant="subtitle2">
					{collectiveT(`enums.autonomySimple.${autonomy}`)}
				</Styles.title>
				<Collapse in={!retracted}>
					<Styles.collapseContainer>
						<Styles.description ref={quillRef} edit={edit} onChange={onChange} />
						<Styles.fourAutonomyContainer>
							<Styles.twoAutonomyContainer>
								<Styles.twoAutonomyIndicatorContainer>
									<Styles.oneAutonomyContainer>
										<Typography variant="caption2">1</Typography>
										<Styles.autonomyIndicatorBar autonomy={autonomy} />
									</Styles.oneAutonomyContainer>
									<Styles.oneAutonomyContainer>
										<Typography variant="caption2">2</Typography>
										<Styles.autonomyIndicatorBar autonomy={autonomy} />
									</Styles.oneAutonomyContainer>
								</Styles.twoAutonomyIndicatorContainer>
								<Styles.twoAutonomyDescriptionContainer autonomy={autonomy}>
									<Typography variant="caption1">{commonT(`components.prodMappingLegend.${autonomy}.left`)}</Typography>
								</Styles.twoAutonomyDescriptionContainer>
							</Styles.twoAutonomyContainer>
							<Styles.twoAutonomyContainer>
								<Styles.twoAutonomyIndicatorContainer>
									<Styles.oneAutonomyContainer>
										<Typography variant="caption2">3</Typography>
										<Styles.autonomyIndicatorBar autonomy={autonomy} />
									</Styles.oneAutonomyContainer>
									<Styles.oneAutonomyContainer>
										<Typography variant="caption2">4</Typography>
										<Styles.autonomyIndicatorBar autonomy={autonomy} />
									</Styles.oneAutonomyContainer>
								</Styles.twoAutonomyIndicatorContainer>
								<Styles.twoAutonomyDescriptionContainer autonomy={autonomy}>
									<Typography variant="caption1">{commonT(`components.prodMappingLegend.${autonomy}.right`)}</Typography>
								</Styles.twoAutonomyDescriptionContainer>
							</Styles.twoAutonomyContainer>
						</Styles.fourAutonomyContainer>
					</Styles.collapseContainer>
				</Collapse>
				<Collapse in={retracted}>
					<Styles.collapseContainer>
						<Styles.fourAutonomyContainer>
							<Styles.twoAutonomyContainer>
								<Styles.twoAutonomyIndicatorContainer>
									<Styles.oneAutonomyContainer>
										<Styles.autonomyIndicatorBar autonomy={autonomy} />
									</Styles.oneAutonomyContainer>
									<Styles.oneAutonomyContainer>
										<Styles.autonomyIndicatorBar autonomy={autonomy} />
									</Styles.oneAutonomyContainer>
								</Styles.twoAutonomyIndicatorContainer>
							</Styles.twoAutonomyContainer>
							<Styles.twoAutonomyContainer>
								<Styles.twoAutonomyIndicatorContainer>
									<Styles.oneAutonomyContainer>
										<Styles.autonomyIndicatorBar autonomy={autonomy} />
									</Styles.oneAutonomyContainer>
									<Styles.oneAutonomyContainer>
										<Styles.autonomyIndicatorBar autonomy={autonomy} />
									</Styles.oneAutonomyContainer>
								</Styles.twoAutonomyIndicatorContainer>
							</Styles.twoAutonomyContainer>
						</Styles.fourAutonomyContainer>
					</Styles.collapseContainer>
				</Collapse>
			</Styles.container>
		);
	}
);

export default ProdMappingLegend;
