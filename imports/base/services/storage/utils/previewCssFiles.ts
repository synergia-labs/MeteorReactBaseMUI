import * as fs from "fs";
import { IArchive } from "../common/types/archive.type";

export async function previewCss(file: IArchive, res: any, _: any) {
	const content = fs.readFileSync(file.path, "utf8");
	res.writeHead(200, {
		"Content-Type": "text/css",
		"Cache-Control": "max-age=3600"
	});
	res.end(content);
}
