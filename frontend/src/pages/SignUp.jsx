import { Link } from "react-router-dom";
import AuthShell from "../components/AuthShell.jsx";

/** /sign-up real: gera código secreto de 12 dígitos. */
export default function SignUp() {
  return (
    <AuthShell
      title="CRIAR CONTA"
      links={
        <>
          <Link to="/login">ENTRAR</Link>
          <span>|</span>
          <Link to="/recovery">RECUPERAR ACESSO</Link>
        </>
      }
    >
      <p>Um código secreto de 12 dígitos será gerado. Ele é sua única chave de acesso.</p>
      <p className="muted">
        Ao gerar o código, você confirma ter +18 anos e aceita os Termos de Serviço e Privacidade.
      </p>
      <button type="button">GERAR CÓDIGO DE ACESSO</button>
      <p className="hint">Seu código será salvo no sistema e você entrará automaticamente.</p>
    </AuthShell>
  );
}
