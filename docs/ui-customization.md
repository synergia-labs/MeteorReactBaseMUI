# Customização da interface

A interface usa Material UI 7. Os tokens e overrides globais ficam em `imports/ui/materialui`; layouts reutilizáveis
ficam em `imports/ui/templates`.

## Mapa de arquivos

| Arquivo            | Responsabilidade                                              |
| ------------------ | ------------------------------------------------------------- |
| `sysColors.ts`     | paleta MUI e tokens `sysText`, `sysBackground` e `sysAction`  |
| `sysFonts.ts`      | família Poppins e escala tipográfica baseada em `fontScale`   |
| `sysSizes.ts`      | espaçamento, raios, tamanhos de controles e limites de layout |
| `sysComponents.ts` | `defaultProps` e `styleOverrides` globais dos componentes MUI |
| `theme.ts`         | extensão dos tipos MUI e montagem final do tema               |
| `styles.ts`        | estilos utilitários compartilhados                            |

Use os tokens do tema em componentes em vez de repetir cores e medidas:

```tsx
<Box
	sx={{
		backgroundColor: (theme) => theme.palette.sysBackground?.bg1,
		color: (theme) => theme.palette.sysText?.body,
		padding: 2
	}}
/>
```

## Cores

Altere os grupos base e o objeto `sysLightPalette` em `sysColors.ts`. Ao mudar uma cor semântica, confira contraste em
texto, hover, foco, estados desabilitados e modo de alto contraste. Preserve `primary.contrastText` e os tokens de ação
correspondentes.

O estado `darkThemeMode` já existe no `AppLayoutProvider`, mas a implementação atual de `getTheme` monta somente a
paleta clara. Para oferecer modo escuro real, crie uma paleta escura completa e selecione-a em `getTheme(options)` antes
de expor o controle ao usuário.

## Tipografia

`SysFonts` define Poppins e todas as variantes, incluindo `button2` e `link`. Ao trocar a família:

1. disponibilize os arquivos localmente ou autorize a origem na CSP;
2. altere `SysFonts.fontFamily`;
3. teste carregamento sem rede e fallback;
4. revise quebras de linha com `fontScale` diferente de 1.

Prefira fontes locais para reduzir dependência externa e melhorar privacidade/previsibilidade.

## Medidas e componentes

Use `sysSizes.ts` para decisões repetidas, como raios, gaps, altura de inputs e padding de conteúdo. Overrides que devem
afetar todo `Button`, `TextField` ou outro componente pertencem a `sysComponents.ts`; ajustes específicos de uma tela
devem ficar próximos ao componente.

Após atualizar um override global, revise formulários, dialogs, tabelas, menu e os playgrounds de componentes. APIs do
MUI mudam entre majors; confirme o contrato da versão 7 em vez de copiar exemplos de MUI 4/5.

## AppBar, menu e marca

Os arquivos da barra superior estão em `imports/ui/templates/components/sysAppBar`. O logo padrão é criado por
`BoilerplateLogo` em `templateAppBar.tsx` e pode ser substituído pela prop `logo` do template.

Ao adicionar ações à AppBar:

- mantenha `aria-label` e navegação por teclado;
- trate largura mobile;
- não baseie autorização apenas na visibilidade do item;
- carregue recursos pesados sob demanda.

Favicon, manifest, imagens e fontes públicas ficam em `public`. Atualize também nomes/cores do manifest ao trocar a
identidade visual.

## Componentes globais

`AppLayoutProvider` disponibiliza notificações, drawer, dialog, modal e janela pelo contexto. Use essas funções em vez de
criar providers paralelos por módulo. Feche listeners e Promises de UI no unmount quando aplicável.

## Checklist visual

- [ ] contraste WCAG e foco visível;
- [ ] navegação completa por teclado;
- [ ] layouts em larguras mobile, tablet e desktop;
- [ ] zoom e `fontScale` maior;
- [ ] loading, vazio, erro e conteúdo longo;
- [ ] tema sem cores hardcoded desnecessárias;
- [ ] typecheck e páginas de teste visual aprovados.

Consulte também [Templates de interface](ui-templates.md).
