# Templates de interface

Um template define a moldura da rota; o módulo continua responsável pelo conteúdo. A seleção é feita por
[`getTemplate.tsx`](../imports/ui/templates/getTemplate.tsx).

## Templates disponíveis

| Variante                    | Uso                                                |
| --------------------------- | -------------------------------------------------- |
| `SysTemplateOptions.AppBar` | áreas autenticadas com barra superior e menu       |
| `SysTemplateOptions.None`   | login, recuperação e telas sem navegação principal |

O `AppLayoutProvider` define `AppBar` como padrão e fornece os itens de menu obtidos das rotas. Uma rota pode substituir
`templateVariant`, `templateMenuOptions` e `templateProps` conforme os tipos da configuração de rotas.

## AppBar

`TemplateAppBar` aceita:

- `menuOptions`: itens permitidos do menu;
- `logo`: marca React customizada;
- `containerProps`: props MUI aplicadas ao container de conteúdo;
- `children`: conteúdo da rota.

Estrutura relevante:

```text
imports/ui/templates/
  getTemplate.tsx
  templateAppBar/
  templateNone/
  components/sysAppBar/
```

## Criando uma variante

1. crie uma pasta em `imports/ui/templates/<nome>` com componente e estilos;
2. implemente o contrato `ISysTemplateProps`;
3. acrescente a variante a `SysTemplateOptions`;
4. registre o componente no mapa `templates` de `getTemplate.tsx`;
5. aplique-a somente às rotas necessárias;
6. teste menu vazio, conteúdo longo, mobile, acesso por teclado e erro de rota.

Exemplo mínimo:

```tsx
const TemplateCentered: React.FC<ISysTemplateProps> = ({ children }) => (
	<Box component="main" sx={{ minHeight: '100dvh', display: 'grid', placeItems: 'center' }}>
		{children}
	</Box>
);
```

Não copie uma árvore externa sobre `imports/ui` sem revisar o diff: templates podem depender de versões diferentes do
MUI, remover providers globais ou quebrar as regras de rota e segurança.

## Menu e autorização

O menu é uma representação da configuração de rotas, não uma barreira de segurança. A ausência de um item melhora a
experiência, mas métodos e publicações ainda precisam validar papel, recurso e documento no servidor.

Ao criar uma variante nova, preserve o tratamento de rotas lazy, error boundary, notificações e dialogs fornecidos pelo
layout da aplicação.

Para cores, fontes e overrides globais, consulte [Customização da interface](ui-customization.md).
