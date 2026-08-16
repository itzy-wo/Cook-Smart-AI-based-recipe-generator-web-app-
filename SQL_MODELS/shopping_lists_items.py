from datetime import datetime
from decimal import Decimal
from typing import Optional
from uuid import UUID

from sqlmodel import Field, SQLModel


class shopping_list_items(SQLModel, table=True):
    __tablename__ = "shopping_list_items"

    id: UUID = Field(
        primary_key=True,
    )

    shopping_list_id: UUID = Field(
        nullable=False,
        foreign_key="shopping_lists.id",
    )

    ingredient_name: str = Field(
        nullable=False,
    )

    quantity: Decimal = Field(
        nullable=False,
    )

    unit: str = Field(
        nullable=False,
    )

    is_purchased: bool = Field(
        nullable=False,
    )

    added_at: Optional[datetime] = Field(
        default=None,
    )