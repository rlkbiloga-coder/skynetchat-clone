import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";

const chatIntro = [
  "Pesquisar na web",
  "Gerar Imagens",
  "Persuasão",
  "Programar",
];

/** App principal: hero + composer + painéis da sidebar. */
export default function Home() {
  const [active, setActive] = useState("Novo chat");
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState([]);

  const send = (event) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setDraft("");
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text:
          "Clone de interface: sem backend conectado. Implante o backend/ e aponte a API para respostas reais.",
      },
    ]);
  };

  return (
    <div className="layout">
      <Sidebar active={active} onSelect={setActive} />
      <main className="main">
        {messages.length === 0 ? (
          <div className="hero">
            <h1>Apresentamos o SKYNETchat</h1>
            <p className="muted">Sua inteligência artificial avançada sem censura</p>
            <div className="chips">
              {chatIntro.map((chip) => (
                <span key={chip} className="chip">{chip}</span>
              ))}
            </div>
          </div>
        ) : (
          <div className="messages">
            {messages.map((message, index) => (
              <article key={index} className={`msg ${message.role}`}>{message.text}</article>
            ))}
          </div>
        )}
        <form className="composer" onSubmit={send}>
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Pergunte o que quiser..."
            aria-label="Mensagem"
          />
          <button type="submit">➤</button>
        </form>
        <p className="rating">SKYNETchat · 4.5 ★</p>
      </main>
    </div>
  );
}
