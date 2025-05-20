from fastapi import FastAPI
from contextlib import asynccontextmanager
from app import routes
from app.db import create_tables

@asynccontextmanager
async def lifespan():
    create_tables()
    yield

app = FastAPI(lifespan=lifespan)

app.include_router(routes.router)
