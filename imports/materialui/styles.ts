/*!

 =========================================================
 * Material Dashboard React - v1.0.0 based on Material Dashboard - v1.2.0
 =========================================================

 * Product Page: http://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2018 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */

import { isMobile } from '/imports/libs/deviceVerify';
import React from 'react';

// Cores modo claro
const primariaClara = '#5a9902';
const primariaEscura = '#307000';
const secundariaClara = '#2182C0';
const secundariaEscura = '#0272BA';
const terciariaClara = '#444CA6';
const terciariaEscura = '#403599';

const backgroundClaro = '#F0F2FB';
const backgroundEscuro = '#DCDDF2';

const chipBackgroundTema = 'rgba(217, 217, 217, 0.2)';
const chipBackgroundCategoria = 'rgba(0, 0, 0, 0.6)';

const auxiliar1 = '#29ABE2';
const auxiliar2 = '#0FB0BF';

const corTexto = '#5A5A5A';

const branco = '#FFFFFF';
const preto = '#000000';
const cinzaClaro = '#AAAAAA';
const cinzaEscuro = '#808080';
const cinzaBackground = '#E6E6E6';

const erro = '#FF5C00';
const sucesso = '#03B8C9';

// Gradientes
const gradientePrincipal = `linear-gradient(90deg, ${primariaClara} 0%, ${primariaEscura} 100%)`;
const gradienteSecundario = `linear-gradient(90deg, ${secundariaEscura} 0%, ${auxiliar2} 100%)`;
const gradienteTerciario = `linear-gradient(90deg, ${primariaEscura} 0%, ${terciariaEscura} 79.69%)`;
const gradienteBackground1 = `linear-gradient(90deg, ${primariaClara} 0%, ${branco} 100%)`;
const gradienteBackground2 = `linear-gradient(90deg, ${secundariaClara} 0%, ${branco} 100%)`;
const gradienteAuxiliar1 = `linear-gradient(90deg, ${primariaClara} 0%, ${secundariaEscura} 100%)`;
const gradienteAuxiliar2 = `linear-gradient(90deg, ${secundariaEscura} 0%, ${terciariaEscura} 100%)`;
const gradienteVidroClaro = `linear-gradient(90deg, rgba(217, 217, 217, 0.5) -2.48%, rgba(255, 255, 255, 0.5) -2.48%, rgba(255, 255, 255, 0.2) 102.72%)`;
const gradienteCurto = `linear-gradient(90deg, ${preto} 2.97%, rgba(245, 127, 58, 0.1) 72.2%, rgba(248, 150, 60, 0) 89.74%)`;
const gradienteLinear = `linear-gradient(270deg, rgba(217, 217, 217, 0.25) -3.38%, rgba(255, 255, 255, 0.25) -3.38%, rgba(255, 255, 255, 0.1) 103.68%)`;
const gradienteSideBarBackground =
    'linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.5) 100%)';
const gradienteMobileBarBackground =
    'linear-gradient(180deg, rgba(217, 217, 217, 0.5) -25%, rgba(255, 255, 255, 0.5) -25%, rgba(255, 255, 255, 0.2) 128.57%)';
const gradienteEvento = `linear-gradient(0deg, rgba(64, 53, 153, 1), rgba(245, 127, 58, 1))`;
const gradienteLinear2 = `linear-gradient(90deg, rgba(255, 255, 255, 0.3) 19.69%, rgba(217, 217, 217, 0.55) 36.22%);`;
const gradienteBanner = `linear-gradient(0deg, #FFFFFF 3.88%, #F8963C 37.84%, rgba(255, 255, 255, 0) 104%)`;

const linearGradiente = `linear-gradient(180deg, ${primariaEscura} 0%, ${terciariaEscura} 79.58%)`;
const gradienteBackgroundSolucoes =
    'linear-gradient(180deg, rgba(217, 217, 217, 0.5) 0%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.2) 101.3%)';
const gradienteBackgroundSolucoesHover =
    'radial-gradient(58.39% 61.75% at 50% 49.93%, rgba(220, 221, 242, 0.75) 0%, rgba(255, 255, 255, 0.2) 100%)';

// Remover após estilização (cores antigas que ainda estão no sistema)
const primaryColor = '#ff9937';
const secondaryColor = '#0071bb';
const textDisabled = cinzaClaro;
const textAuxiliar = cinzaClaro;
const backgroundColor = '#f2f2f2';
const color1 = '#ff9800';
const color2 = '#f55a4e';
const color3 = '#4caf50';
const color1dark = '#814d00';
const color2dark = '#8d342d';
const color3dark = '#153116';

//Família de Fontes
const fontFamily = "'Lexend Deca', sans-serif";

