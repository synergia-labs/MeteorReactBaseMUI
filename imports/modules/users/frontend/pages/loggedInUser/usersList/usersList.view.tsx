import React, { useContext } from "react";
import Styles from "./usersList.styles";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import SysIcon from "../../../../../../components/sysIcon/sysIcon";
import { SysSelectField } from "../../../../../../components/sysFormFields/sysSelectField/sysSelectField";
import Context, { IUsersListContext } from "./usersList.context";
import CardUser from "../../../components/userCard/userCard.view";
import { SysFab } from "../../../../../../components/sysFab/sysFab";
import { useTranslation } from "react-i18next";
import { Grid, TablePagination } from "@mui/material";
import enumUserRoles from "/imports/modules/users/common/enums/enumUserRoles";
import LinearIndeterminateLoading from "/imports/components/LinearIndeterminateLoading/loading";

const UserListView: React.FC = () => {
	const {
		userList,
		userRoles,
		openDetail,
		changePage,
		changeRowsPerPage,
		page,
		rowsPerPage,
		setSearchText,
		setSelectedRole,
		totalUsers,
		loading
	} = useContext<IUsersListContext>(Context);
	const { t } = useTranslation("users");

	const showPagination = page > 0 || (totalUsers > 0 && totalUsers > (page + 1) * rowsPerPage);

	return (
		<Styles.container>
			<Typography variant="h5">{t("pages.userList.title")}</Typography>
			<Styles.filters>
				<TextField
					disabled={loading}
					name="userSearch"
					placeholder={t("pages.userList.searchPlaceholder")}
					onChange={(e) => setSearchText(e.target.value)}
					InputProps={{
						startAdornment: (
							<SysIcon
								name={"search"}
								sx={{
									color: (theme) => theme.palette.sysAction?.primaryIcon
								}}
							/>
						)
					}}
				/>
				<SysSelectField
					disabled={loading}
					name="roles"
					label={t("pages.userList.selectLabel")}
					placeholder={t("pages.userList.selectPlaceholder")}
					options={userRoles}
					onChange={(value) => setSelectedRole(value.target.value as enumUserRoles)}
				/>
			</Styles.filters>
			<Grid container spacing={{ xs: 2, md: 3 }} sx={{ position: "relative" }}>
				{userList.map((user) => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={user._id}>
						<CardUser {...user} />
					</Grid>
				))}
				<LinearIndeterminateLoading isLoading={loading} />
			</Grid>

			{showPagination && (
				<TablePagination
					component={"div"}
					count={totalUsers}
					page={page}
					rowsPerPage={rowsPerPage}
					onPageChange={changePage}
					onRowsPerPageChange={changeRowsPerPage}
					sx={{ borderBottom: "none" }}
					disabled={loading}
				/>
			)}

			<SysFab
				variant="extended"
				text={t("pages.userList.addButton")}
				startIcon={<SysIcon name={"add"} />}
				fixed={true}
				onClick={() => openDetail()}
			/>
		</Styles.container>
	);
};

export default UserListView;
