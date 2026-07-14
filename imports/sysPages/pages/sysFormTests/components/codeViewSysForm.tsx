import React from 'react';
import Box from '@mui/material/Box';

interface CodeViewSysFormProps {
	type: string;
	document: unknown;
}

export default function CodeViewSysForm({ type, document }: CodeViewSysFormProps) {
	return (
		<Box component="section" sx={{ minWidth: 0 }}>
			<strong>{type}</strong>
			<pre style={{ overflow: 'auto' }}>{JSON.stringify(document, null, 2)}</pre>
		</Box>
	);
}
