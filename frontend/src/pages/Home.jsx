import { useState } from "react";
import { IconBrain, IconChevron, IconCode, IconEdit, IconGlobe, IconImage, IconMenu, IconMic, IconPlus, IconTheme, IconWave } from "../components/Icons.jsx";
import Sidebar from "../components/Sidebar.jsx";

const actions = [
  { label: "Pesquisar", icon: IconGlobe, color: "#3b82f6" },
  { label: "Gerar Imagens", icon: IconImage, color: "#eab308" },
  { label: "Persuasão", icon: IconBrain, color: "#dc2626" },
  { label: "Programar", icon: IconCode, color: "#16a34a" },
];

/** Tela inicial: replica do print mobile (20:46) com drawer (20:47). */
export default function Home() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Novo chat");
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState([]);

  const send = (event) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", text },
      { role: "assistant", text: "Clone de interface: sem backend conectado. Implante o backend/ e aponte a API para respostas reais." },
    ]);
    setDraft("");
  };

  return (
    <div className="app">
      <Sidebar open={open} onClose={() => setOpen(false)} active={active} onSelect={setActive} />
      <header className="topbar">
        <button type="button" className="icon-btn" onClick={() => setOpen(true)} aria-label="Abrir menu">
          <IconMenu />
        </button>
        <button type="button" className="model" aria-label="Modelo SKYNETchat 4.5">
          <span>SKYNETchat</span>
          <b>4.5</b>
          <IconChevron className="chev" width={16} height={16} />
        </button>
        <div className="top-actions">
          <button type="button" className="icon-btn" aria-label="Tema"><IconTheme /></button>
          <button type="button" className="icon-btn" aria-label="Novo chat" onClick={() => setMessages([])}><IconEdit /></button>
        </div>
      </header>

      <main className="stage">
        {messages.length === 0 ? (
          <section className="hero">
            <h1>Apresentamos o <span className="red">SKYNETchat</span></h1>
            <p>Sua inteligência artificial avançada sem censura</p>
            <div className="chips">
              {actions.map(({ label, icon: Icon, color }) => (
                <button key={label} type="button" className="chip" onClick={() => setDraft(label)}>
                  <Icon width={20} height={20} style={{ color }} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </section>
        ) : (
          <section className="thread">
            {messages.map((message, index) => (
              <article key={index} className={`bubble ${message.role}`}>{message.text}</article>
            ))}
          </section>
        )}
      </main>

      <form className="dock" onSubmit={send}>
        <button type="button" className="dock-plus" aria-label="Anexar"><IconPlus /></button>
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Pesquise sem censura..."
          aria-label="Mensagem"
        />
        <button type="button" className="icon-btn muted" aria-label="Gravar áudio"><IconMic /></button>
        <button type="submit" className="dock-send" aria-label="Voz ou enviar"><IconWave width={22} height={22} /></button>
      </form>
    </div>
  );
}
