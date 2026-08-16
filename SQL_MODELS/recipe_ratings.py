from datetime import datetime
from typing import Optional
from uuid import UUID

from sqlmodel import Field, SQLModel


class recipe_ratings(SQLModel, table=True):
    __tablename__ = "recipe_ratings"

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

    rating: int = Field(
        nullable=False,
        ge=1,
        le=5,
    )

    review: Optional[str] = Field(
        default=None,
    )

    created_at: datetime = Field(
        nullable=False,
    )