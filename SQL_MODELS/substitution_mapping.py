from uuid import UUID

from sqlmodel import Field, SQLModel


class substitution_mapping(SQLModel, table=True):
    __tablename__ = "substitution_mapping"

    id: UUID = Field(
        primary_key=True,
    )

    ingredient_name: str = Field(
        nullable=False,
    )

    substitute_name: str = Field(
        nullable=False,
    )