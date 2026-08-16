from datetime import datetime
from typing import Optional
from uuid import UUID

from sqlmodel import Field, SQLModel


class cooking_history(SQLModel, table=True):
    __tablename__ = "cooking_history"

    id: UUID = Field(
        primary_key=True,
    )

    user_id: UUID = Field(
        nullable=False,
        foreign_key="users.id",
    )

    recipe_id: UUID = Field(
        nullable=False,
        foreign_key="recipes.id",
    )

    cooked_at: Optional[datetime] = Field(
        default=None,
    )

    rating: Optional[int] = Field(
        default=None,
        ge=1,
        le=5,
    )

    notes: Optional[str] = Field(
        default=None,
    )