import React from 'react';
import { FormGroup, styled } from '@mui/material';
import { sysSizing } from '/imports/ui/materialui/styles';

interface IFormGroup {
	alignment: 'row' | 'column';
}

const sysCheckBoxFieldStyle = {
	formGroup: styled(FormGroup)<IFormGroup>(({ alignment }) => ({
		flexDirection: alignment
	}))
};

export default sysCheckBoxFieldStyle;
