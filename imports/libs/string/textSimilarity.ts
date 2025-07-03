import trigramSimilarity from "trigram-similarity";
import { textNormalize } from "../textUtilities";

const calcTextSimilarity = (key: string, value: string) => {
	key = textNormalize(key);
	value = textNormalize(value);

	const subStringIdx = value.indexOf(key);
	const similarity = (subStringIdx < 0 ? trigramSimilarity(key, value) : 1 + 1 / (subStringIdx + 1)) / 2;
	return similarity;
};

// Retorna a similaridade e o índice das strings
// ordenadas pelo nível de similaridade decrescente
const textSimilarity = (key: string, values: Array<string>) => {
	const cleanedKey = textNormalize(key);
	return values
		.map((value, index) => [calcTextSimilarity(cleanedKey, textNormalize(value)), index])
		.sort((a, b) => b[0] - a[0]);
};

// Retorna os objetos que possuem similaridade com a chave
const textSimilarityObject = (key: string, objList: Array<Record<string, any>>, searchKey: string) => {
	const cleanedKey = textNormalize(key);
	const values = objList.map((obj) => obj[searchKey]);
	return values
		.map((value, index) => [calcTextSimilarity(cleanedKey, textNormalize(value)), index])
		.filter(([similarity, _]) => similarity > 0)
		.sort((a, b) => b[0] - a[0])
		.map(([_, index]) => objList[index]);
};

export { textSimilarity, textSimilarityObject, calcTextSimilarity };
