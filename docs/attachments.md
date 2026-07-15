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

## Integração offline-first com Flutter

O módulo `Example` expõe um contrato DDP adicional para clientes mobile. O Flutter gera o `_id` antes de sincronizar,
mantém documentos e metadados em SQLite e usa estes métodos:

| Método                     | Responsabilidade                                                         |
| -------------------------- | ------------------------------------------------------------------------ |
| `example.mobilePull`       | Alterações incrementais e tombstones, paginados por `lastupdate`         |
| `example.mobileGet`        | Snapshot completo usado na resolução de conflito                         |
| `example.mobileUpsert`     | Insert/update idempotente com controle otimista por `baseVersion`        |
| `example.mobileAssetsPage` | Catálogo paginado de imagens, áudios, anexos e mídias legadas            |
| `example.uploadAssetChunk` | Upload retomável em blocos de até 192 KiB, validado por offset e SHA-256 |
| `example.removeAsset`      | Remoção idempotente de um asset autorizado                               |

Há três categorias de asset: `image`, `audio` e `attachment`. Imagens e áudios podem ser baixados automaticamente pelo
app para uso offline; anexos sincronizam metadados e URL e são baixados sob demanda. Os campos base64 legados `image` e
`audio` continuam disponíveis no catálogo por URLs `/img` e `/audio`, mas não são enviados dentro de `mobilePull`.

O upload mobile deve informar `assetId`, `exampleId`, `name`, `mimeType`, `kind`, `size`, `checksum`, `offset`, `data`
(base64) e `isLast`. O servidor mantém o `.part` em diretório temporário isolado por usuário/documento, confirma o
próximo offset e só promove o arquivo ao storage persistente depois de validar tamanho e SHA-256.

As URLs retornadas no catálogo carregam `MEDIA_ACCESS_TOKEN` quando a proteção está ativa, inclusive para arquivos do
`ostrio:files`. Isso permite que o cliente HTTP do Flutter faça streaming sem tornar o diretório de uploads público. Em
produção, configure um token estável; caso ele mude após reiniciar o servidor, URLs guardadas no cache mobile deixam de
ser válidas até o próximo `mobileAssetsPage`.

Ao excluir um Example, o backend grava um tombstone e remove seus assets. Mantenha os índices de `lastupdate`,
`deletedAt/documentId` e `meta.docId/meta.fieldName/uploadedAt`, criados em `imports/server/databaseIndexes.ts`.

### Fluxo de validação

1. Salve um Example na Web com imagem, áudio gravado e PDF.
2. Sincronize no Flutter e confirme imagem/áudio offline e PDF sob demanda.
3. No Flutter offline, edite o documento e adicione mídia; reconecte e confirme o upload retomável na Web.
4. Edite o mesmo registro na Web e no Flutter antes de sincronizar e confirme o erro `sync-conflict`.
5. Exclua mídia e o documento em cada cliente e confirme a remoção no outro após `mobilePull`.

## Limitações conhecidas

A validação atual compara extensão e MIME declarado, mas ainda não verifica magic bytes nem executa antivírus. Para
contextos com arquivos não confiáveis, adicione inspeção do conteúdo durante o streaming, quarentena, scanner e limites
de quantidade/cota por usuário. Downloads vinculados a tenant ou documento de negócio também devem validar esse escopo,
além do ownership individual.
