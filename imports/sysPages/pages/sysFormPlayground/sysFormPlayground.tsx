import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ISysFormPlaygroundContext } from './interface/types';
import SysFormPlaygroundView from './sysFormPlaygroundView';
import { ISysFormPlaygroundSch, sysFormPlaygroundSch } from './interface/sysFormSch';
import { ISysFormRef } from '/imports/ui/components/sysForm/typings';
import FieldsWithErrorsDialog from './components/fieldsWithErrorDialog/fieldWithErroDialog';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';

const SysFormPlaygroundContext = createContext<ISysFormPlaygroundContext>({} as ISysFormPlaygroundContext);

const SysFormPlayground: React.FC = () => {
	const formRef = useRef<ISysFormRef>(null);
	const [doc, setDoc] = useState<ISysFormPlaygroundSch>({} as ISysFormPlaygroundSch);
	const [updateRealTime, setUpdateRealTime] = useState<boolean>(false);
	const [mode, setMode] = useState<'edit' | 'view'>('edit');
	const [debugMode, setDebugMode] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(false);
	const [realTimeValidation, setRealTimeValidation] = useState<boolean>(false);

	const { showDialog, closeDialog, showNotification } = useContext(AppLayoutContext);

	const validateIndividualField = useCallback((name: string) => {
		if (!formRef.current) return;
		formRef.current.validateIndividualField(name);
	}, []);

	const changeDocRealTime = useCallback(
		(newDoc: ISysFormPlaygroundSch) => {
			if (!updateRealTime) return;
			setDoc(newDoc);
			if (!formRef.current) return;
		},
		[updateRealTime]
	);

	const updateDoc = useCallback(() => {
		if (!formRef.current) return;
		setDoc(formRef.current.getDocValues() as ISysFormPlaygroundSch);
	}, []);

	const showFieldWithErrors = useCallback(() => {
		showDialog({
			children: (
				<FieldsWithErrorsDialog errors={formRef.current?.getFieldWithErrors() || {}} closeDialog={closeDialog} />
			),
			fullScreenMediaQuery: 'sm'
		});
	}, []);

	const onSubmit = useCallback((doc: ISysFormPlaygroundSch) => {
		showNotification({
			type: 'success',
			title: 'Formulário submetido',
			message: `O formulário de ${doc.name} foi submetido com sucesso!`
		});
		updateDoc();
		if (!formRef.current) return;
		formRef.current.clearForm();
	}, []);

	useEffect(() => {
		updateDoc();
	}, []);

	const providerValues: ISysFormPlaygroundContext = useMemo(
		() => ({
			schema: sysFormPlaygroundSch,
			sysFormRef: formRef,
			validateIndividualField: validateIndividualField,
			doc: doc,
			updateRealTime: updateRealTime,
			changeUpdateRealTime: setUpdateRealTime,
			updateDocRealTime: changeDocRealTime,
			updateDoc: updateDoc,
			mode: mode,
			setMode: setMode,
			debugMode: debugMode,
			setDebugMode: setDebugMode,
			showFieldWithErrors: showFieldWithErrors,
			loading: loading,
			setLoading: setLoading,
			onSubmit: onSubmit,
			realTimeValidation: realTimeValidation,
			setRealTimeValidation: setRealTimeValidation
		}),
		[doc, updateRealTime, mode, debugMode, loading, realTimeValidation]
	);

	return (
		<SysFormPlaygroundContext.Provider value={providerValues}>
			<SysFormPlaygroundView />
		</SysFormPlaygroundContext.Provider>
	);
};

export { SysFormPlaygroundContext };
export default SysFormPlayground;
