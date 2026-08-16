from sqlmodel import Field, SQLModel


class reference_diets(SQLModel, table=True):
    __tablename__ = "reference_diets"

    tag_name: str = Field(
        primary_key=True,
        nullable=False,
    )