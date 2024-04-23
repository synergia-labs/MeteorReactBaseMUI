import React from 'react';
import { TemplateNoneContainer } from './templateNoneStyles';
import { ISysTemplateProps } from '../getTemplate';

export interface ITemplateNone extends ISysTemplateProps {}

const TemplateNone: React.FC<ITemplateNone> = ({ children }) => {
	return <TemplateNoneContainer>{children}</TemplateNoneContainer>;
};

export default TemplateNone;
