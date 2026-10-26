import { Link } from "react-router-dom";

const items = [
  { label: "Novo chat", desc: "Inicie uma conversa do zero" },
  { label: "Indique e Ganhe", desc: "Convide amigos e ganhe assinatura PRO" },
  { label: "Monetize com SKYNETchat", desc: "", tag: "NOVO" },
  { label: "Atualizações", desc: "Veja as novidades e melhorias recentes" },
  { label: "Imagens", desc: "Gere e explore imagens com IA", tag: "BETA" },
  { label: "Conversas em grupo", desc: "Colabore com múltiplos agentes", tag: "NOVO" },
  { label: "Codex", desc: "Código, scripts e automação", tag: "EM BREVE" },
  { label: "Projetos", desc: "Organize tarefas e entregas", tag: "NOVO" },
  { label: "Histórico de conversas", desc: "Revise chats anteriores" },
  { label: "Conheça o SKYNETchat", desc: "Descubra como funciona o projeto" },
  { label: "Prompts", desc: "Prompts úteis para usar com a IA" },
  { label: "Suporte", desc: "Tire dúvidas e fale com o suporte" },
];

/** Sidebar de painéis do app principal (espelho do site real). */
export default function Sidebar({ active, onSelect }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="logo">SKYNET</span>
        <span className="badge-online">ONLINE</span>
      </div>
      <nav>
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            className={active === item.label ? "active" : ""}
            onClick={() => onSelect(item.label)}
          >
            <span>{item.label}</span>
            {item.tag && <em className="tag">{item.tag}</em>}
            {item.desc && <small>{item.desc}</small>}
          </button>
        ))}
      </nav>
      <div className="foot">
        <Link to="/login" className="login-btn">Fazer login</Link>
        <p className="theme">Tema de fundo · BLACK</p>
        <a href="https://instagram.com/skynetchat.ai">@skynetchat.ai</a>
        <p className="terms">Termos de Serviço</p>
      </div>
    </aside>
  );
}
