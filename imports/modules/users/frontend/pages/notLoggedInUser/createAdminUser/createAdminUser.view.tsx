import React, { useContext, useEffect } from "react";
import Styles from "./createAdminUser.styles";
import SysForm from "../../../../../../components/sysForm/sysForm";
import SysTextField from "../../../../../../components/sysFormFields/sysTextField/sysTextField";
import SysFormButton from "../../../../../../components/sysFormFields/sysFormButton/sysFormButton";
import SysIcon from "../../../../../../components/sysIcon/sysIcon";
import Typography from "@mui/material/Typography";
import enumUserRoles from "/imports/modules/users/common/enums/enumUserRoles";
import Context, { INotLoggedInUserContext } from "../notLoggedInUser.context";
import createUserFrontSchema, { ICreateUserFrontSchema } from "./createAdminUser.schema";
import { useNavigate } from "react-router-dom";
import { CreateUserType } from "/imports/modules/users/common/types/createUser";
import { useTranslation } from "react-i18next";

const CreateAdminUserPage: React.FC = () => {
	const { t } = useTranslation("users");
	const { createUser, hasAdminUser } = useContext<INotLoggedInUserContext>(Context);
	const navigate = useNavigate();

	useEffect(() => {
		if (hasAdminUser) navigate("/forbidden");
	}, [hasAdminUser]);

	const handeSubmit = (doc: ICreateUserFrontSchema) => {
		const user: CreateUserType = {
			email: doc.email,
			password: doc.password,
			profile: {
				name: doc.name,
				roles: [enumUserRoles.ADMIN]
			}
		};
		createUser(user);
	};

	return (
		<Styles.container>
			<Typography variant="h5" textAlign={"center"}>
				{t("pages.createAdminUser.title")}
			</Typography>
			<Typography variant="caption" color={(theme) => theme.palette.sysAction?.auxiliary}>
				{t("pages.createAdminUser.description")}
			</Typography>
			<SysForm schema={createUserFrontSchema} onSubmit={handeSubmit} doc={{ roles: [enumUserRoles.ADMIN] }}>
				<Styles.formContainer>
					<SysTextField
						name="name"
						label={t("pages.createAdminUser.nameLabel")}
						fullWidth
						placeholder={t("pages.createAdminUser.namePlaceholder")}
					/>
					<SysTextField
						name="email"
						label={t("pages.createAdminUser.emailLabel")}
						fullWidth
						placeholder={t("pages.createAdminUser.emailPlaceholder")}
					/>
					<SysTextField
						name="password"
						label={t("pages.createAdminUser.passwordLabel")}
						fullWidth
						placeholder={t("pages.createAdminUser.passwordPlaceholder")}
					/>
				</Styles.formContainer>

				<SysFormButton variant="contained" color="primary" type="submit" endIcon={<SysIcon name={"arrowForward"} />}>
					{t("pages.createAdminUser.submit")}
				</SysFormButton>
			</SysForm>
		</Styles.container>
	);
};

export default CreateAdminUserPage;
