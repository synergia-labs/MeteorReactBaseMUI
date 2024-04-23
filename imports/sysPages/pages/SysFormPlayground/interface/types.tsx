import { RefObject } from 'react';
import { ISchema } from '/imports/typings/ISchema';
import { ISysFormPlaygroundSch } from './sysFormSch';
import { ISysFormRef } from '/imports/ui/components/sysForm/typings';

interface ISysFormPlaygroundContext {
	schema: ISchema<ISysFormPlaygroundSch>;
	sysFormRef: RefObject<ISysFormRef>;
	validateIndividualField: (name: string) => void;
	doc: ISysFormPlaygroundSch;
	updateRealTime: boolean;
	changeUpdateRealTime: (value: boolean) => void;
	updateDocRealTime: (newDoc: ISysFormPlaygroundSch) => void;
	updateDoc: () => void;
	mode: 'edit' | 'view';
	setMode: (mode: 'edit' | 'view') => void;
	debugMode: boolean;
	setDebugMode: (value: boolean) => void;
	showFieldWithErrors: () => void;
	loading: boolean;
	setLoading: (value: boolean) => void;
	onSubmit: (doc: ISysFormPlaygroundSch) => void;
	realTimeValidation: boolean;
	setRealTimeValidation: (value: boolean) => void;
}

export type { ISysFormPlaygroundContext };
