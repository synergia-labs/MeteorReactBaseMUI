import React from 'react';
import type { IBaseSimpleFormComponent } from '/imports/ui/components/InterfaceBaseSimpleFormComponent';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import TextField from '/imports/ui/components/SimpleFormFields/TextField/TextField';

import { subFormFieldStyle } from './SubFormFieldStyle';

export default ({ name, label, value, onChange, readOnly, error, ...otherProps }: IBaseSimpleFormComponent) => {
	const { schema } = otherProps;
	const doc = otherProps && otherProps.doc ? otherProps.doc : [];
	const categoria = doc.tipo ? doc.tipo.categoria : undefined;

	// console.log(categoria);

	const handleOnChange = (_evt: unknown) => {
		// onChange(
		//   { name, target: { name, value: evt.target.value } },
		//   { name, value: evt.target.value });

		const nomeArq = 'nomeArq';
		value.nomeArq = 'nome arq';
		value.descricaoArq = 'desc arq';
		// value.descricaoArq = 'desc arq';
		onChange?.({ nomeArq, target: { nomeArq, value } }, { name: nomeArq, value });
	};

	const getSubSchemaFromName = (name: string) => {
		const category = name;

		// console.log(name);

		switch (category) {
			case 'arqueologico':
				return (
					<div style={subFormFieldStyle.subFormContainer}>
						<TextField
							placeholder="Nome do Bem"
							name="nomeArq"
							error={error}
							otherProps={otherProps}
							value={value}
							readOnly={readOnly}
							onChange={handleOnChange}
						/>
						<TextField
							placeholder="Descrição do Bem"
							name="descricaoArq"
							error={error}
							otherProps={otherProps}
							value={value}
							readOnly={readOnly}
							onChange={handleOnChange}
							style={subFormFieldStyle.subFormContainerRight}
						/>
					</div>
				);
			case 'etnografico':
				return (
					<div style={subFormFieldStyle.subFormContainer}>
						<TextField placeholder="Nome do Bem" name="nomeEtn" />
						<TextField
							placeholder="Descrição do Bem"
							name="descricaoEtn"
							style={subFormFieldStyle.subFormContainerRight}
						/>
					</div>
				);
			default:
				return 'DEFAULT';
		}
	};

	return (
		<div>
			<SimpleLabelView label={label ?? ''} disabled={readOnly} />
			{getSubSchemaFromName(name)}
		</div>
	);
};
