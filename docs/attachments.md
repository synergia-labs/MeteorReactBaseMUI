# Gerenciamento de anexos

A coleção [`attachmentsCollection`](../imports/api/attachmentsCollection.ts) utiliza o pacote `ostrio:files` para armazenar uploads no servidor. Ela fornece métodos e publicações para lidar com arquivos enviados pelos usuários.

## Funções principais

- **RemoveFile** – método Meteor que exclui o arquivo e seu registro na coleção.
- **find / findOne** – utilitários para recuperar documentos de anexos.
- **serverSaveCSVFile(file, fileName?)** – salva um conteúdo CSV no servidor e retorna a URL gerada.

A coleção é inicializada automaticamente e permite inserir arquivos via componentes do SysForm, como [`sysUploadFile`](../imports/ui/components/sysFormFields/sysUploadFile/sysUploadFile.tsx).

Para acessar um arquivo salvo, utilize `attachmentsCollection.attachments.findOne({_id})?.link()` ou a rota `/cdn/storage/Attachments/<id>/original/<nome>`.
