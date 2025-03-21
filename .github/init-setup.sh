#!/bin/bash

# Caminho dos hooks dentro de .github/hooks
SOURCE_DIR=".github/hooks"

# Caminho para o diretório .git/hooks
DEST_DIR=".git/hooks"

# Verifica se o diretório de destino .git/hooks existe
if [ ! -d "$DEST_DIR" ]; then
    echo "Diretório $DEST_DIR não encontrado. Certifique-se de que este é um repositório Git válido."
    # exit 1
fi

# Copia todos os hooks do diretório .github/hooks para .git/hooks
echo "Copiando hooks de $SOURCE_DIR para $DEST_DIR..."

cp -r $SOURCE_DIR/* $DEST_DIR/

# Verifica se a cópia foi bem-sucedida
if [ $? -eq 0 ]; then
    echo "Hooks copiados com sucesso!"
else
    echo "Erro ao copiar os hooks."
    # exit 1
fi

exit 0
