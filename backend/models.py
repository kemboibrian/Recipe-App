from pydantic import BaseModel
from typing import List

class Recipe(BaseModel):
    id: int
    name: str
    description: str
    instructions: str
    category_id: int

class Ingredient(BaseModel):
    id: int
    name: str
    recipe_id: int

class Category(BaseModel):
    id: int
    name: str
