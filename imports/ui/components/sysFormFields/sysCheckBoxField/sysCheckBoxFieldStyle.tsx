import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';

interface IFormGroup {
	alignment: 'row' | 'column';
}

const sysCheckBoxFieldStyle = {
	FormGroup: styled(FormGroup)<IFormGroup>(({ alignment }) => ({
		flexDirection: alignment
	}))
};

export default sysCheckBoxFieldStyle;
