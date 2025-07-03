import React from "react";
import Styles from "./prodMappingBar.styles";
import { Selector } from "./components/selector.view";
import { enumAutonomyIntervals } from "/imports/enums/autonomyIntervals";

export enum enumMappingIdentifier {
	GLOBAL = 0,
	LOW = 1,
	MEDIUM = 5,
	HIGH = 9
}

export enum enumRestrictMappingIdentifier {
	LOW = 1,
	MEDIUM = 5,
	HIGH = 9
}

interface IMappingBar {
	onClick?: (autonomy: number | undefined) => void;
	autonomy: number | undefined;
	mapping: enumMappingIdentifier;
}

interface IRestrictMappingBar {
	onClick?: (autonomy: number | undefined) => void;
	autonomy: number | undefined;
	mapping: enumRestrictMappingIdentifier;
}

const autonomies = [
	enumRestrictMappingIdentifier.LOW,
	enumRestrictMappingIdentifier.MEDIUM,
	enumRestrictMappingIdentifier.HIGH
] as const;
const subAutonomies = [0, 1, 2, 3] as const;

const RestrictMappingBar: React.FC<IRestrictMappingBar> = ({
	onClick,
	autonomy: globalAutonomy = enumAutonomyIntervals.LOW,
	mapping
}) => {
	return (
		<Styles.restrictMappingBarContainer>
			<Styles.subContainer>
				{subAutonomies.map((subAutonomy) => (
					<Selector
						key={subAutonomy}
						autonomy={subAutonomy + mapping <= globalAutonomy ? subAutonomy + mapping : undefined}
						selected={subAutonomy + mapping === globalAutonomy}
						onClick={() => onClick?.(subAutonomy + mapping)}
					/>
				))}
			</Styles.subContainer>
		</Styles.restrictMappingBarContainer>
	);
};

const MappingBar: React.FC<IMappingBar> = ({ onClick, autonomy: globalAutonomy, mapping }) => {
	switch (mapping) {
		case enumMappingIdentifier.GLOBAL:
			return (
				<Styles.container>
					{autonomies.map((autonomy) => (
						<Styles.subContainer key={autonomy}>
							{subAutonomies.map((subAutonomy) => (
								<Selector
									key={subAutonomy}
									autonomy={autonomy + subAutonomy <= (globalAutonomy ?? 0) ? autonomy + subAutonomy : undefined}
									selected={autonomy + subAutonomy === globalAutonomy}
									onClick={() => onClick?.(autonomy + subAutonomy)}
								/>
							))}
						</Styles.subContainer>
					))}
				</Styles.container>
			);
		case enumMappingIdentifier.LOW:
		case enumMappingIdentifier.MEDIUM:
		case enumMappingIdentifier.HIGH:
			return (
				<RestrictMappingBar
					onClick={onClick}
					autonomy={globalAutonomy}
					mapping={mapping as unknown as enumRestrictMappingIdentifier}
				/>
			);
	}
};

export default MappingBar;
