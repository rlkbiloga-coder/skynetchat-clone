import { Link } from "react-router-dom";
import AuthShell from "../components/AuthShell.jsx";

/** /recovery real: email de recuperação recebe o código. */
export default function Recovery() {
  return (
    <AuthShell
      title="RECUPERAÇÃO"
      links={
        <>
          <Link to="/login">ENTRAR</Link>
          <span>|</span>
          <Link to="/sign-up">CRIAR CONTA</Link>
        </>
      }
    >
      <p>Digite o email de recuperação cadastrado na sua conta para receber seu código de acesso.</p>
      <label className="code-label">EMAIL DE RECUPERAÇÃO</label>
      <input type="email" placeholder="email@exemplo.com" aria-label="Email de recuperação" />
      <button type="button">ENVIAR CÓDIGO</button>
      <p className="hint">Não tem email de recuperação? Falar com o suporte</p>
    </AuthShell>
  );
}
