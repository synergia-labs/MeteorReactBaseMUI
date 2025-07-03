import React, { useContext } from "react";
import Styles from "./prodCardMapping.styles";
import ProdExpandButton from "../prodExpandButton/prodExpandButton.view";
import Collapse from "@mui/material/Collapse";
import ProdMappingLegend from "../prodMappingLegend/prodMappingLegend.view";
import { enumDisplayOn, ProdCardMappingContext } from "./prodCardMapping.context";
import IconButton from "@mui/material/IconButton";
import SysIcon from "../sysIcon/sysIcon";
import { enumAutonomy } from "/imports/enums/autonomy";
import MappingBar, { enumMappingIdentifier } from "../prodMappingBar/prodMappingBar.view";
import { Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import AutonomyBar from "/imports/modules/position/frontend/components/autonomyIndicator/autonomyBar.view";
import { autonomyNumberToEnum } from "/imports/libs/autonomy/autonomyNumberToEnum";
import { enumAutonomyIntervals } from "/imports/enums/autonomyIntervals";

export function useAutonomyName(autonomy: number | undefined) {
	const { t } = useTranslation("collective");
	const autonomyEnum = autonomyNumberToEnum(autonomy);
	return t(`enums.autonomySimple.${autonomyEnum}`);
}

function autonomyEnumToMappingEnum(autonomy: enumAutonomy): enumMappingIdentifier {
	switch (autonomy) {
		case enumAutonomy.HIGH:
			return enumMappingIdentifier.HIGH;
		case enumAutonomy.MEDIUM:
			return enumMappingIdentifier.MEDIUM;
		case enumAutonomy.LOW:
			return enumMappingIdentifier.LOW;
		case enumAutonomy.NONE:
		case enumAutonomy.NOT_MAP:
			return enumMappingIdentifier.GLOBAL;
	}
}

const autonomies = [enumAutonomy.LOW, enumAutonomy.MEDIUM, enumAutonomy.HIGH] as const;

export const ProdCardMappingView: React.FC = () => {
	const {
		expanded,
		setExpanded,
		edit,
		quillRefs,
		onChange,
		onEdit,
		onConclude,
		onCancel,
		onDelete,
		onClick,
		autonomy: globalAutonomy,
		onPublish,
		published,
		_id,
		language,
		displayOn
	} = useContext(ProdCardMappingContext);

	const { t } = useTranslation("common");
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: _id });

	const sx = {
		transform: CSS.Transform.toString(transform ? { ...transform, x: 0 } : null),
		transition
	};

	const isOnEdit = displayOn === enumDisplayOn.EDIT;
	const onIndividualMapping = displayOn === enumDisplayOn.INDIVIDUAL_MAPPING;
	const onSimulMapping = displayOn === enumDisplayOn.SIMUL_MAPPING;

	return (
		<Styles.container {...attributes} ref={setNodeRef} sx={sx} displayOn={displayOn}>
			{onSimulMapping ? (
				<Styles.titleContainer>
					<Styles.titleMultiMappingContainer>
						<Styles.titleMultiMappingDimensionNameContainer>
							<ProdExpandButton expanded={expanded} setExpanded={setExpanded} />
							<Styles.title edit={edit} ref={quillRefs?.title} variant="subtitle1" onChange={onChange.title} />
						</Styles.titleMultiMappingDimensionNameContainer>
						<Collapse in={expanded}>
							<Styles.description
								edit={edit}
								ref={quillRefs?.description}
								variant="body2"
								onChange={onChange.description}
							/>
						</Collapse>
					</Styles.titleMultiMappingContainer>
					{autonomies.map((autonomy) => (
						<Styles.titleSubContainer key={autonomy}>
							<ProdMappingLegend
								retracted={!expanded}
								ref={quillRefs?.[autonomy]}
								autonomy={autonomy}
								edit={edit}
								onChange={onChange[autonomy]}
								language={language}
							/>
						</Styles.titleSubContainer>
					))}
				</Styles.titleContainer>
			) : (
				<Styles.titleContainer>
					<Styles.titleSubContainer>
						{isOnEdit && (
							<Styles.grabButton disableRipple {...listeners}>
								<SysIcon name="dragIndicator" />
							</Styles.grabButton>
						)}
						<ProdExpandButton expanded={expanded} setExpanded={setExpanded} />
						<Styles.title edit={edit} ref={quillRefs?.title} variant="subtitle1" onChange={onChange.title} />
					</Styles.titleSubContainer>
					<Styles.titleSubContainerJustifyRight>
						{isOnEdit && !edit && (
							<Button disabled={published} onClick={onPublish}>
								{published ? t("components.prodCardMapping.published") : t("components.prodCardMapping.publish")}
							</Button>
						)}
						{isOnEdit && (
							<>
								{!edit ? (
									<IconButton onClick={onEdit}>
										<SysIcon name="edit" />
									</IconButton>
								) : (
									<>
										<IconButton onClick={onConclude}>
											<SysIcon name="check" />
										</IconButton>
										<IconButton onClick={onCancel}>
											<SysIcon name="undo" />
										</IconButton>
									</>
								)}
							</>
						)}
						{isOnEdit && (
							<IconButton onClick={onDelete}>
								<SysIcon name="delete" />
							</IconButton>
						)}
						{onIndividualMapping && (
							<IconButton>
								{/* TODO: Implementado com o mapex */}
								<SysIcon name="addComment" />
							</IconButton>
						)}
					</Styles.titleSubContainerJustifyRight>
				</Styles.titleContainer>
			)}
			{onIndividualMapping && (
				<Collapse in={!expanded}>
					<Styles.divider />
					<Styles.mappingArea>
						<Styles.retractedInfoContainer>
							<AutonomyBar
								autonomyValue={globalAutonomy ?? enumAutonomyIntervals.NOT_MAP}
								canInteract={false}
								canShowTooltip={false}
							/>
							<Typography variant="subtitle1">{useAutonomyName(globalAutonomy)}</Typography>
						</Styles.retractedInfoContainer>
						<Styles.description edit={false} variant="body2" ref={quillRefs?.descriptionForRetractedMapex} />
					</Styles.mappingArea>
				</Collapse>
			)}
			{!onSimulMapping && (
				<Collapse in={expanded}>
					<Styles.contentContainer>
						<Styles.description
							edit={edit}
							ref={quillRefs?.description}
							variant="body2"
							onChange={onChange.description}
						/>
						<Styles.divider />
						<Styles.dimensionsContainer>
							{autonomies.map((autonomy) => (
								<Styles.dimensionsFragment key={autonomy}>
									<ProdMappingLegend
										ref={quillRefs?.[autonomy]}
										autonomy={autonomy}
										edit={edit}
										onChange={onChange[autonomy]}
										language={language}
									/>
									{onIndividualMapping && (
										<MappingBar
											mapping={autonomyEnumToMappingEnum(autonomy)}
											autonomy={globalAutonomy}
											onClick={onClick}
										/>
									)}
								</Styles.dimensionsFragment>
							))}
						</Styles.dimensionsContainer>
					</Styles.contentContainer>
					{onIndividualMapping && (
						<MappingBar mapping={enumMappingIdentifier.GLOBAL} autonomy={globalAutonomy} onClick={onClick} />
					)}
				</Collapse>
			)}
		</Styles.container>
	);
};
