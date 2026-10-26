from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_sign_up_generates_12_digit_code_and_token():
    response = client.post("/api/auth/sign-up")
    assert response.status_code == 201
    code = response.json()["code"]
    assert len(code) == 14 and code.count("-") == 2
    assert all(part.isdigit() and len(part) == 4 for part in code.split("-"))
    assert len(response.json()["token"]) == 64


def test_login_accepts_generated_code():
    code = client.post("/api/auth/sign-up").json()["code"]
    login = client.post("/api/auth/login", json={"code": code})
    assert login.status_code == 200
    assert login.json()["plan"] == "free"


def test_login_rejects_wrong_code():
    login = client.post("/api/auth/login", json={"code": "0000-0000-0001"})
    assert login.status_code == 401


def test_login_rejects_malformed_code():
    assert client.post("/api/auth/login", json={"code": "123"}).status_code == 422


def test_recovery_accepts_email():
    response = client.post("/api/auth/recovery", json={"email": "user@test.com"})
    assert response.status_code == 202
