#!/bin/bash

# Função para verificar se a resposta é s/S/n/N
valida_resposta() {
    while true; do
        read -p "$1" resposta
        case $resposta in
            [sS]|[nN])
                echo $resposta
                return
                ;;
            *)
        esac
    done
}

origem="example"

# Pergunta o nome do novo módulo
read -p "Qual o nome do novo módulo? " destino

# Verifica se o nome do módulo foi fornecido
if [ -z "$destino" ]; then
    echo "Nome do módulo de destino não fornecido."
    exit 1
fi

# Função para converter a primeira letra em maiúscula
capitalize() {
    echo `echo ${1:0:1} | tr  '[a-z]' '[A-Z]'`${1:1}
}

origem_LetraMaiuscula=$(capitalize $origem)
destino_LetraMaiuscula=$(capitalize $destino)

# Caminho do diretório do módulo de origem e destino
originalModulePath="$origem"
newModulePath="$destino"

# Verifica se o diretório de origem existe
if [ ! -d "$originalModulePath" ]; then
    echo "Diretório de origem não encontrado: $originalModulePath"
    exit 1
fi

# Copia a estrutura da pasta
cp -a $originalModulePath $newModulePath

# Entra no diretório de destino
cd $newModulePath

# Função para renomear arquivos
rename_files() {
    find . -type f | while read file; do
        newname=$(echo "$file" | sed "s/$1/$2/")
        if [ "$file" != "$newname" ]; then
            mv "$file" "$newname"
        fi
    done
}

# Renomeia os arquivos
rename_files $origem $destino
rename_files $origem_LetraMaiuscula $destino_LetraMaiuscula

# Atualiza o conteúdo dos arquivos
find ./ -type f -exec sed -i  "s/${origem}/${destino}/g" {} \;
find ./ -type f -exec sed -i  "s/${origem_LetraMaiuscula}/${destino_LetraMaiuscula}/g" {} \;

# Pergunta ao usuário se deseja registrar o módulo no servidor
respostaRegistro=$(valida_resposta "Deseja registrar a api do seu módulo no servidor? (s/n) ")

if [ "$respostaRegistro" = "s" ] || [ "$respostaRegistro" = "S" ]; then
    registerApiFile="../../imports/server/registerApi.ts"
    echo "import '../modules/$destino/api/${destino}ServerApi';" >> $registerApiFile
    echo "Api Registrada em $registerApiFile."
fi

# Move o diretório para a localização final no projeto
mv ../${destino}/ ../../imports/modules/

echo "Módulo '$destino' criado com sucesso em ../../imports/modules/$destino"
echo "Não se esqueça de adicionar o módulo no arquivo /imports/modules/index.ts" 