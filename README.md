# 29Tech · Campanha Outsourcing

Landing page da oferta de outsourcing da 29Tech: especialistas validados dentro do projeto do cliente em até 7 dias úteis, sem custo fixo, sem estrutura interna e sem contrato longo.

## Funcionalidades

- **Landing única** com carrossel da jornada de contratação, vantagens e agendamento de análise gratuita
- **Formulário de qualificação** que envia o lead para uma planilha via Google Apps Script
- **Rastreamento** com Google Analytics e Google Tag Manager para campanhas pagas
- **Multilíngue:** pt-BR, pt-PT, inglês e espanhol

## Stack

React 18 · Vite · TypeScript · Tailwind CSS · shadcn/ui · Framer Motion · i18next (pt-BR, pt-PT, en, es) · Supabase · Google Apps Script (captação de leads) · Vercel

## Como rodar

```sh
cp .env.example .env   # chaves do Supabase, GA e a URL do webhook de leads
npm install
npm run dev
```

Os formulários enviam os leads para um Google Apps Script (`YOUR_APPS_SCRIPT_ID` no código) que grava numa planilha.

---

Desenvolvido por **Marcos Pantoja** · [29Tech](https://www.vintenove.com)
