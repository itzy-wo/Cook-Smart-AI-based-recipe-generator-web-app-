from datetime import datetime
from uuid import UUID

from sqlmodel import Field, SQLModel


class shopping_lists(SQLModel, table=True):
    __tablename__ = "shopping_lists"

    id: UUID = Field(
        primary_key=True,
    )

    user_id: UUID = Field(
        nullable=False,
        foreign_key="users.id",
    )

    name: str = Field(
        nullable=False,
    )

    created_at: datetime = Field(
        nullable=False,
    )