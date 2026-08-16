from datetime import datetime
from typing import Optional
from uuid import UUID

from sqlmodel import Field, SQLModel


class favorite_recipes(SQLModel, table=True):
    __tablename__ = "favorite_recipes"

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

    created_at: Optional[datetime] = Field(
        default=None,
    )