// Tipografia
const h1 = (fontScale: number) => ({
    fontFamily: fontFamily,
    fontSize: 74 * fontScale,
    fontWeight: 700,
    lineHeight: '84px',
    letterSpacing: '0.02rem',
    '@media screen and (max-width: 1367px)': {
        fontSize: 58 * fontScale,
        lineHeight: '68px',
    },
    '@media screen and (max-width: 600px)': {
        fontSize: 44 * fontScale,
        lineHeight: '54px',
    },
});
const h2 = (fontScale: number) => ({
    fontFamily: fontFamily,
    fontSize: 74 * fontScale,
    fontWeight: 300,
    lineHeight: '84px',
    letterSpacing: '0.02rem',
    '@media screen and (max-width: 1367px)': {
        fontSize: 58 * fontScale,
        lineHeight: '68px',
    },
    '@media screen and (max-width: 600px)': {
        fontSize: 44 * fontScale,
        lineHeight: '54px',
    },
});
const h3 = (fontScale: number) => ({
    fontFamily: fontFamily,
    fontSize: 58 * fontScale,
    fontWeight: 700,
    lineHeight: '66px',
    letterSpacing: '0.02rem',
    '@media screen and (max-width: 1367px)': {
        fontSize: 42 * fontScale,
        lineHeight: '50px',
    },
    '@media screen and (max-width: 600px)': {
        fontSize: 28 * fontScale,
        lineHeight: '36px',
    },
});
const h4 = (fontScale: number) => ({
    fontSize: 58 * fontScale,
    fontWeight: 300,
    lineHeight: '66px',
    letterSpacing: '0.02rem',
    '@media screen and (max-width: 1367px)': {
        fontSize: 42 * fontScale,
        lineHeight: '50px',
    },
    '@media screen and (max-width: 600px)': {
        fontSize: 28 * fontScale,
        lineHeight: '36px',
    },
});
const h5 = (fontScale: number) => ({
    fontFamily: fontFamily,
    fontSize: 46 * fontScale,
    fontWeight: 600,
    lineHeight: '56px',
    '@media screen and (max-width: 1367px)': {
        fontSize: 32 * fontScale,
        lineHeight: '42px',
    },
    '@media screen and (max-width: 600px)': {
        fontSize: 24 * fontScale,
        lineHeight: '34px',
    },
});
const h6 = (fontScale: number) => ({
    fontFamily: fontFamily,
    fontSize: 42 * fontScale,
    fontWeight: 700,
    lineHeight: '52px',
    letterSpacing: '0.02rem',
    '@media screen and (max-width: 1367px)': {
        fontSize: 28 * fontScale,
        lineHeight: '38px',
    },
    '@media screen and (max-width: 600px)': {
        fontSize: 21 * fontScale,
        lineHeight: '31px',
    },
});
const h7 = (fontScale: number) => ({
    fontFamily: fontFamily,
    fontSize: 42 * fontScale,
    fontWeight: 300,
    lineHeight: '52px',
    letterSpacing: '0.02rem',
    '@media screen and (max-width: 1367px)': {
        fontSize: 28 * fontScale,
        lineHeight: '38px',
    },
    '@media screen and (max-width: 600px)': {
        fontSize: 21 * fontScale,
        lineHeight: '31px',
    },
});
const h8 = (fontScale: number) => ({
    fontFamily: fontFamily,
    fontSize: 32 * fontScale,
    fontWeight: 600,
    lineHeight: '40px',
    letterSpacing: '0.02rem',
    '@media screen and (max-width: 1367px)': {
        fontSize: 24 * fontScale,
        lineHeight: '32px',
    },
    '@media screen and (max-width: 600px)': {
        fontSize: 18 * fontScale,
        lineHeight: '24px',
    },
});
const h9 = (fontScale: number) => ({
    fontFamily: fontFamily,
    fontSize: 32 * fontScale,
    fontWeight: 300,
    lineHeight: '40px',
    letterSpacing: '0.02rem',
    '@media screen and (max-width: 1367px)': {
        fontSize: 24 * fontScale,
        lineHeight: '32px',
    },
    '@media screen and (max-width: 600px)': {
        fontSize: 18 * fontScale,
        lineHeight: '24px',
    },
});
const h10 = (fontScale: number) => ({
    fontFamily: fontFamily,
    fontSize: 24 * fontScale,
    fontWeight: 600,
    lineHeight: '29px',
    letterSpacing: '0.02rem',
    '@media screen and (max-width: 1367px)': {
        fontSize: 17 * fontScale,
        lineHeight: '22px',
    },
    '@media screen and (max-width: 600px)': {
        fontSize: 13 * fontScale,
        lineHeight: '18px',
    },
});
const subtitulo1 = (fontScale: number) => ({
    fontSize: 28 * fontScale,
    fontWeight: 400,
    letterSpacing: '0.02em',
    lineHeight: '34px',
    '@media screen and (max-width: 1367px)': {
        fontSize: 20 * fontScale,
        lineHeight: '26px',
    },
    '@media screen and (max-width: 600px)': {
        fontSize: 18 * fontScale,
        lineHeight: '24px',
    },
});
const subtitulo2 = (fontScale: number) => ({
    fontSize: 28 * fontScale,
    fontWeight: 600,
    letterSpacing: '0.02em',
    lineHeight: '34px',
    '@media screen and (max-width: 1367px)': {
        fontSize: 20 * fontScale,
        lineHeight: '26px',
    },
    '@media screen and (max-width: 600px)': {
        fontSize: 18 * fontScale,
        lineHeight: '24px',
    },
});
const subtitulo3 = (fontScale: number) => ({
    fontSize: 21 * fontScale,
    fontWeight: 400,
    letterSpacing: '0.02em',
    lineHeight: '29px',
    '@media screen and (max-width: 1367px)': {
        fontSize: 18 * fontScale,
        lineHeight: '26px',
    },
    '@media screen and (max-width: 600px)': {
        fontSize: 16 * fontScale,
        lineHeight: '24px',
    },
});
const corpo1 = (fontScale: number) => ({
    fontSize: 20 * fontScale,
    fontWeight: 400,
    letterSpacing: '0.02em',
    lineHeight: '28px',
    '@media screen and (max-width: 1367px)': {
        fontSize: 16 * fontScale,
        lineHeight: '24px',
    },
    '@media screen and (max-width: 600px)': {
        fontSize: 12 * fontScale,
        lineHeight: '20px',
    },
});
const corpo2 = (fontScale: number) => ({
    fontSize: 20 * fontScale,
    fontWeight: 400,
    letterSpacing: '0.02em',
    lineHeight: '34px',
    '@media screen and (max-width: 1367px)': {
        fontSize: 16 * fontScale,
        lineHeight: '30px',
    },
    '@media screen and (max-width: 600px)': {
        fontSize: 12 * fontScale,
        lineHeight: '26px',
    },
});
const descricao = (fontScale: number) => ({
    fontSize: 18 * fontScale,
    fontWeight: 300,
    letterSpacing: '0.02em',
    lineHeight: '25px',
    '@media screen and (max-width: 1367px)': {
        fontSize: 13 * fontScale,
        lineHeight: '20px',
    },
    '@media screen and (max-width:600px)': {
        fontSize: 11 * fontScale,
        lineHeight: '18px',
    },
});
const menu1 = (fontScale: number) => ({
    fontSize: 20 * fontScale,
    fontWeight: 500,
    letterSpacing: '0.02em',
    lineHeight: '24px',
    '@media screen and (max-width: 1367px)': {
        fontSize: 16 * fontScale,
        lineHeight: '20px',
    },
    '@media screen and (max-width: 600px)': {
        fontSize: 12 * fontScale,
        lineHeight: '16px',
    },
});
const menu2 = (fontScale: number) => ({
    fontSize: 20 * fontScale,
    fontWeight: 600,
    letterSpacing: '0.02em',
    lineHeight: '24px',
    '@media screen and (max-width: 1367px)': {
        fontSize: 16 * fontScale,
        lineHeight: '20px',
    },
    '@media screen and (max-width: 600px)': {
        fontSize: 12 * fontScale,
        lineHeight: '16px',
    },
});
const botao1 = (fontScale: number) => ({
    fontSize: 16 * fontScale,
    fontWeight: 600,
    letterSpacing: '0.02em',
    lineHeight: '20px',
    '@media screen and (max-width: 600px)': {
        fontSize: 12 * fontScale,
        lineHeight: '16px',
    },
});
const botao2 = (fontScale: number) => ({
    fontSize: 20 * fontScale,
    fontWeight: 600,
    letterSpacing: '0.02em',
    lineHeight: '26px',
    '@media screen and (max-width: 600px)': {
        fontSize: 18 * fontScale,
        lineHeight: '24px',
    },
});
const caption1 = (fontScale: number) => ({
    fontSize: 14 * fontScale,
    fontWeight: 400,
    letterSpacing: '0.02em',
    lineHeight: '20px',
    '@media screen and (max-width: 1367px)': {
        fontSize: 12 * fontScale,
        lineHeight: '18px',
    },
    '@media screen and (max-width: 600px)': {
        fontSize: 10 * fontScale,
        lineHeight: '16px',
    },
});
const caption2 = (fontScale: number) => ({
    fontSize: 14 * fontScale,
    fontWeight: 600,
    letterSpacing: '0.02em',
    lineHeight: '20px',
    '@media screen and (max-width: 1367px)': {
        fontSize: 12 * fontScale,
        lineHeight: '18px',
    },
    '@media screen and (max-width: 600px)': {
        fontSize: 10 * fontScale,
        lineHeight: '16px',
    },
});
const caption3 = (fontScale: number) => ({
    fontSize: 12 * fontScale,
    fontWeight: 400,
    letterSpacing: '0.02em',
    lineHeight: '13px',
    '@media screen and (max-width: 1367px)': {
        fontSize: 11 * fontScale,
        lineHeight: '12px',
    },
    '@media screen and (max-width: 600px)': {
        fontSize: 9 * fontScale,
        lineHeight: '10px',
    },
});

