import React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const Container = styled(Box)(({}) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	justifyContent: 'flex-start',
	gap: '1rem',
  width: '100%'
}));

const Header = styled(Box)(({}) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	justifyContent: 'flex-start',
	gap: '0.5rem'
}));

const ContainerExample = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.sysBackground?.bg2,
	border: `1px solid ${theme.palette.divider}`,
	borderRadius: theme.shape.borderRadius,
	padding: '1rem',
	width: '100%'
}));

const ReviewContainer = styled(Box)(({}) => ({
	display: 'flex',
	flexDirection: 'row',
	gap: '0.5rem',
	alignItems: 'center',
	justifyContent: 'flex-start'
}));

interface IHomeSection {
	title: string;
	description?: React.ReactNode;
	needReview?: string;
	children?: React.ReactNode;
}

const HomeSection: React.FC<IHomeSection> = ({ title, description, children, needReview }) => {
	return (
		<Container>
			<Header>
				<Typography variant="h5">{title}</Typography>
				<Typography variant="body1" textAlign={'justify'}>
					{description}
				</Typography>
			</Header>
			{needReview && (
				<ReviewContainer>
					<Typography variant="subtitle1" color="error">
						Necessário revisar:
					</Typography>
					<ReviewContainer>{needReview}</ReviewContainer>
				</ReviewContainer>
			)}

			<Typography variant="subtitle1">Exemplo(s):</Typography>
			<ContainerExample>{children}</ContainerExample>
		</Container>
	);
};

export default HomeSection;
