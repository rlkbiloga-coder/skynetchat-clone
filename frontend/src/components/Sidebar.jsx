import { Link } from "react-router-dom";
import {
  IconBell, IconBook, IconChat, IconClose, IconCode, IconEdit, IconFolder,
  IconGift, IconHistory, IconImage, IconInstagram, IconLife, IconMoney,
  IconTheme, IconUser, IconUsers,
} from "./Icons.jsx";

const items = [
  { label: "Novo chat", desc: "Inicie uma conversa do zero", icon: IconEdit },
  { label: "Indique e Ganhe", desc: "Convide amigos e ganhe assinatura PRO", icon: IconGift },
  { label: "Monetize com SKYNETchat", tag: "NOVO", icon: IconMoney },
  { label: "Atualizações", desc: "Veja as novidades e melhorias recentes", icon: IconBell },
  { label: "Imagens", tag: "BETA", desc: "Gere e explore imagens com IA", icon: IconImage },
  { label: "Conversas em grupo", tag: "NOVO", desc: "Colabore com múltiplos agentes", icon: IconUsers },
  { label: "Codex", tag: "EM BREVE", desc: "Código, scripts e automação", icon: IconCode },
  { label: "Projetos", tag: "NOVO", desc: "Organize tarefas e entregas", icon: IconFolder },
  { label: "Histórico de conversas", desc: "Revise chats anteriores", icon: IconHistory },
  { label: "Conheça o SKYNETchat", desc: "Descubra como funciona o projeto", icon: IconBook },
  { label: "Prompts", desc: "Prompts úteis para usar com a IA", icon: IconChat },
  { label: "Suporte", desc: "Tire dúvidas e fale com o suporte", icon: IconLife },
];

/** Drawer lateral: replica do menu mobile do site (print 20:47). */
export default function Sidebar({ open, onClose, active, onSelect }) {
  return (
    <>
      <div className={`scrim ${open ? "show" : ""}`} onClick={onClose} />
      <aside className={`drawer ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="drawer-head">
          <div className="brand">
            <img src={`${import.meta.env.BASE_URL}skynet-logo-vermelha.png`} alt="" className="brand-logo" />
            <span>SKYNETchat</span>
          </div>
          <button type="button" className="icon-btn muted" onClick={onClose} aria-label="Fechar menu">
            <IconClose />
          </button>
        </div>
        <nav className="drawer-list">
          {items.map(({ label, desc, tag, icon: Icon }) => (
            <button
              key={label}
              type="button"
              className={`drawer-item ${active === label ? "active" : ""}`}
              onClick={() => { onSelect(label); onClose(); }}
            >
              <Icon className="di-icon" />
              <span className="di-text">
                <span className="di-title">
                  {label}
                  {tag && <em className="tag">{tag}</em>}
                </span>
                {desc && <small>{desc}</small>}
              </span>
            </button>
          ))}
        </nav>
        <div className="drawer-foot">
          <Link to="/login" className="drawer-item plain" onClick={onClose}>
            <IconUser className="di-icon" />
            <span className="di-title">Fazer login</span>
          </Link>
          <button type="button" className="theme-row">
            <IconTheme className="di-icon accent" />
            <span>Tema de fundo</span>
            <em className="pill">BLACK</em>
          </button>
          <a className="insta" href="https://instagram.com/skynetchat.ai" target="_blank" rel="noopener noreferrer">
            <IconInstagram />
            <span>
              <strong>Nos siga no Instagram</strong>
              <small>@skynetchat.ai</small>
            </span>
          </a>
          <p className="terms">Termos de Serviço</p>
        </div>
      </aside>
    </>
  );
}
