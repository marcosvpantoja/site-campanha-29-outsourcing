# Landing Page de Captura (/lp)

Reescrever a rota `/lp` como uma página de captura de leads focada em terceirização de time de desenvolvimento, mantendo a identidade 29Tech (laranja #FF4400, preto, Bricolage Grotesque) e sem alterar a home `/`.

## Estrutura da página

1. **Header** — logo 29Tech (branca) fixo no topo, com botão "Começar Agora" que rola até o formulário.
2. **Hero** — título "Terceirize seu Time de Desenvolvimento", subtítulo de apoio e CTA "Começar Agora". Fundo escuro/laranja com o tratamento visual já usado no projeto.
3. **Benefícios de Curto Prazo** — 3 cards: Economia de Custo Fixo, Time em Dias, Flexibilidade Total.
4. **Benefícios de Médio Prazo** — 3 cards: ROI Comprovado, Conhecimento que Fica, Escalabilidade sem Estrutura.
5. **Case** — bloco com espaço reservado para imagem (placeholder vazio no padrão da marca), pronto para você subir a imagem depois.
6. **Como Funciona** — 3 passos numerados: Você Define, Validamos, Alocamos.
7. **Proposta de Valor** — destaque "A partir de R$ 2.000 = 10 horas de desenvolvimento" + 3 cards: Risco Zero, Escalabilidade, Qualidade.
8. **CTA Final** — "Agende uma análise gratuita" com formulário de captura (nome, WhatsApp, e-mail) e botão de envio.

## Formulário

- Campos: Nome, WhatsApp (com máscara igual à já usada no site) e E-mail.
- Envio para a mesma planilha do Google Sheets já usada hoje (Apps Script Web App, `mode: no-cors`), incluindo data/hora.
- Estado de carregamento no botão e mensagem de sucesso/erro após o envio.
- Todos os CTAs da página ("Começar Agora", CTAs intermediários) rolam suavemente até esse formulário.

## Detalhes técnicos

- Reescrita completa de `src/pages/LandingPage.tsx`; rota `/lp` em `App.tsx` permanece igual.
- Sem novos arquivos de rota, sem mudanças na home nem em componentes compartilhados.
- Estilos apenas com tokens semânticos do design system (`bg-background`, `text-foreground`, `bg-primary`, etc.), responsivo mobile-first, tipografia fluida com `clamp`.
- Animações leves de entrada com framer-motion, no mesmo padrão do restante do site.
- Título e meta description da página ajustados para o tema de terceirização de time de desenvolvimento.
