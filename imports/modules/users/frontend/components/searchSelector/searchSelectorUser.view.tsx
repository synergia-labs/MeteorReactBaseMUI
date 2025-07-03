import React, { useContext, useEffect, useRef, useState } from "react";
import usersApi from "../../api";
import Neo4jPersonType from "../../../common/types/neo4jUser";
import { SysSearchSelector } from "/imports/components/sysFormFields/sysSearchSelector/sysSearchSelector.view";
import { RenderWithPermission } from "/imports/services/security/frontend/components/renderWithPermission";
import enumUsersRegisterMethods from "../../../common/enums/enumRegisterMethods";
import { SysFormContext } from "/imports/components/sysForm/sysForm";
import { hasValue } from "/imports/libs/hasValue";
import { ISysFormComponentRef } from "/imports/components/sysForm/typings";
import { IBaseSimpleFormComponent } from "/imports/components/InterfaceBaseSimpleFormComponent";

interface IHandleSearchParams {
	search: string;
	start?: number;
	limit?: number;
}

interface IProps extends IBaseSimpleFormComponent {
	onChange?: (value: Neo4jPersonType) => void;
	value?: Neo4jPersonType;
}

const SeachSelectorUser: React.FC<IProps> = ({ onChange, value, name, label, placeholder, disabled, loading }) => {
	const controllerSysForm = useContext(SysFormContext);
	const inSysFormContext = hasValue(controllerSysForm);

	const refObject = useRef<ISysFormComponentRef>({ name: name ?? "users", value: value });

	if (inSysFormContext) {
		controllerSysForm.setRefComponent(refObject);
		const schema = refObject?.current.schema;
		label = label || schema?.label;
		placeholder = placeholder || schema?.placeholder;
		disabled = disabled || controllerSysForm.disabled;
		loading = loading || controllerSysForm.loading;
	}

	const [selectedUser, setSelectedUser] = useState<Neo4jPersonType | undefined>(value);
	useEffect(() => setSelectedUser(value), [value]);

	if (inSysFormContext)
		controllerSysForm.setInteractiveMethods({
			componentRef: refObject!,
			clearMethod: () => setSelectedUser(undefined),
			setValueMethod: (newValue) => setSelectedUser(newValue),
			changeVisibilityMethod: (_visible: boolean) => {},
			setErrorMethod: (_error: string | undefined) => {}
		});

	function handleSearch(params: IHandleSearchParams, callback: (err: any, res: any) => void) {
		usersApi.getUserBySimilarity(
			{
				filter: { search: params.search },
				options: {
					limit: params.limit,
					skip: params.start ?? 0
				}
			},
			callback
		);
	}

	function handleOnChange(values: Array<Neo4jPersonType>) {
		if (values.length <= 0) return;
		const user = values[0];
		if (inSysFormContext) controllerSysForm.onChangeComponentValue({ refComponent: refObject, value: user });
		setSelectedUser(user);
		onChange?.(user);
	}

	return (
		<RenderWithPermission functionalities={[enumUsersRegisterMethods.getUserBySimilarity]}>
			<SysSearchSelector
				values={selectedUser ? [selectedUser] : []}
				label={label}
				onChange={handleOnChange}
				searchFunction={handleSearch}
				disabled={disabled || loading}
				placeholder={placeholder}
				config={{
					valueField: "_id",
					labelField: "name",
					photoField: "photo"
				}}
			/>
		</RenderWithPermission>
	);
};

export default SeachSelectorUser;
