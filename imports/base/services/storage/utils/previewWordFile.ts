import { IArchive } from "../common/types/archive.type";

export async function previewWord(file: IArchive, res: any, _: any) {
	try {
		const mammoth = require("mammoth"); // eslint-disable-line
		const result = await mammoth.convertToHtml({ path: file.path });

		res.writeHead(200, {
			"Content-Type": "text/html",
			"Cache-Control": "max-age=3600"
		});

		res.end(`
            <style>
                .word-preview { max-width: 8.5in; margin: 0 auto; padding: 1in }
                table { border-collapse: collapse; margin: 1rem 0 }
                td, th { border: 1px solid #ddd; padding: 0.5rem }
            </style>
            <div class="word-preview">
                ${result.value}
            </div>
        `);
	} catch (error) {
		console.error("Erro na conversão do Word:", error);
		res.status(500).end("Erro ao converter documento");
	}
}
