from datetime import datetime
from decimal import Decimal
from typing import Optional
from uuid import UUID

from sqlmodel import Field, SQLModel


class waste_log(SQLModel, table=True):
    __tablename__ = "waste_log"

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

    reason: Optional[str] = Field(
        default=None,
    )

    wasted_at: datetime = Field(
        nullable=False,
    )