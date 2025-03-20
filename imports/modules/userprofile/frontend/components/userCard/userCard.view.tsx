import React from "react";
import { Meteor } from "meteor/meteor";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Styles from "./userCard.styles";
import SysIcon from "/imports/ui/components/sysIcon/sysIcon";

interface ISysCardUserProps extends Partial<Meteor.User> {}

export const CardUser: React.FC<ISysCardUserProps> = ({ emails, profile }) => {
	return (
		<Styles.container>
			<Typography sx={{ gridArea: "name" }} variant="subtitle1">
				{profile?.name}
			</Typography>
			<Box sx={{ gridArea: "roles" }}>
				{profile?.roles?.map((role) => {
					return (
						<Typography key={role} variant="body1">
							{role}
						</Typography>
					);
				})}
			</Box>
			<Typography variant="body1" sx={{ gridArea: "email" }}>
				{emails?.[0].address}
			</Typography>
			<Styles.status color={profile?.connected ? "primary.main" : "sysText.disabled"} variant="body1">
				-
			</Styles.status>
			<Styles.actionBox>
				{profile?.connected ? (
					<>
						<Tooltip title={"Destivar"}>
							<IconButton onClick={() => {}}>
								<SysIcon name={"doNotDisturbOn"} />
							</IconButton>
						</Tooltip>
						<Tooltip title={"Editar"}>
							<IconButton onClick={() => {}}>
								<SysIcon name={"edit"} />
							</IconButton>
						</Tooltip>
					</>
				) : (
					<Tooltip title={"Ativar"}>
						<IconButton onClick={() => {}}>
							<SysIcon name={"checkCircle"} />
						</IconButton>
					</Tooltip>
				)}
			</Styles.actionBox>
		</Styles.container>
	);
};

export default CardUser;
