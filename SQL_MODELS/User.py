from datetime import datetime
from typing import Optional
from uuid import UUID

from sqlmodel import Field, SQLModel


class user(SQLModel, table=True):
    __tablename__ = "users"

    id: UUID = Field(
        primary_key=True,
    )

    email: str = Field(
        nullable=False,
        unique=True,
    )

    skill_level: Optional[str] = Field(
        default="Beginner",
    )

    created_at: Optional[datetime] = Field(
        default=None,
    )

    username: Optional[str] = Field(
        default=None,
    )

    security_question: Optional[str] = Field(
        default=None,
    )

    security_answer: Optional[str] = Field(
        default=None,
    )