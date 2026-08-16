from decimal import Decimal
from typing import Optional
from uuid import UUID

from sqlmodel import Field, SQLModel


class recipe_ingredients(SQLModel, table=True):
    __tablename__ = "recipe_ingredients"

    id: UUID = Field(
        primary_key=True,
    )

    recipe_id: UUID = Field(
        nullable=False,
        foreign_key="recipes.id",
    )

    ingredient_name: str = Field(
        nullable=False,
    )

    quantity: Optional[Decimal] = Field(
        default=None,
    )

    unit: Optional[str] = Field(
        default=None,
    )