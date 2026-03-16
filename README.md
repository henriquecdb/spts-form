## SPTS - FORM

### API na Vercel

Este projeto usa Serverless Functions em [api/health.js](api/health.js) e [api/submit.js](api/submit.js) para rodar na Vercel.

Variáveis esperadas:

- DISCORD_SQUAD_WEBHOOK_URL
- DISCORD_PR_WEBHOOK_URL
- DISCORD_WEBHOOK_URL (fallback opcional)

### Desenvolvimento local

Para desenvolvimento local com proxy do Vite:

1. npm run dev
2. npm run dev:server
