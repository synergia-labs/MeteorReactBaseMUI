import path from 'path';
import { IArchive } from '../common/types/archive.type';

function formatFileSize(bytes: number): string {
	if (bytes === 0) return '0 Bytes';
	const k = 1024;
	const sizes = ['Bytes', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatDate(date: Date | undefined): string {
	return date ? new Date(date).toLocaleString() : 'Não disponível';
}

export async function previewDefaultFile(file: IArchive, res: any, req: any) {
	res.writeHead(200, {
		'Content-Type': 'text/html',
		'Cache-Control': 'max-age=3600'
	});
	const html = `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Detalhes do Arquivo</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Segoe UI', system-ui, sans-serif;
            }

            body {
                background: #f0f2f5;
                padding: 2rem;
                min-height: 100vh;
            }

            .container {
                max-width: 1000px;
                margin: 0 auto;
            }

            .card {
                background: white;
                border-radius: 12px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                padding: 2rem;
                margin-bottom: 2rem;
            }

            .file-header {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-bottom: 2rem;
            }

            .file-icon {
                width: 64px;
                height: 64px;
                background: #e1e4e8;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                color: #6e7781;
            }

            .file-title {
                font-size: 24px;
                color: #24292f;
            }

            .info-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1.5rem;
                margin-bottom: 2rem;
            }

            .info-item {
                padding: 1rem;
                background: #f6f8fa;
                border-radius: 8px;
            }

            .info-label {
                font-size: 0.9em;
                color: #6e7781;
                margin-bottom: 0.5rem;
            }

            .info-value {
                font-weight: 500;
                color: #24292f;
            }

            .metadata {
                border-top: 1px solid #e1e4e8;
                padding-top: 1.5rem;
            }

            .download-btn {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.75rem 1.5rem;
                background: #2da44e;
                color: white;
                text-decoration: none;
                border-radius: 6px;
                transition: background 0.2s;
            }

            .download-btn:hover {
                background: #22863a;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="card">
                <div class="file-header">
                    <div class="file-icon">
                        ${path.extname(file.name).toUpperCase().replace('.', '')}
                    </div>
                    <h1 class="file-title">${file.name}</h1>
                </div>

                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Tamanho</div>
                        <div class="info-value">${formatFileSize(file.size)}</div>
                    </div>

                    <div class="info-item">
                        <div class="info-label">Tipo</div>
                        <div class="info-value">${file.type}</div>
                    </div>

                    <div class="info-item">
                        <div class="info-label">Extensão</div>
                        <div class="info-value">${file.extensionWithDot}</div>
                    </div>

                    <div class="info-item">
                        <div class="info-label">Upload</div>
                        <div class="info-value">${formatDate(file.meta?.createdAt)}</div>
                    </div>
                </div>

                <div class="metadata">
                    <h2 style="margin-bottom: 1rem;">Metadados</h2>
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">Criado por</div>
                            <div class="info-value">${file.meta?.createdBy || 'N/A'}</div>
                        </div>

                        <div class="info-item">
                            <div class="info-label">Última atualização</div>
                            <div class="info-value">${formatDate(file.meta?.updatedAt)}</div>
                        </div>

                        <div class="info-item">
                            <div class="info-label">Status</div>
                            <div class="info-value">
                                ${file.meta?.isDeleted ? 'Excluído' : 'Ativo'}
                            </div>
                        </div>
                    </div>
                </div>

                <div style="margin-top: 2rem;">
                    <a href="${req.url}&dl=1" class="download-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
                        </svg>
                        Download do Arquivo
                    </a>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;

	res.end(html);
}
