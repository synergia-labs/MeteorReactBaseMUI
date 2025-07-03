import fs from "fs";

interface IRegisterDevLogs {
	fileName: string;
	data: string;
}

export default ({ fileName, data }: IRegisterDevLogs): void => {
	const absolutePath = process.cwd().split(".meteor")[0];
	const logFilePath = `${absolutePath}imports/libs/dev/registerDevLogs/logs/${fileName}.log`;
	fs.writeFileSync(logFilePath, data);
};
