"""Database connection and setup for the Todo Backend API."""

from sqlmodel import create_engine, Session
from contextlib import contextmanager
from config import settings


# Create the database engine
# Using connect_args={"check_same_thread": False} for SQLite compatibility
# For Neon PostgreSQL, we'll use the standard connection
connection_string = settings.DATABASE_URL

if settings.NEON_DATABASE_URL:
    connection_string = settings.NEON_DATABASE_URL

engine = create_engine(
    connection_string,
    echo=False,  # Set to True for SQL query logging
)


def get_session():
    """Get a database session."""
    with Session(engine) as session:
        yield session


@contextmanager
def get_db_session():
    """Context manager for database sessions."""
    session = Session(engine)
    try:
        yield session
        session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()