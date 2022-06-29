import { fetch } from "meteor/fetch";
import { IResponseCep } from "./CepField";

const getData = async (url: string, data?: any) => {
  const response = await fetch(url);
  try {
    return response.json();
  } catch (e) {
    return null;
  }
};

export const getEnderecoByCep = (
  cepParam: string,
  callback: (error: string | null, response: IResponseCep | null) => void
) => {
  const cep = cepParam.replace(/\D/g, "");

  if (cep.trim().length > 0) {
    const validacep = /^[0-9]{8}$/;

    if (validacep.test(cep))
      getData("//viacep.com.br/ws/" + cep + "/json")
        .then((r) => {
          callback(null, r);
        })
        .catch((e) => {
          callback(e, null);
        });
    else callback("Formato de CEP inválido.", null);
  } else callback("Formato de CEP inválido.", null);
};
