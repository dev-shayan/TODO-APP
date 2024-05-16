from fastapi.testclient import TestClient
from sqlmodel import SQLModel, create_engine, Session, select
from fastapi import FastAPI
from todo_app import settings
from todo_app.main import app, get_session
import pytest

Connection_string: str = str(settings.TEST_DATABASE_URL).replace(
    "postgresql", "postgresql+psycopg"
)
engine = create_engine(
    Connection_string,
    connect_args={"sslmode": "require"},
    pool_recycle=300,
    pool_size=10,
    echo=True,
)

#####################################################
#refacter with pytest fixture

@pytest.fixture(scope="module",autouse = True)
def get_db_session():
    SQLModel.metadata.create_all(engine)
    yield Session(engine)

@pytest.fixture()
def test_app(get_db_session):
    def test_session():
        yield get_db_session
    app.dependency_overrides[get_session] =[test_session]
    with TestClient(app=app) as client:
        yield client






#######################################################

# Root Test
def test_root():
    client = TestClient(app=app)
    response = client.get("/")
    data = response.json()
    assert response.status_code == 200
    assert data == {"msg": "helo g"}


# Post test
def test_create_todo():
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:

        def db_session_override():
            return session

    app.dependency_overrides[get_session] = db_session_override
    client = TestClient(app=app)
    test_todo = {"content": "create todo test", "is_completed": False}
    response = client.post("/todos/", json=test_todo)
    data = response.json()
    assert response.status_code == 200
    assert data["content"] == test_todo["content"]


# get_all test
def test_get_all():
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:

        def db_session_override():
            return session

    app.dependency_overrides[get_session] = db_session_override
    client = TestClient(app=app)
    test_todo = {"content": "get all todo test", "is_completed": False}
    response = client.post("/todos/", json=test_todo)
    data = response.json()

    response = client.get("/todos")
    new_todo = response.json()[-1]
    assert response.status_code == 200
    assert new_todo["content"] == test_todo["content"]


# single todo test
def test_get_single_todo():
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:

        def db_session_override():
            return session

    app.dependency_overrides[get_session] = db_session_override
    client = TestClient(app=app)

    test_todo = {"content": "get single todo test", "is_completed": False}
    response = client.post("/todos/", json=test_todo)
    todo_id = response.json()["id"]
    res = client.get(f"todos/{todo_id}")
    data = res.json()
    assert res.status_code == 200
    assert data["content"] == test_todo["content"]


# edit todo test
def test_edit_todo():
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:

        def db_session_override():
            return session

    app.dependency_overrides[get_session] = db_session_override
    client = TestClient(app=app)

    test_todo = {"content": "edit todo test", "is_completed": False}
    response = client.post("/todos/", json=test_todo)
    todo_id = response.json()["id"]

    edited_todo = {"content": "we have edited this", "is_completed": False}
    response = client.put(f"/todos/{todo_id}", json=edited_todo)
    data = response.json()
    assert response.status_code == 200
    assert data["content"] == edited_todo["content"]


# delete todo
def test_delete_todo():
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        def db_session_override():
            return session

    app.dependency_overrides[get_session] = db_session_override
    client = TestClient(app=app)

    test_todo = {"content": "delete todo test", "is_completed": False}
    response = client.post("/todos/", json=test_todo)
    todo_id = response.json()["id"]

    response = client.delete(f"/todos/{todo_id}")
    data = response.json()
    assert response.status_code == 200
    assert data["message"] == "Task successfully deleted"
