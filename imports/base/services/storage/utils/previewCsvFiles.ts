import fs from "fs";
import { parse } from "csv-parse";
import { IArchive } from "../common/types/archive.type";

export async function previewCsv(file: IArchive, res: any, _: any) {
	const parser = fs.createReadStream(file.path).pipe(parse({ delimiter: "," }));

	let html =
		"<style>table {border-collapse: collapse; width: 100%;} td, th {border: 1px solid #ddd; padding: 8px;}</style><table>";
	let isHeader = true;

	parser.on("data", (row: any) => {
		html += "<tr>";
		row.forEach((cell: string) => {
			html += isHeader ? `<th>${cell}</th>` : `<td>${cell}</td>`;
		});
		html += "</tr>";
		isHeader = false;
	});

	await new Promise((resolve, reject) => {
		parser.on("end", resolve);
		parser.on("error", reject);
	});

	html += "</table>";
	res.writeHead(200, {
		"Content-Type": "text/html",
		"Cache-Control": "max-age=3600"
	});
	res.end(html);
}
