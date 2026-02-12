"""Script to reset database tables for development."""

from sqlmodel import SQLModel
from db import engine
from models import User, Task  # Import models to register them with SQLModel

if __name__ == "__main__":
    print("Dropping all tables...")
    SQLModel.metadata.drop_all(engine)
    print("Creating all tables...")
    SQLModel.metadata.create_all(engine)
    print("Database reset complete!")
