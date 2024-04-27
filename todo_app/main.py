from fastapi import FastAPI, Depends
from sqlmodel import SQLModel, Field, create_engine, Session, select
from todo_app import settings
from typing import Annotated
from contextlib import asynccontextmanager

# create model
# data model
# table model


class Todo(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    content: str = Field(index=True, min_length=3, max_length=54)
    is_completed: bool = Field(default=False)


# we use psycopg for translation from python to sql language
Connection_string: str = str(settings.DATABASE_URL).replace(
    "postgresql", "postgresql+psycopg"
)

# this engine is for whole application
# for encryptive communication we use secure socket layer sslmode
# Set pool_recycle=300 to recycle connections every 300 seconds (5 minutes) to prevent issues like stale connections or connection timeouts.
# Set pool_size=10 to limit the maximum number of connections in the pool to 10, balancing resource usage while ensuring efficient database access.
# echo attribute will give a report of each step on terminal
engine = create_engine(
    Connection_string,
    connect_args={"sslmode": "require"},
    pool_recycle=300,
    pool_size=10,
    echo=True,
)
# here we created a table in db
def create_tables():
    SQLModel.metadata.create_all(engine)


# todo1: Todo = Todo(content="first task")
# todo2: Todo = Todo(content="Second task")

# # session : Seperate session for each functionality/transaction
# session = Session(engine)

# # create todos in db
# session.add(todo1)
# session.add(todo2)
# print(f"Before Commit todo1={todo1}")
# session.commit()
# session.refresh(todo1)
# print(f"After Commit todo1={todo1}")
# session.close()

#this is a generator function we uses with to cuz it automaticallty close the session when the code inside this function is executed and the yield will wait for the remaining code to be executed 
def get_session():
    with Session(engine) as session:
        yield session

#in this function we have all the work before the startup of the app such as table creation
@asynccontextmanager
async def lifespan(app:FastAPI):
    print("Creating tables")
    create_tables()
    print("Tables created")
    yield

app: FastAPI = FastAPI(lifespan=lifespan, title="TODO APP", version="1.0.0")


@app.get("/")
async def root():
    return {"msg": "helo g"}

#create krne k liye post method of http
#here we used dependency injection by following "do not repeat yourself"
@app.post("/todos/",response_model=Todo)
async def create_todo(todo:Todo,session:Annotated[Session,Depends(get_session)]): 
    session.add(todo)
    session.commit()
    session.refresh(todo)
    return todo

#read krne k liye get method of http
@app.get("/todos/", response_model=list[Todo])
async def get_all(session:Annotated[Session,Depends(get_session)]): 
    statement = select(Todo)
    todos = session.exec(statement).all()
    return todos

@app.get("/todos/{id}",response_model=Todo)
async def get_single_todo(id:int, session:Annotated[Session,Depends(get_session)]): 
    todo = session.exec(select(Todo).where(Todo.id==id)).first()
    return todo

#Update/edit krne k liye put/patch method of http
#put delete the existing entery and create new one and need complete data to do its function
#patch only need requierd data to do its functionality
@app.put("/todos/{id}")
async def edit_todo(): ...

#delete krne k liye delete method of http
@app.delete("/todos/{id}")
async def delete_todo(): ...