// Remover após estilização (estilos antigos que ainda estão no sistema)
const subtitle1 = subtitulo1;
const subtitle2 = subtitulo2;
const body1 = corpo1;
const body2 = corpo2;
const caption = caption1;
const button = botao1;

// Sombras
const sombraCard = '0px 2px 4px rgba(0, 0, 0, 0.15)';
const sombraCardOnHover = '0px 2px 9px 3px rgba(0, 0, 0, 0.15)';
const sombraSuperficie = '1px 3px 12px rgba(0, 0, 0, 0.15)';
const neuromorfismo = '2px 2px 2px rgba(0, 0, 0, 0.15), -1px -1px 2px rgba(255, 255, 255, 0.6)';
const sombra1 = '7px 7px 10px rgba(128, 128, 128, 0.05)';
const sombra6 = '0px 2px 5px rgba(128, 128, 128, 0.25)';

//Tamanhos
const tamanhoMaximoConteudo = '1920px';
const larguraBarraFechada = '76px';
const alturaAppBar = '64px';

// Outros
const fabContainer = {
    zIndex: 2,
    position: 'fixed',
    bottom: isMobile ? 80 : 30,
    right: 30,
};

const containerHome = {
    marginTop: '2em',
};

const formGroup = {
    width: '100%',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    padding: isMobile ? '0 20px' : 'none',
};

