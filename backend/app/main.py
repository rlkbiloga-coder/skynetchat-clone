"""Referência de backend do fluxo de auth do SKYNETchat.

Auth por código de 12 dígitos (hash no servidor, sessão por token).
Confira docs/BACKEND-MAPPING.md antes de usar em produção.
"""
import hashlib
import os
import secrets

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from sqlalchemy import String, create_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, sessionmaker

engine = create_engine(os.getenv("DATABASE_URL", "sqlite:///./skynet.db"), connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)


class Base(DeclarativeBase):
    pass


class Account(Base):
    __tablename__ = "accounts"
    id: Mapped[int] = mapped_column(primary_key=True)
    code_hash: Mapped[str] = mapped_column(String(128), unique=True)
    recovery_email: Mapped[str] = mapped_column(String(255), default="")
    plan: Mapped[str] = mapped_column(String(20), default="free")


Base.metadata.create_all(engine)
SECRET = os.getenv("SECRET_KEY", "dev-only")


def hash_code(code: str) -> str:
    return hashlib.pbkdf2_hmac("sha256", code.encode(), SECRET.encode(), 100_000).hex()


class SignUpOut(BaseModel):
    code: str
    token: str


class LoginIn(BaseModel):
    code: str = Field(pattern=r"^\d{4}-\d{4}-\d{4}$")


class RecoveryIn(BaseModel):
    email: EmailStr


app = FastAPI(title="skynetchat-clone auth", docs_url="/api/docs")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def make_token(code_hash: str) -> str:
    return secrets.token_hex(32)


@app.post("/api/auth/sign-up", response_model=SignUpOut, status_code=201)
def sign_up():
    """Gera o código de 12 dígitos (única chave de acesso) e abre sessão."""
    code = "-".join(secrets.token_hex(2) for _ in range(3))
    code = "".join(f"{int(c,16):04d}" for c in code.split("-"))
    code = "-".join([code[0:4], code[4:8], code[8:12]])
    code_hash = hash_code(code)
    with SessionLocal() as db:
        db.add(Account(code_hash=code_hash))
        db.commit()
    return SignUpOut(code=code, token=make_token(code_hash))


@app.post("/api/auth/login")
def login(payload: LoginIn):
    code_hash = hash_code(payload.code)
    with SessionLocal() as db:
        account = db.query(Account).filter(Account.code_hash == code_hash).first()
    if account is None:
        raise HTTPException(401, "código inválido")
    return {"token": make_token(code_hash), "plan": account.plan}


@app.post("/api/auth/recovery", status_code=202)
def recovery(payload: RecoveryIn):
    """Registra pedido; envio de email é integração a configurar (SMTP)."""
    return {"status": "envio pendente de SMTP"}


@app.get("/api/health")
def health():
    return {"status": "online"}
