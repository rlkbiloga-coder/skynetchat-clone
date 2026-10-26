# Mapeamento do backend — SKYNETchat

Inferência por comportamento observado publicamente (sem acesso ao código). Como o Cloudflare bloqueia chamadas diretas, os endpoints exatos só são visíveis no seu navegador logado (passo a passo no fim).

## Autenticação (observado na UI)
1. **Sem senha/email**: o acesso é por **código de 12 dígitos** gerado no `/sign-up`
   - Modelo: `code` único por conta, hash no servidor (nunca plaintext), sessão via cookie/token
   - `/sign-up` → server gera código, grava, auto-login (cookie de sessão)
   - `/login` → valida código, abre sessão
   - `/recovery` → email opcional cadastrado; envia o código por email
   - Cloudflare Turnstile protege os formulários (anti-bot)
2. **Sessão**: cookie httpOnly provável (auto-login persistente após gerar código)

## Funcionalidades visíveis (dependências de backend)
| Feature | Backend provável |
|---|---|
| Chat IA | streaming SSE/WebSocket, provedor LLM com fallback, "sem censura" |
| Pesquisar na web | busca + leitura de páginas, resultado pro modelo |
| Gerar imagens | API de geração (ex: SD/Flux) |
| Histórico | persistência de conversas por conta |
| Projetos | CRUD de projetos/tarefas por conta |
| Prompts | biblioteca de prompts (pública ou por conta) |
| Grupos | conversas multi-agente, roteamento entre modelos |
| Indique e Ganhe | referral: convites → crédito PRO |
| Monetize | programa de afiliados/renda |
| Tema | preferência persistida por conta (BLACK default) |
| Perfil/conta | gerenciar código, email de recuperação, plano, tema (painel pós-login) |

## Referência de implementação
`backend/` neste repo: FastAPI com o fluxo de auth por código (gerar/login/recuperação), SQLite, testes — ponto de partida para o seu próprio backend.

## Como confirmar os endpoints reais (você é a dona)
1. Abra o site logada no Chrome → F12 → aba Network
2. Use o app (enviar mensagem, abrir histórico, trocar tema)
3. Filtre Fetch/XHR: anote método, URL e payload de cada chamada
4. Clique com o direito → "Save all as HAR" e me envie: eu documento endpoint por endpoint
