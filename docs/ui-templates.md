# Templates de Interface e Customização pelo Agente de IA

Este documento descreve como temas e layouts de UI podem ser gerenciados e customizados no boilerplate, especialmente com o auxílio do Agente de IA integrado. Os templates de UI referem-se a um conjunto de arquivos que definem a aparência (cores, fontes, etc.) e a estrutura (layouts, AppBar) da interface.

## Estrutura de um Template de UI (Exemplo)

Um template de UI, caso seja fornecido externamente ao Agente para aplicação, normalmente conteria uma estrutura de pastas espelhando partes de `imports/ui/`:

```
exemploDeUiTemplate/
├── materialui/
│   ├── sysColors.ts
│   ├── sysFonts.ts
│   ├── sysSizes.ts
│   ├── sysComponents.ts
│   └── theme.ts
└── templates/
    ├── templateAppBar/
    │   ├── templateAppBar.tsx
    │   └── templateAppBarStyles.tsx
    ├── templateNone/
    │   ├── templateNone.tsx
    │   └── templateNoneStyles.tsx
    └── components/
        └── sysAppBar/
            ├── sysAppBarContext.tsx
            ├── sysAppBarController.tsx
            ├── sysAppBarStyles.tsx
            └── sysAppBarView.tsx
```

*   **`materialui/`**: Contém as definições do tema do Material-UI (cores, fontes, tamanhos, overrides de componentes).
*   **`templates/`**: Contém os layouts principais da aplicação (ex: com AppBar, sem AppBar) e componentes associados como a própria AppBar.

Não há mais um `template_guide.json` ou guias em `ai_agent/guides_ui` sendo utilizados; o Agente de IA agora tem conhecimento inerente sobre como aplicar essas customizações.

## Utilização e Customização pelo Agente de IA

O Agente de IA pode customizar a interface do usuário de duas maneiras principais:

1.  **Aplicar um Template de UI Fornecido Externamente:**
    *   Se você possui um conjunto de arquivos de template (como na estrutura acima) em um local acessível, você pode instruir o Agente de IA a aplicá-lo.
    *   **Exemplo de Instrução:** "Agente, aplique o template de UI localizado em `/caminho/para/meu/exemploDeUiTemplate/`."
    *   **Ação do Agente:** O Agente irá copiar os arquivos relevantes do template fornecido para as pastas correspondentes em `imports/ui/` do projeto, substituindo os arquivos existentes. Por exemplo, `exemploDeUiTemplate/materialui/sysColors.ts` seria copiado para `imports/ui/materialui/sysColors.ts`.

2.  **Customizações Avançadas Baseadas em Descrição:**
    *   Você pode instruir o Agente de IA a realizar modificações específicas na UI com base em uma descrição em linguagem natural.
    *   **Exemplo de Instrução:** "Agente, altere a cor primária do tema para azul escuro (#003366) e use a fonte 'Roboto' como fonte principal."
    *   **Ação do Agente:** O Agente de IA irá:
        *   Analisar a solicitação.
        *   Identificar os arquivos de UI que precisam ser modificados (ex: `imports/ui/materialui/sysColors.ts` para a cor primária, `imports/ui/materialui/sysFonts.ts` para a fonte).
        *   Aplicar as alterações de código necessárias diretamente nesses arquivos.
    *   Consulte [`docs/ui-customization.md`](./ui-customization.md) para detalhes sobre quais arquivos controlam quais aspectos da UI. O Agente utilizará esse conhecimento para realizar as modificações.

## Exemplo de Template: "Basic"
O conceito de um template "basic" (anteriormente em `ai_agent/uiTemplate/basic`) ainda é válido como um conjunto de configurações de tema e layout. Se você tiver esses arquivos, pode instruir o Agente a aplicá-los conforme o item 1 acima. Um tema "basic" poderia, por exemplo, apresentar uma paleta suave em tons de azul e bege e utilizar a fonte "Inter", oferecendo uma alternativa moderna ao tema padrão do boilerplate.

Com estas capacidades, o Agente de IA pode alterar significativamente a identidade visual do boilerplate e adaptá-la rapidamente às suas necessidades, seja aplicando um conjunto predefinido de arquivos de template ou realizando customizações granulares baseadas em descrições.