const row = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
};

const form = {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 20, //isMobile ? 40 : 40,
    marginBottom: 40,
    paddingBottom: 100,
};

const logo = {
    maxWidth: 100,
};

const column = {
    flex: 0.5,
};

const fieldContainer: { [key: string | number]: React.CSSProperties } = {
    width: '100%',
    padding: 0,
};

// Button
const textButtonColor = '#FFF';

export {
    // Paleta
    primariaClara,
    primariaEscura,
    secundariaClara,
    secundariaEscura,
    terciariaClara,
    terciariaEscura,
    backgroundClaro,
    backgroundEscuro,
    auxiliar1,
    auxiliar2,
    corTexto,
    branco,
    preto,
    cinzaClaro,
    cinzaEscuro,
    cinzaBackground,
    erro,
    sucesso,
    // Gradientes
    gradientePrincipal,
    gradienteSecundario,
    gradienteTerciario,
    gradienteBackground1,
    gradienteBackground2,
    gradienteAuxiliar1,
    gradienteAuxiliar2,
    gradienteVidroClaro,
    gradienteCurto,
    gradienteEvento,
    gradienteLinear,
    gradienteSideBarBackground,
    gradienteMobileBarBackground,
    gradienteLinear2,
    linearGradiente,
    gradienteBanner,
    gradienteBackgroundSolucoes,
    gradienteBackgroundSolucoesHover,
    // Remover após estilização (estilos antigos que ainda estão no sistema)
    primaryColor,
    secondaryColor,
    textDisabled,
    textAuxiliar,
    backgroundColor,
    chipBackgroundTema,
    chipBackgroundCategoria,
    color1,
    color2,
    color3,
    color1dark,
    color2dark,
    color3dark,
    //Fontes
    fontFamily,
    //Tipografia
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    h7,
    h8,
    h9,
    h10,
    subtitulo1,
    subtitulo2,
    subtitulo3,
    corpo1,
    corpo2,
    descricao,
    menu1,
    menu2,
    botao1,
    botao2,
    caption1,
    caption2,
    caption3,
    // Remover após estilização (estilos antigos que ainda estão no sistema)
    button,
    subtitle1,
    body1,
    subtitle2,
    body2,
    caption,
    // Sombras
    sombra1,
    sombra6,
    sombraCard,
    sombraCardOnHover,
    sombraSuperficie,
    neuromorfismo,
    //Tamanhos
    tamanhoMaximoConteudo,
    larguraBarraFechada,
    alturaAppBar,
    //Outros
    fabContainer,
    containerHome,
    row,
    column,
    form,
    logo,
    formGroup,
    fieldContainer,
    // button
    textButtonColor,
};
