import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';

interface WrapTextFieldProps {
	name: string;
	isVisibled: boolean;
	onClick: () => void;
}

export default function WrapTextField({ name, isVisibled, onClick }: WrapTextFieldProps) {
	if (!isVisibled) return null;
	return (
		<Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
			<SysTextField name={name} />
			<Button onClick={onClick}>Validar</Button>
		</Box>
	);
}
