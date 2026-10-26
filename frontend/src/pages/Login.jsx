import { useState } from "react";
import { Link } from "react-router-dom";
import AuthShell from "../components/AuthShell.jsx";

export function formatCode(value) {
  const digits = value.replace(/\D/g, "").slice(0, 12);
  return digits.replace(/(\d{4})(?=\d)/g, "$1-");
}

/** /login real: código de 12 dígitos (0000-0000-0000). */
export default function Login() {
  const [code, setCode] = useState("");
  return (
    <AuthShell
      title="AUTENTICAÇÃO"
      links={
        <>
          <Link to="/sign-up">CRIAR CONTA</Link>
          <span>|</span>
          <Link to="/recovery">RECUPERAR ACESSO</Link>
        </>
      }
    >
      <p>Insira seu código de ativação de 12 dígitos para acessar a sua conta.</p>
      <label className="code-label">CÓDIGO DE ACESSO {code.replace(/\D/g, "").length}/12</label>
      <input
        inputMode="tel"
        value={code}
        onChange={(event) => setCode(formatCode(event.target.value))}
        placeholder="0000-0000-0000"
        aria-label="Código de acesso"
      />
      <button type="button" disabled={code.replace(/\D/g, "").length !== 12}>
        ENTRAR
      </button>
    </AuthShell>
  );
}
