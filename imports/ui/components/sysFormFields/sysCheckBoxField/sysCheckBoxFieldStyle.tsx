import { FormGroup, styled } from '@mui/material';

interface IFormGroup {
	alignment: 'row' | 'column';
}

const sysCheckBoxFieldStyle = {
	formGroup: styled(FormGroup)<IFormGroup>(({ alignment }) => ({
		flexDirection: alignment
	}))
};

export default sysCheckBoxFieldStyle;
