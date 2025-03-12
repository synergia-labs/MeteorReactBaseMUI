import fs from 'fs';
import { IArchive } from '../common/types/archive.type';

export function previewTextFile(file: IArchive, res: any, _: any) {
	const content = fs.readFileSync(file.path, 'utf8');
	let formattedContent = content;

	if (file.type === 'application/json') {
		try {
			formattedContent = JSON.stringify(JSON.parse(content), null, 2);
		} catch (e) {
			console.error('JSON inválido, exibindo conteúdo bruto');
		}
	}

	res.writeHead(200, {
		'Content-Type': 'text/html',
		'Cache-Control': 'max-age=3600'
	});

	res.end(`
      <style>
          pre {
              background: #f4f4f4;
              padding: 1rem;
              border-radius: 4px;
              overflow-x: auto;
          }
      </style>
      <pre>${formattedContent}</pre>
  `);
}
