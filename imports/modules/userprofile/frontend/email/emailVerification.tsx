import React from 'react';
import { renderToString } from 'react-dom/server';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Typography, Box } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';
import CssBaseline from '@mui/material/CssBaseline';
import juice from 'juice';
import Home from '/imports/sysPages/pages/home/home';
import { getTheme } from '/imports/ui/materialui/theme';


// Crie um tema do Material-UI
const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});


function renderFullPage(html: string, css: string) {
  const fullHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>My page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
        />
        <style>
          ${css}
        </style>
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
    </html>
  `;

  // Aplica o CSS inline usando o Juice
  const htmlWithInlineStyles = juice(fullHtml);
  return htmlWithInlineStyles;
}


// Crie um cache para o Emotion
const cache = createCache({ key: 'css' });
const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

// Componente de email
const EmailContent = ({ title, message }: {title: string, message: string} ) => (
    <Box sx={{ padding: 2, backgroundColor: 'red' }}>
        <Typography variant="h4" color="primary">{title}</Typography>
        <Typography variant="body1">{message}</Typography>
    </Box>
);

const getVerificationEmailTemplate = (): EmailFields => ({
    subject() {
        return `${Meteor.settings.public.appName} - Confirme seu endereço de e-mail`;
    },
    html(user, url) {
        // Renderize o componente e extraia os estilos críticos
        const html = renderToString(
            <CacheProvider value={cache}>
                <ThemeProvider theme={getTheme({ darkMode: false, fontScale: 1 })}>
                    <CssBaseline />
                    <img src='https://drive.google.com/file/d/19aIlk1CEy_RQnzWH8JunWNHiOOrr0NUc/view?usp=drive_link' />
                </ThemeProvider>
            </CacheProvider>
        )

        const emotionChunks = extractCriticalToChunks(html);
        const emotionCss = constructStyleTagsFromChunks(emotionChunks);

        console.log('>>>>>>>>>',emotionCss);
        console.log('>>>>>>>>>',html);
        console.log(renderFullPage(html, emotionCss));

        return renderFullPage(html, emotionCss);
    }
});

export default getVerificationEmailTemplate;