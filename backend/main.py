from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel
from typing import List, Optional
import sqlite3

# Initialize FastAPI
app = FastAPI()

# SQLite database connection
conn = sqlite3.connect("recipe.sqlite3")
conn.execute("PRAGMA foreign_keys = 1")  # Enable foreign key constraints
conn.row_factory = sqlite3.Row  # Return rows as dictionaries

# Define models
class Recipe(BaseModel):
    id: Optional[int]
    name: str
    description: Optional[str]
    instructions: str
    category_id: Optional[int]

class RecipeCreate(BaseModel):
    name: str
    description: Optional[str]
    instructions: str
    category_id: Optional[int]

# Routes
@app.post("/recipes/", response_model=Recipe)
def create_recipe(recipe: RecipeCreate):
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO recipes (name, description, instructions, category_id) VALUES (?, ?, ?, ?)",
        (recipe.name, recipe.description, recipe.instructions, recipe.category_id)
    )
    conn.commit()
    recipe_id = cursor.lastrowid
    cursor.close()
    return {**recipe.dict(), "id": recipe_id}

@app.get("/recipes/", response_model=List[Recipe])
def read_recipes():
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM recipes")
    recipes = cursor.fetchall()
    cursor.close()
    return recipes
