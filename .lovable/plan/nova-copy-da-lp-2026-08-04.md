# Nova copy da /lp

Atualizar toda a copy da landing `/lp` conforme o texto enviado, mantendo layout, design e animações atuais.

## O que muda

1. **Header** — botão passa a ser "Quero Alocar um Especialista" (logo branca segue igual).
2. **Hero** — eyebrow "Outsourcing de Desenvolvimento", H1 "Seu time de desenvolvimento, sem montar um", novo subtítulo, CTA "Quero Alocar um Especialista" e nova barra de prova social (+100 empresas · 7 dias úteis · garantia 90 dias · churn < 8%).
3. **Curto Prazo** — novo título de bloco e textos dos 3 cards ("Time em até 7 Dias Úteis" no lugar de "Time em Dias").
4. **Médio Prazo** — novo título de bloco e textos dos 3 cards.
5. **Prova Social** — substitui a seção "Conheça nossa jornada"/carrossel: logos/nomes (ClickMenos, Campori Online, IASD, UNB) e 2 depoimentos (Rafael Tavares, Daniel Carvalho).
6. **Como Funciona** — título "Três passos até o especialista certo" e novas descrições dos 3 passos.
7. **Proposta de Valor** — título "Comece com R$ 2.000/mês e teste o modelo sem risco", texto de apoio e novos textos dos 3 cards.
8. **FAQ (novo)** — seção em accordion com as 4 perguntas/respostas enviadas, antes do CTA final.
9. **CTA Final** — novo texto de apoio, botão "Agende uma análise gratuita" e mensagens de sucesso/erro conforme enviado.
10. **Rodapé** — "© 2026 29Tech. Todos os direitos reservados."

## Detalhes técnicos

- Edição concentrada em `src/pages/LandingPage.tsx` (arrays de conteúdo + JSX das seções).
- Nova seção de FAQ usando o componente Accordion do shadcn já disponível.
- Seção de prova social criada no mesmo padrão visual das demais; `JourneyCarousel` deixa de ser usado na página (componente permanece no projeto para uso futuro pós-CTA).
- Título e meta description do `index.html` ajustados para a nova headline.
- Sem mudanças na lógica do formulário nem no envio para a planilha.
