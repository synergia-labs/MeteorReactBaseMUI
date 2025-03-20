import React, { ReactNode } from 'react';
import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';
import { getTheme } from '/imports/ui/materialui/theme';
import { renderToString } from 'react-dom/server';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { CacheProvider } from '@emotion/react';
import juice from 'juice';

const cache = createCache({ key: 'css' });
const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);
const theme = getTheme({ darkMode: false, fontScale: 1 });

const convertHtmlToInlineStyles = (html: string, css: string): string => {
	const fullHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <style>
              ${css}
            </style>
          </head>
          <body>
            <div id="root">${html}</div>
          </body>
        </html>
      `;

	const htmlWithInlineStyles = juice(fullHtml);
	return htmlWithInlineStyles;
};

const renderHtmlServerSide = (element: ReactNode): string => {
	const html = renderToString(
		<CacheProvider value={cache}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{element}
			</ThemeProvider>
		</CacheProvider>
	);

	const emotionChunks = extractCriticalToChunks(html);
	const emotionCss = constructStyleTagsFromChunks(emotionChunks);

	return convertHtmlToInlineStyles(html, emotionCss);
};

export default renderHtmlServerSide;
