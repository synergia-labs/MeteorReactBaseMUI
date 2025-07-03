# --- Estágio 1: O Construtor (Versão Final e Definitiva) ---
# Usamos Node v22 com Debian Bookworm para máxima compatibilidade.
FROM node:22-bookworm AS builder

# Instala o Meteor usando o script oficial.
RUN curl https://install.meteor.com/ | sh

# Garante que o comando 'meteor' seja encontrado de forma explícita.
ENV PATH="/root/.meteor/:${PATH}"

# Permite que o Meteor rode como superusuário.
ENV METEOR_ALLOW_SUPERUSER=true

WORKDIR /app
COPY . .

# Executa os comandos de build, que agora funcionarão.
RUN meteor npm install
RUN meteor build ../output --directory

# --- Estágio 2: O Executor (Versão Final e Definitiva) ---
# Usamos a imagem 'slim' do Node v22 para a execução final.
FROM node:22-bookworm-slim

WORKDIR /app

# Copia os arquivos da pasta 'bundle' que foi criada no estágio anterior.
COPY --from=builder /output/bundle .

RUN cd programs/server && npm install --production @babel/runtime
ENV PORT=3000
CMD ["node", "main.js"]