import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import HomeSectionNotificacoes from './sections/notificacoes';
import HomeSectionDialogs from './sections/dialogs';
import HomeStyles from './homeStyle';
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";
import Radio from "@mui/material/Radio";
import Checkbox from "@mui/material/Checkbox";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {Menu, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {MoreVert, Person, Settings} from "@mui/icons-material";
import Select from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import { SysLoading } from '../../../ui/components/sysLoading/sysLoading';

const Home: React.FC = () => {
  const { Container, Header, } = HomeStyles;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

	return (
		<Container>
			<Header>
				<Typography variant="h3">Página de testes</Typography>
				<Typography variant="body1" textAlign={'justify'}>
					Bem vindo ao Boilerplate do Synergia. Essa é uma página dedicada aos testes e exibições de componentes e
					funcionalidades do nosso sistema. Esperamos que você aproveite e aprenda bastante com ela. Para mais dúvidas
					consulte nossa documentação oficial pelo storybook.
				</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '2rem' }}>
          <Button startIcon={<Add />}> Contained M </Button>
          <Button startIcon={<Add />} disabled> Contained M </Button>
          <Button startIcon={<Add />} size={'small'}> Contained S </Button>
          <Button startIcon={<Add />} disabled size={'small'}> Contained S </Button>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '2rem' }}>
          <Button variant={'outlined'} startIcon={<Add />}> Outlined M </Button>
          <Button variant={'outlined'} startIcon={<Add />} disabled> Outlined M </Button>
          <Button variant={'outlined'} startIcon={<Add />} size={'small'}> Outlined S </Button>
          <Button variant={'outlined'} startIcon={<Add />} disabled size={'small'}> Outlined S </Button>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '2rem' }}>
          <Button variant={'text'} startIcon={<Add />}> Text M </Button>
          <Button variant={'text'} startIcon={<Add />} disabled> Text M </Button>
          <Button variant={'text'} startIcon={<Add />} size={'small'}> Text S </Button>
          <Button variant={'text'} startIcon={<Add />} disabled size={'small'}> Text S </Button>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '2rem' }}>
          <Radio />
          <Radio />
          <Radio checked disabled />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '2rem' }}>
          <Checkbox />
          <Checkbox disabled />
          <Checkbox disabled checked />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '2rem' }}>
          <Fab>
            <Add /> Action
          </Fab>
          <Fab disabled>
            <Add /> Action
          </Fab>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '2rem' }}>
          <Tooltip title={'Teste tooltip'}>
            <IconButton >
              <Add />
            </IconButton>
          </Tooltip>
          <IconButton id={'basic-button'} onClick={handleMenuOpen}>
            <MoreVert />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleMenuClose} disabled><Person color={'primary'}/>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose} selected><Settings /> My account</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
          <IconButton id={'basic-button'} disabled>
            <Add />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '2rem', minWidth: '500px' }}>
          <Slider defaultValue={0} min={0} max={100} step={10} marks />
          <Slider defaultValue={0} min={0} max={100} step={10} />
          <Slider defaultValue={40} min={0} max={100} step={10} disabled />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '2rem' }}>
          <Switch />
          <Switch disabled />
          <Switch disabled checked />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '2rem' }}>
          <TextField placeholder={'Placeholder'} />
          <TextField placeholder={'Placeholder'} error />
          <TextField placeholder={'Placeholder'} disabled />
          <TextField placeholder={'Placeholder'} defaultValue={'Some value'} disabled />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '2rem' }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={[{label: 'One'}, {label: 'Two'}, {label: 'Three'}]}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '2rem' }}>
          <Select placeholder={'Placeholder'} value={20} >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <Select error value={20} >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <Select disabled value={20} >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </Box>
        <Tabs value={'Aba 1'}>
          <Tab label='Aba 1' value={'Aba 1'}/>
          <Tab label='Aba 2' />
          <Tab label='Aba 3' disabled />
        </Tabs>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '2rem' }}>
        </Box>
			</Header>
			<HomeSectionNotificacoes />
			<HomeSectionDialogs />
      <SysLoading label='Carregando...' size={'small'}/>
      <SysLoading label='Carregando...' />
      <SysLoading label='Carregando...' size={'large'} />
		</Container>
	);
};

export default Home;
