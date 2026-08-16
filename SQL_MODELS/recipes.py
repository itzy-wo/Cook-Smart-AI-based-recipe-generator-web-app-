from datetime import datetime
from typing import Any, Optional
from uuid import UUID

from sqlalchemy import Column, JSON
from sqlmodel import Field, SQLModel


class recipe(SQLModel, table=True):
    __tablename__ = "recipes"

    id: UUID = Field(
        primary_key=True,
    )

    title: str = Field(
        nullable=False,
    )

    prep_time_mins: Optional[int] = Field(
        default=None,
    )

    cuisine_type: Optional[str] = Field(
        default=None,
    )

    ingredients: Optional[Any] = Field(
        default=None,
        sa_column=Column(JSON),
    )

    steps: Optional[Any] = Field(
        default=None,
        sa_column=Column(JSON),
    )

    created_at: Optional[datetime] = Field(
        default=None,
    )

    servings: Optional[int] = Field(
        default=None,
    )