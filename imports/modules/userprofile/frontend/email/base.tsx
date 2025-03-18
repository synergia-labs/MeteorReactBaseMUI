import { Typography } from '@mui/material';
import React from 'react';
import Styles from './baseStyles';

const UserActionTemplate: React.FC<{ title: string, text: string, footer: string }> = ({ title, text, footer }) => {
  return (
    <Styles.container>
      <head>
        <title>{title}</title>
        <meta charSet="utf-8" />
      </head>
      <body style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 20 }}>
        <div style={{ maxWidth: 600, margin: '0 auto', border: '1px solid #eee', padding: 20 }}>
          <Typography variant='h6'>{title}</Typography>
          <div dangerouslySetInnerHTML={{ __html: text }} />
          {footer && <div style={{ marginTop: 20, borderTop: '1px solid #eee', paddingTop: 10, color: '#777' }}>{footer}</div>}
        </div>
      </body>
    </Styles.container>
  );
};

export default UserActionTemplate;