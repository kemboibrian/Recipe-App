from pydantic import BaseModel
from typing import List, Optional

class RecipeBase(BaseModel):
    name: str
    description: Optional[str]
    instructions: str
    category_id: Optional[int]

class RecipeCreate(RecipeBase):
    pass

class Recipe(RecipeBase):
    id: int

    class Config:
        orm_mode = True

class IngredientBase(BaseModel):
    name: str
    unit: Optional[str]
    calories: Optional[int]

class IngredientCreate(IngredientBase):
    pass

class Ingredient(IngredientBase):
    id: int

    class Config:
        orm_mode = True

class CategoryBase(BaseModel):
    name: str

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int

    class Config:
        orm_mode = True
