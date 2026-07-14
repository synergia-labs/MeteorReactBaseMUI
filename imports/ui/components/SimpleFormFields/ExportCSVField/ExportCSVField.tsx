import React from 'react';
import Button from '@mui/material/Button';
import type { IBaseSimpleFormComponent } from '../../InterfaceBaseSimpleFormComponent';

interface ExportCSVFieldProps extends IBaseSimpleFormComponent {
	bemculturals?: Array<Record<string, unknown>>;
	filename?: string;
}

const escapeCsv = (value: unknown) => `"${String(value ?? '').replace(/"/g, '""')}"`;

export default function ExportCSVField({ value, bemculturals, filename = 'dadosExportados.csv' }: ExportCSVFieldProps) {
	const downloadCSV = () => {
		const rows = (bemculturals ?? (Array.isArray(value) ? value : [])) as Array<Record<string, unknown>>;
		const columns = Array.from(new Set(rows.flatMap((row) => Object.keys(row))));
		const csv = [
			columns.map(escapeCsv).join(','),
			...rows.map((row) => columns.map((key) => escapeCsv(row[key])).join(','))
		].join('\n');
		const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
		const link = document.createElement('a');
		link.download = filename;
		link.href = url;
		link.click();
		URL.revokeObjectURL(url);
	};

	return (
		<Button size="small" color="secondary" onClick={downloadCSV}>
			Exportar para CSV
		</Button>
	);
}
