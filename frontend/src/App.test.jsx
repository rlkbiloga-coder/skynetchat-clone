import { fireEvent, render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "./App.jsx";
import { formatCode } from "./pages/Login.jsx";

describe("skynetchat clone", () => {
  it("login formata o codigo 0000-0000-0000", () => {
    expect(formatCode("123456789012")).toBe("1234-5678-9012");
    expect(formatCode("1234567890123")).toBe("1234-5678-9012");
    expect(formatCode("12ab")).toBe("12");
  });

  it("home renderiza hero e sidebar do site real", () => {
    render(
      <HashRouter>
        <App />
      </HashRouter>,
    );
    expect(screen.getByText("Apresentamos o SKYNETchat")).toBeTruthy();
    expect(screen.getByText("Histórico de conversas")).toBeTruthy();
    expect(screen.getByText("Projetos")).toBeTruthy();
  });

  it("envio de mensagem mostra resposta de clone (nao finge IA)", () => {
    render(
      <HashRouter>
        <App />
      </HashRouter>,
    );
    fireEvent.change(screen.getByLabelText("Mensagem"), { target: { value: "oi" } });
    fireEvent.submit(screen.getByLabelText("Mensagem").closest("form"));
    expect(screen.getByText(/Clone de interface/)).toBeTruthy();
  });
});
