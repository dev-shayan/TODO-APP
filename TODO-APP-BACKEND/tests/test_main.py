from fastapi.testclient import TestClient
from sqlmodel import SQLModel, create_engine, Session
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

# 4 steps of testing
# 1 - Arrange 2-Act 3-Assert 4-CleanUp
# Arrange - set up the test like the prerequisites or resources that are needed for the test
    #SQLModel.metadata.create_all(engine)
    # with Session(engine) as session:
    #     def db_session_override():
    #         return session
    # app.dependency_overrides[get_session] = db_session_override
    # test_app = TestClient(app=app)
# Act - perform the action that you want to test
# Assert - check the result of the action
# CleanUp - clean up the resources that you have used in the test
#Fixtures automate the Arrange and CleanUp steps of testing
############################################################

@pytest.fixture(scope="module",autouse = True)
def get_db_session():
    SQLModel.metadata.create_all(engine)
    yield Session(engine)

@pytest.fixture(scope="function")
def test_app(get_db_session):
    def test_session():
        yield get_db_session
    app.dependency_overrides[get_session] = test_session
    with TestClient(app=app) as test_app:
        yield test_app

#######################################################


# Root Test
def test_root():
    test_app = TestClient(app=app)
    response = test_app.get("/")
    data = response.json()
    assert response.status_code == 200
    assert data == {"msg": "helo g"}


# Post test
def test_create_todo(test_app):
    # SQLModel.metadata.create_all(engine)
    # with Session(engine) as session:

    #     def db_session_override():
    #         return session

    # app.dependency_overrides[get_session] = db_session_override
    # client = TestClient(app=app)
    test_todo = {"content": "create todo test", "is_completed": False}
    response = test_app.post("/todos/", json=test_todo)
    data = response.json()
    assert response.status_code == 200
    assert data["content"] == test_todo["content"]


# get_all test
def test_get_all(test_app):
    # SQLModel.metadata.create_all(engine)
    # with Session(engine) as session:

    #     def db_session_override():
    #         return session

    # app.dependency_overrides[get_session] = db_session_override
    # test_app = TestClient(app=app)
    test_todo = {"content": "get all todo test", "is_completed": False}
    response = test_app.post("/todos/", json=test_todo)

    response = test_app.get("/todos")
    new_todo = response.json()[-1]
    assert response.status_code == 200
    assert new_todo["content"] == test_todo["content"]


# single todo test
def test_get_single_todo(test_app):
    # SQLModel.metadata.create_all(engine)
    # with Session(engine) as session:

    #     def db_session_override():
    #         return session

    # app.dependency_overrides[get_session] = db_session_override
    # test_app = TestClient(app=app)

    test_todo = {"content": "get single todo test", "is_completed": False}
    response = test_app.post("/todos/", json=test_todo)
    todo_id = response.json()["id"]
    res = test_app.get(f"todos/{todo_id}")
    data = res.json()
    assert res.status_code == 200
    assert data["content"] == test_todo["content"]


# edit todo test
def test_edit_todo(test_app):
    # SQLModel.metadata.create_all(engine)
    # with Session(engine) as session:

    #     def db_session_override():
    #         return session

    # app.dependency_overrides[get_session] = db_session_override
    # test_app = TestClient(app=app)

    test_todo = {"content": "edit todo test", "is_completed": False}
    response = test_app.post("/todos/", json=test_todo)
    todo_id = response.json()["id"]

    edited_todo = {"content": "we have edited this", "is_completed": False}
    response = test_app.put(f"/todos/{todo_id}", json=edited_todo)
    data = response.json()
    assert response.status_code == 200
    assert data["content"] == edited_todo["content"]


# delete todo
def test_delete_todo(test_app):
    # SQLModel.metadata.create_all(engine)
    # with Session(engine) as session:

    #     def db_session_override():
    #         return session

    # app.dependency_overrides[get_session] = db_session_override
    # test_app = TestClient(app=app)

    test_todo = {"content": "delete todo test", "is_completed": False}
    response = test_app.post("/todos/", json=test_todo)
    todo_id = response.json()["id"]

    response = test_app.delete(f"/todos/{todo_id}")
    data = response.json()
    assert response.status_code == 200
    assert data["message"] == "Task successfully deleted"
