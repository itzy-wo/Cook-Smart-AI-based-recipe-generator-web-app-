from datetime import date, datetime
from decimal import Decimal
from typing import Optional
from uuid import UUID

from sqlmodel import Field, SQLModel


class pantry_ingredients(SQLModel, table=True):
    __tablename__ = "pantry_ingredients"

    id: UUID = Field(
        primary_key=True,
    )

    user_id: UUID = Field(
        nullable=False,
        foreign_key="users.id",
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

    expiry_date: Optional[date] = Field(
        default=None,
    )

    added_at: Optional[datetime] = Field(
        default=None,
    )