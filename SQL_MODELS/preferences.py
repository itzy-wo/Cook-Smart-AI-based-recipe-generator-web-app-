from datetime import datetime
from typing import Any, Optional
from uuid import UUID

from sqlalchemy import Column, JSON
from sqlmodel import Field, SQLModel


class preferences(SQLModel, table=True):
    __tablename__ = "preferences"

    id: UUID = Field(
        primary_key=True,
    )

    user_id: Optional[UUID] = Field(
        default=None,
        unique=True,
        foreign_key="users.id",
    )

    preferred_cuisine: Optional[str] = Field(
        default=None,
    )

    diet_tag: Optional[str] = Field(
        default=None,
        foreign_key="reference_diets.tag_name",
    )

    spice_level: Optional[str] = Field(
        default=None,
    )

    allergies: Optional[Any] = Field(
        default=None,
        sa_column=Column(JSON),
    )

    created_at: Optional[datetime] = Field(
        default=None,
    )