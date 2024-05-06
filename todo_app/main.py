from fastapi import FastAPI, Depends, HTTPException
from sqlmodel import SQLModel, Field, create_engine, Session, select
from todo_app import settings
from typing import Annotated
from contextlib import asynccontextmanager
# Step-1: Create Database on Neon
# Step-2: Create .env file for environment variables
# Step-3: Create setting.py file for encrypting DatabaseURL
# Step-4: Create a Model
# Step-5: Create Engine
# Step-6: Create function for table creation
# Step-7: Create function for session management
# Step-8: Create contex manager for app lifespan
# Step-9: Create all endpoints of todo app


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
@app.get('/todos/', response_model=list[Todo])
async def get_all(session: Annotated[Session, Depends(get_session)]):
    todos = session.exec(select(Todo)).all()
    if todos:
        return todos
    else:
        raise HTTPException(status_code=404, detail="No Task found")


@app.get("/todos/{id}",response_model=Todo)
async def get_single_todo(id:int, session:Annotated[Session,Depends(get_session)]): 
    todo = session.exec(select(Todo).where(Todo.id == id)).first()
    if todo:
        return todo
    else:
        raise HTTPException(status_code=404, detail="No Task found")

#Update/edit krne k liye put/patch method of http
#put delete the existing entery and create new one and need complete data to do its function
#patch only need requierd data to do its functionality
@app.put('/todos/{id}')
async def edit_todo(id: int, todo: Todo, session: Annotated[Session, Depends(get_session)]):
    existing_todo = session.exec(select(Todo).where(Todo.id == id)).first()
    if existing_todo:
        existing_todo.content = todo.content
        existing_todo.is_completed = todo.is_completed
        session.add(existing_todo)
        session.commit()
        session.refresh(existing_todo)
        return existing_todo
    else:
        raise HTTPException(status_code=404, detail="No task found")

#delete krne k liye delete method of http
@app.delete('/todos/{id}')
async def delete_todo(id: int, session: Annotated[Session, Depends(get_session)]):
    todo = session.exec(select(Todo).where(Todo.id == id)).first()
    # todo = session.get(Todo,id)
    if todo:
        session.delete(todo)
        session.commit()
        # session.refresh(todo)
        return {"message": "Task successfully deleted"}
    else:
        raise HTTPException(status_code=404, detail="No task found")