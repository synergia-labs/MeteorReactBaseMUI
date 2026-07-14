# Anexos e uploads

O boilerplate usa `ostrio:files` por meio de
[`attachmentsCollection.ts`](../imports/api/attachmentsCollection.ts). Os arquivos são privados: upload, consulta,
download e remoção exigem usuário autenticado e são restringidos pelo `userId` gravado nos metadados.

## Configuração

| Variável           | Padrão                        | Finalidade                         |
| ------------------ | ----------------------------- | ---------------------------------- |
| `UPLOADS_DIR`      | `<cwd>/uploads/meteorUploads` | Diretório persistente dos arquivos |
| `MAX_UPLOAD_BYTES` | `15728640` (15 MiB)           | Limite máximo por arquivo          |

Em containers, monte `UPLOADS_DIR` em volume persistente. O banco guarda metadados; copiar apenas o MongoDB não é um
backup completo dos anexos.

## Contrato de upload

O cliente não pode inserir diretamente na coleção (`allowClientCode: false`). O componente de upload envia o arquivo
por meio do transporte do `ostrio:files` e deve incluir ao menos:

```ts
const meta = {
	userId: Meteor.userId(),
	docId: documentoId
};
```

O servidor confere se `meta.userId` é o usuário da conexão, se o tamanho está dentro do limite e se a combinação de
extensão e MIME declarado está na allowlist. São aceitos atualmente imagens raster, PDF, texto/CSV, documentos Office e
OpenDocument. SVG, HTML e compactados não são aceitos.

Não use o valor de `meta.userId` enviado pelo navegador como autorização em código novo. A identidade confiável é
sempre `this.userId`; o metadado serve para materializar o ownership depois da conferência do servidor.

## Listagem e remoção

A publicação `files-attachments` recebe somente o identificador do documento e acrescenta o usuário ao seletor no
servidor:

```ts
const handle = Meteor.subscribe('files-attachments', {
	'meta.docId': documentoId
});
```

Ela publica apenas nome, tamanho, tipo, extensão, metadados e versões dos arquivos pertencentes ao usuário atual.

Para remover um arquivo:

```ts
await Meteor.callAsync('RemoveFile', fileId);
```

O método valida autenticação e ownership antes da exclusão. Uma resposta `false` significa que o arquivo já não
existia; falta de acesso produz `Meteor.Error('not-authorized')`.

## Downloads

Gere o link pela API do `ostrio:files` somente depois que o documento tiver sido recebido pela publicação autorizada.
A opção `protected` volta a conferir o usuário no servidor quando o conteúdo é solicitado.

Não monte URLs privadas manualmente, não persista links como se fossem públicos e não exponha o diretório de uploads
por um servidor estático separado.

## Arquivos gerados no servidor

`serverSaveCSVFile` é uma função interna para CSVs gerados pelo backend. Ela não deve ser chamada a partir de parâmetros
arbitrários do cliente nem usada como modelo para anexos privados de usuário sem antes definir `meta.userId` e
`meta.docId` corretos.

## Limitações conhecidas

A validação atual compara extensão e MIME declarado, mas ainda não verifica magic bytes nem executa antivírus. Para
contextos com arquivos não confiáveis, adicione inspeção do conteúdo durante o streaming, quarentena, scanner e limites
de quantidade/cota por usuário. Downloads vinculados a tenant ou documento de negócio também devem validar esse escopo,
além do ownership individual.
