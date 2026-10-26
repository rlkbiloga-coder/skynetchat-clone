# Rotas mapeadas — skynetchat.net

Mapeado em navegação real (browser). Stack detectada: SvelteKit (chunks `/_app/immutable/…`), Cloudflare (Turnstile + proteção anti-bot que bloqueia curl com 403), particles.js no fundo, Google Fonts.

## Rotas de URL (server-side)
| Rota | Finalidade | Conteúdo observado |
|---|---|---|
| `/` | App principal (chat) | Hero "Apresentamos o SKYNETchat", composer "Pergunte o que quiser...", sidebar de painéis |
| `/login` | Autenticação | Código de acesso de 12 dígitos (formato 0000-0000-0000), botão ENTRAR, Turnstile |
| `/sign-up` | Criar conta | Gera código secreto de 12 dígitos = única chave de acesso; +18 e termos |
| `/recovery` | Recuperar acesso | Email de recuperação cadastrado recebe o código |

## Painéis do app (client-side, dentro de `/`)
Novo chat · Indique e Ganhe (referral PRO) · Monetize · Atualizações · Imagens (BETA, geração IA) · Conversas em grupo (multi-agente) · Codex (em breve: código/scripts) · Projetos (tarefas/entregas) · Histórico de conversas · Conheça o SKYNETchat · Prompts · Suporte · Fazer login · Tema de fundo (BLACK)

## Identidade visual
- Preto profundo + vermelho (logo "SKYNET vermelha"), estética terminal/hacker
- Badge "SKYNETCHAT ONLINE" verde, tagline "O DIREITO À PRIVACIDADE E O ACESSO IRRESTRITO À INFORMAÇÃO É UM DIREITO UNIVERSAL DE TODOS."
- Rótulos de segurança: E2E | AES-256 | ZERO-TRUST
- Selo de qualidade 4.5; Instagram @skynetchat.ai; Termos de Serviço

## Fidelidade visual (v2)
Telas reconstruídas a partir de capturas reais do site em mobile (home e drawer). Tokens confirmados no CSS original baixado: `input-bg-black #1b1b1b`, `input-glow-black 0 0 15px #ffffff1a`, fontes Inter / Google Sans Flex, Tailwind v4, temas BLACK/RED/WHITE. O CSS original (320KB) e o logo estão em `site_clone_skynetchat.net/` do workspace do agente.

## Mirror 100% (v3)
`mirror/` contém o app real baixado do origin: 103 arquivos, 5.7MB — todo o bundle SvelteKit (entry, chunks, nodes, assets CSS), as 4 páginas SSR (/login, /sign-up, /recovery, /), ícones e imagens, 0 referências quebradas (verificado por script). O Pages publica o mirror como site principal; o React clone fica em frontend/ como base para o seu próprio app.
