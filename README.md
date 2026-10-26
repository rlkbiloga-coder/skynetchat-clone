# skynetchat-clone

Clone da interface do SKYNETchat (https://skynetchat.net) + mapeamento de rotas e backend para você construir o seu.

- `frontend/` — React (Vite) com as telas reais: app principal (sidebar de painéis + chat), /login (código 0000-0000-0000), /sign-up, /recovery
- `backend/` — FastAPI de referência com o fluxo de auth por código de 12 dígitos (hash no servidor, sessão por token, 5 testes)
- `docs/ROUTES.md` — todas as rotas mapeadas na navegação real
- `docs/BACKEND-MAPPING.md` — como o backend funciona (inferência) + passo a passo para confirmar endpoints com F12/HAR

## Rodar
```
cd frontend && npm install && npm run dev
cd backend && pip install -r requirements.txt && uvicorn app.main:app --reload
```

## Testes
backend: `pytest -q` (5) · frontend: `npm test` (3) · build: `npm run build`
