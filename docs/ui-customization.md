# Guia de Customização da Interface (UI) - MeteorReactBaseMUI

Esta seção detalha como personalizar todos os aspectos visuais do boilerplate **MeteorReactBaseMUI**, desde temas do Material-UI até a estrutura de layouts, AppBar e menus. As instruções referenciam principalmente os arquivos contidos em `imports/ui/`. Este guia é essencial para desenvolvedores e Agentes de IA que precisam realizar modificações visuais.

## Sumário

1.  [Visão Geral da Estrutura de UI](#1-visao-geral-da-estrutura-de-ui)
2.  [Definindo o Tema Material-UI](#2-definindo-o-tema-material-ui)
    *   [Cores (`sysColors.ts`)](#21-cores-syscolorsts)
    *   [Fontes (`sysFonts.ts`)](#22-fontes-sysfontsts)
    *   [Tamanhos e Espaçamentos (`sysSizes.ts`)](#23-tamanhos-e-espacamentos-syssizests)
    *   [Overrides de Componentes (`sysComponents.ts`)](#24-overrides-de-componentes-syscomponentsts)
    *   [Montagem do Tema (`theme.ts`)](#25-montagem-do-tema-themets)
3.  [Layouts e Templates](#3-layouts-e-templates)
    *   [Modificando Templates Existentes](#31-modificando-templates-existentes)
    *   [Criando Novos Templates](#32-criando-novos-templates)
4.  [AppBar e Menus](#4-appbar-e-menus)
    *   [Customizando a `SysAppBar`](#41-customizando-a-sysappbar)
    *   [Customizando `SysMenu`](#42-customizando-sysmenu)
5.  [Identidade Visual e Assets](#5-identidade-visual-e-assets)
6.  [Interpretação de Solicitações de UI pelo Agente de IA](#6-interpretacao-de-solicitacoes-de-ui-pelo-agente-de-ia)
7.  [Dicas Adicionais](#7-dicas-adicionais)

---

## 1. Visão Geral da Estrutura de UI

O diretório `imports/ui/` centraliza os aspectos visuais:

-   **`appComponents/`**: Componentes globais via `AppLayoutContext` (ex: `showDialog`, `showNotification`).
-   **`components/`**: Componentes reutilizáveis (ex: `SysForm`, `ComplexTable`, `SysIcon`).
-   **`layoutComponents/`**: Elementos de layout estilizados e utilitários (ex: `SysSectionPaddingXY`).
-   **`materialui/`**: **Principal local para customização de tema.** Contém definições de cores, fontes, tamanhos e overrides de componentes do Material-UI.
-   **`templates/`**: Implementações dos layouts principais da aplicação (ex: `templateAppBar/` para telas internas, `templateNone/` para telas como login).

A aplicação é envolvida pelo `AppLayoutProvider` (em `imports/app/appLayoutProvider/appLayoutProvider.tsx`), que fornece o tema Material-UI e contextos globais.

---

## 2. Definindo o Tema Material-UI

Localizado em `imports/ui/materialui/`.

### 2.1. Cores (`sysColors.ts`)

Define as paletas de cores (`primary`, `secondary`, `tertiary`, `error`, `warning`, `info`, `success`) e tokens de cores semânticas (`sysText`, `sysBackground`, `sysAction`).

**Para alterar a cor primária para um azul específico:**
```typescript
// Em: imports/ui/materialui/sysColors.ts
import { PaletteOptions } from '@mui/material/styles';
import { визуализаторLogotipo } from './theme'; // Supondo que isso venha do theme.ts ou similar

// Exemplo para o tema claro (sysLightPalette)
export const sysLightPalette: PaletteOptions = {
  // ... outras configurações de modo, etc. ...
  primary: {
    main: '#1976D2', // Seu novo azul principal
    light: '#42A5F5', // Um tom mais claro
    dark: '#1565C0',  // Um tom mais escuro
    contrastText: '#FFFFFF', // Texto que contrasta com 'main'
  },
  secondary: {
    main: '#FFA000', // Exemplo: um laranja como secundário
    light: '#FFB74D',
    dark: '#F57C00',
    contrastText: '#000000',
  },
  sysBackground: { // Cores de fundo semânticas
    default: '#F4F6F8',
    paper: '#FFFFFF',
    secondary: '#E3E3E3',
    component: '#F0F0F0',
  },
  sysText: { // Cores de texto semânticas
    primary: '#212B36',
    secondary: '#637381',
    disabled: '#919EAB',
    label: '#454F5B',
  },
  // ... outras paletas e tokens ...
};

// Faça o mesmo para sysDarkPalette se estiver usando modo escuro.
export const sysDarkPalette: PaletteOptions = { /* ... */ };
```
**Agente de IA:** Ao ser instruído "Mude a cor primária para X e a secundária para Y", modifique `sysLightPalette.primary.main`, `sysLightPalette.secondary.main` (e seus derivados `light`, `dark`, `contrastText`) e, se aplicável, `sysDarkPalette`.

### 2.2. Fontes (`sysFonts.ts`)

Especifica a família de fontes principal e a escala tipográfica (tamanhos para `h1`-`h6`, `body1`, `button`, etc.).

**Para alterar a fonte principal para 'Roboto':**
```typescript
// Em: imports/ui/materialui/sysFonts.ts
import { TypographyOptions } from '@mui/material/styles/createTypography';

export const fontFamily = '"Roboto", "Helvetica", "Arial", sans-serif'; // Nova fonte

export const typographyOptions = (fontScale: number = 1): TypographyOptions => ({
  fontFamily: fontFamily, // Aplicar a nova família de fontes
  h1: {
    fontWeight: 700,
    fontSize: `${3.5 * fontScale}rem`, // Exemplo de ajuste com fontScale
    lineHeight: 1.2,
  },
  // ... outras definições de h2, h3, body1, etc. ...
  body1: {
    fontSize: `${1 * fontScale}rem`,
    lineHeight: 1.5,
  },
  button: {
    fontWeight: 600,
    textTransform: 'none', // Exemplo: botões sem todas maiúsculas
  },
});
```
**Agente de IA:** Ao ser instruído "Use a fonte X", modifique a constante `fontFamily` e garanta que `typographyOptions` a utilize. Se a fonte não for padrão (ex: 'Open Sans', 'Lato'), o Agente deve lembrar o usuário de importá-la no CSS global ou via tag `<link>` no `client/main.html`.

### 2.3. Tamanhos e Espaçamentos (`sysSizes.ts`)

Centraliza valores para `borderRadius`, `spacing` (usado pelo `theme.spacing()`), `maxWidths` para contêineres, etc.

**Para alterar o `borderRadius` padrão:**
```typescript
// Em: imports/ui/materialui/sysSizes.ts
export const sysSizes = {
  borderRadius: 4, // Novo valor (ex: 8 para bordas mais arredondadas)
  spacing: 8, // Unidade base para theme.spacing(1) = 8px
  // ... outros tamanhos ...
  maxWidths: {
    xs: '444px',
    sm: '600px',
    md: '900px', // Largura padrão para conteúdo principal
    lg: '1200px',
    xl: '1536px',
  },
};
```
**Agente de IA:** Ao ser instruído "Aumente o arredondamento das bordas dos componentes", modifique `sysSizes.borderRadius`.

### 2.4. Overrides de Componentes (`sysComponents.ts`)

Permite customizar o estilo e props padrão de componentes Material-UI globalmente (ex: `MuiButton`, `MuiTextField`).

**Para alterar a aparência padrão de todos os botões contidos:**
```typescript
// Em: imports/ui/materialui/sysComponents.ts
import { Components, Theme } from '@mui/material/styles'; // Importar Theme

export const sysComponents = (theme: Theme): Components<Omit<Theme, 'components'>> => ({ // Adicionar (theme: Theme)
  MuiButton: {
    styleOverrides: {
      root: { // Estilo para todos os botões
        borderRadius: theme.shape.borderRadius * 2, // Ex: bordas mais arredondadas para botões
        textTransform: 'none', // Botões sem todas maiúsculas
      },
      containedPrimary: { // Estilo específico para botões contidos primários
        backgroundColor: theme.palette.primary.dark, // Ex: usar a cor escura da paleta primária
        '&:hover': {
          backgroundColor: theme.palette.primary.main,
        },
      },
    },
  },
  MuiTextField: { // Exemplo para MuiTextField
    defaultProps: {
      variant: 'outlined', // Todos os TextFields serão 'outlined' por padrão
      size: 'small',
    },
  },
  // ... outros overrides ...
});
```
**Agente de IA:** Ao ser instruído "Faça todos os botões terem cantos mais arredondados", modifique `MuiButton.styleOverrides.root.borderRadius` em `sysComponents.ts`.

### 2.5. Montagem do Tema (`theme.ts`)

Combina todas as partes (cores, fontes, tamanhos, componentes) para criar o objeto de tema final usado pelo `ThemeProvider`.

```typescript
// Em: imports/ui/materialui/theme.ts
import { createTheme, ThemeOptions, PaletteOptions } from '@mui/material/styles';
import { typographyOptions, fontFamily } from './sysFonts';
import { sysLightPalette, sysDarkPalette } from './sysColors'; // Supondo que você tem paletas separadas
import { sysSizes } from './sysSizes';
import { sysComponents } from './sysComponents';

interface IGetThemeOptions {
  fontScale?: number;
  darkMode?: boolean;
}

export const getTheme = (options: IGetThemeOptions = {}) => {
  const { fontScale = 1, darkMode = false } = options;
  const currentPalette: PaletteOptions = darkMode ? sysDarkPalette : sysLightPalette;

  const themeOptions: ThemeOptions = {
    palette: currentPalette,
    typography: typographyOptions(fontScale),
    shape: {
      borderRadius: sysSizes.borderRadius,
    },
    spacing: sysSizes.spacing,
    // Outras configurações globais do tema
  };

  let theme = createTheme(themeOptions);
  // Aplicar overrides de componentes passando o tema para que possam usar suas variáveis
  theme = createTheme(theme, { components: sysComponents(theme) });

  return theme;
};
```
**Agente de IA:** Para ativar o modo escuro por padrão, o Agente pode modificar o valor padrão de `darkMode` em `AppLayoutContext` ou onde `getTheme` é chamado. Para alterar o `palette.mode` dinamicamente, isso é feito via `AppLayoutContext.setDarkMode()`.

---

## 3. Layouts e Templates

Localizados em `imports/ui/templates/`. Os principais são `templateAppBar/` e `templateNone/`.

### 3.1. Modificando Templates Existentes

*   **Estrutura HTML/JSX:** Edite o arquivo `.tsx` do template (ex: `templateAppBar.tsx`) para alterar a disposição dos elementos, adicionar novos containers, etc.
*   **Estilos:** Edite o arquivo `*Styles.tsx` correspondente (ex: `templateAppBarStyles.tsx`) para ajustar espaçamentos, larguras, cores de fundo específicas do layout, e responsividade.

**Exemplo: Alterar a largura máxima do conteúdo em `templateAppBar`:**
```typescript
// Em: imports/ui/templates/templateAppBar/templateAppBarStyles.tsx
// Supondo que exista um container como este:
export const MainContentContainer = styled(Container)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginTop: `calc(${theme.mixins.toolbar.minHeight}px + ${theme.spacing(1)})`, // Ajuste conforme altura da AppBar
  maxWidth: theme.breakpoints.values.lg, // Mudar para 'md' ou um valor fixo '900px'
  marginLeft: 'auto',
  marginRight: 'auto',
}));
```
**Agente de IA:** Ao ser instruído "Reduza a largura do conteúdo principal para 900px", modifique `maxWidth` no estilo do container de conteúdo principal do template relevante.

### 3.2. Criando Novos Templates

1.  Crie uma nova pasta em `imports/ui/templates/` (ex: `myCustomTemplate/`).
2.  Dentro dela, crie `myCustomTemplate.tsx` e `myCustomTemplateStyles.tsx`.
3.  Implemente a estrutura e estilos do seu novo template.
4.  Adicione uma nova opção ao enum `SysTemplateOptions` em `imports/ui/templates/getTemplate.tsx`.
5.  Atualize a lógica em `getTemplate.tsx` para retornar seu novo template com base em alguma condição (ex: um novo `templateType` na definição da rota).

---

## 4. AppBar e Menus

### 4.1. Customizando a `SysAppBar`

Localizada em `imports/ui/templates/components/sysAppBar/`.

*   **Lógica (`sysAppBarController.tsx`):** Modifique para alterar o comportamento de abertura de menus, ações de logout, ou navegação.
*   **Estrutura Visual (`sysAppBarView.tsx`):** Altere para adicionar/remover botões, mudar o logo, ou reorganizar elementos.
    **Exemplo: Adicionar um novo botão de "Notificações" à AppBar:**
    ```tsx
    // Em: imports/ui/templates/components/sysAppBar/sysAppBarView.tsx
    // ... (importações: IconButton, NotificationsIcon from '@mui/icons-material') ...
    // Dentro do <Toolbar>, adicione:
    <IconButton color="inherit" aria-label="notificações">
      <Badge badgeContent={4} color="error"> {/* Exemplo de badge */}
        <NotificationsIcon />
      </Badge>
    </IconButton>
    ```
*   **Estilos (`sysAppBarStyles.tsx`):** Ajuste cores de fundo, altura, espaçamentos, e visibilidade responsiva da AppBar.

### 4.2. Customizando `SysMenu`

Localizado em `imports/ui/components/sysMenu/`.

*   **Aparência dos Itens (`sysMenuItemStyles.ts` ou `sysMenuItemView.tsx`):** Modifique para alterar o estilo de `ListItemIcon`, `ListItemText`, etc.
*   **Estilo do "Papel" do Menu (`sysMenuStyles.ts`):** Altere `PaperProps` no `Menu` do Material-UI para mudar a elevação, cor de fundo do dropdown, etc.

---

## 5. Identidade Visual e Assets

-   **Logotipo:** O logo padrão na `SysAppBar` é geralmente um componente React (ex: `BoilerplateLogo`) em `templateAppBar.tsx` ou `sysAppBarView.tsx`. Substitua este componente pelo seu SVG ou `<img>`.
-   **Favicon:** Substitua os arquivos em `public/images/icons-*.png` e `public/favicon.ico`. Atualize `public/manifest.json`.
-   **Outras Imagens e Fontes:** Adicione em `public/fonts/` ou `public/images/` e referencie-os no seu CSS ou componentes. Para fontes, lembre-se de importá-las (veja seção 2.2).

---

## 6. Interpretação de Solicitações de UI pelo Agente de IA

Quando um Agente de IA recebe uma solicitação de customização visual, ele deve:

1.  **Analisar a Solicitação:**
    *   "Quero um tema mais escuro": Implica alterar `palette.mode` para `'dark'` em `imports/ui/materialui/theme.ts` (ou no `AppLayoutContext` se for dinâmico) e garantir que `sysDarkPalette` em `sysColors.ts` esteja bem definida.
    *   "Mude a cor dos botões primários para verde": Implica modificar `sysLightPalette.primary.main` em `sysColors.ts` para verde, ou, se for apenas para botões e não a cor primária global, adicionar/modificar um override para `MuiButton.styleOverrides.containedPrimary` em `sysComponents.ts`.
    *   "Aumente o espaçamento entre os itens do menu lateral": Implica modificar os estilos em `sysMenuItemStyles.ts` ou onde o menu lateral é renderizado.
    *   "O layout da página de perfil precisa de uma barra lateral": Implica criar um novo template ou modificar um existente, e ajustar as rotas para usá-lo para a página de perfil.

2.  **Identificar Arquivos Alvo:** Com base na análise, determinar quais arquivos em `imports/ui/materialui/`, `imports/ui/templates/`, ou componentes específicos precisam ser modificados.

3.  **Aplicar Modificações de Código:** Realizar as alterações necessárias nos arquivos identificados.
    *   **Cores e Fontes:** Principalmente em `sysColors.ts` e `sysFonts.ts`.
    *   **Estilo Global de Componentes:** Em `sysComponents.ts`.
    *   **Estrutura de Layout (AppBar, corpo da página):** Em `imports/ui/templates/` (ex: `templateAppBar.tsx`, `templateAppBarStyles.tsx`, `sysAppBarView.tsx`).

**Exemplo de Interação com Agente:**
*   **Usuário:** "Agente, faça a AppBar ter um fundo gradiente de azul escuro para azul claro."
*   **Agente (pensamento):**
    1.  A AppBar é definida em `SysAppBar`.
    2.  Seu estilo visual está em `sysAppBarStyles.tsx`.
    3.  Preciso modificar o `background` do componente `StyledAppBar` (ou similar) nesse arquivo.
*   **Agente (ação):** Modifica `imports/ui/templates/components/sysAppBar/sysAppBarStyles.tsx`:
    ```typescript
    // Em sysAppBarStyles.tsx, dentro do styled component para a AppBar
    background: 'linear-gradient(to right, #0D47A1, #42A5F5)', // Azul escuro para azul claro
    ```

---

## 7. Dicas Adicionais

1.  **`AppLayoutContext`:** Use para funções globais (`showDialog`, `showNotification`) e para alterar `darkMode` e `fontScale` dinamicamente.
2.  **Responsividade:** Utilize os utilitários em `layoutComponents/` e as funcionalidades de breakpoint do Material-UI (`theme.breakpoints.up('sm')`, etc.) nos seus estilos.
3.  **Consistência:** Ao criar novos componentes, consulte `sysComponents.ts` e `sysSizes.ts` para manter a consistência visual com o resto da aplicação.

Com estas referências, tanto desenvolvedores quanto Agentes de IA podem adaptar completamente a interface do **MeteorReactBaseMUI**, mantendo uma identidade visual consistente e aproveitando os recursos de tema e layout já estruturados.
