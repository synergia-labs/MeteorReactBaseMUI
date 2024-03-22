import React, { createContext } from 'react';
import { IDefField } from '/imports/typings/ISchema';
import { IOnChangeDocValue } from './sysForm';

interface ISysFormContext {
	getSysFormComponentInfo: (name: string) =>
		| {
				schema?: IDefField<any>;
				isVisibile: boolean;
				isOptional: boolean;
				onChange: ({name, value} : IOnChangeDocValue) => void;
				erro: string | undefined;
				defaultValue: any;
		  }
		| undefined;
	getSysFormButtonInfo: () => {
		disabled: boolean;
		loading: boolean;
		onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	};
}

const SysFormContext = createContext<ISysFormContext>({} as ISysFormContext);

export default SysFormContext;
export type { ISysFormContext };
