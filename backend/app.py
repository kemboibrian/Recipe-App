from models import Recipe, Ingredient, Category
from database import db
from fastapi import FastAPI, HTTPException
from typing import List
from pydantic import BaseModel
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Import database and models

app = FastAPI()

# Helper functions


def get_ingredients_for_recipe(recipe_id: int) -> List[Ingredient]:
    rows = db.fetchall(
        "SELECT * FROM ingredients WHERE recipe_id = ?", (recipe_id,))
    return [Ingredient(*row) for row in rows]


def delete_recipe_ingredients(recipe_id: int) -> None:
    query = "DELETE FROM ingredients WHERE recipe_id = ?"
    db.execute(query, (recipe_id,))

# Recipe Endpoints


@app.get("/recipes", response_model=List[Recipe])
async def get_all_recipes():
    rows = db.fetchall("SELECT * FROM recipes")
    recipes = [Recipe(*row) for row in rows]
    for recipe in recipes:
        recipe.ingredients = get_ingredients_for_recipe(recipe.id)
    return recipes


@app.get("/recipes/{recipe_id}", response_model=Recipe)
async def get_recipe(recipe_id: int):
    row = db.fetchone("SELECT * FROM recipes WHERE id = ?", (recipe_id,))
    if row:
        recipe = Recipe(*row)
        recipe.ingredients = get_ingredients_for_recipe(recipe.id)
        return recipe
    else:
        raise HTTPException(status_code=404, detail="Recipe not found")


@app.post("/recipes", response_model=dict)
async def create_recipe(recipe: Recipe):
    query = """
        INSERT INTO recipes (name, description, instructions, category_id)
        VALUES (?, ?, ?, ?)
    """
    params = (recipe.name, recipe.description,
              recipe.instructions, recipe.category_id)
    db.execute(query, params)
    return {"message": "Recipe created successfully"}


@app.put("/recipes/{recipe_id}", response_model=dict)
async def update_recipe(recipe_id: int, updated_recipe: Recipe):
    query = """
        UPDATE recipes
        SET name = ?, description = ?, instructions = ?, category_id = ?
        WHERE id = ?
    """
    params = (updated_recipe.name, updated_recipe.description,
              updated_recipe.instructions, updated_recipe.category_id, recipe_id)
    db.execute(query, params)
    return {"message": "Recipe updated successfully"}


@app.delete("/recipes/{recipe_id}", response_model=dict)
async def delete_recipe(recipe_id: int):
    delete_recipe_ingredients(recipe_id)
    query = "DELETE FROM recipes WHERE id = ?"
    db.execute(query, (recipe_id,))
    return {"message": "Recipe deleted successfully"}

# Ingredient Endpoints


@app.get("/recipes/{recipe_id}/ingredients", response_model=List[Ingredient])
async def get_ingredients_for_recipe(recipe_id: int):
    ingredients = get_ingredients_for_recipe(recipe_id)
    return ingredients


@app.post("/recipes/{recipe_id}/ingredients", response_model=dict)
async def add_ingredient_to_recipe(recipe_id: int, ingredient: Ingredient):
    query = """
        INSERT INTO ingredients (name, recipe_id)
        VALUES (?, ?)
    """
    params = (ingredient.name, recipe_id)
    db.execute(query, params)
    return {"message": "Ingredient added successfully"}


@app.delete("/recipes/{recipe_id}/ingredients/{ingredient_id}", response_model=dict)
async def delete_recipe_ingredient(recipe_id: int, ingredient_id: int):
    query = "DELETE FROM ingredients WHERE id = ? AND recipe_id = ?"
    db.execute(query, (ingredient_id, recipe_id))
    return {"message": "Ingredient deleted successfully"}

# Category Endpoints


@app.get("/categories", response_model=List[Category])
async def get_all_categories():
    rows = db.fetchall("SELECT * FROM categories")
    categories = [Category(*row) for row in rows]
    return categories


@app.get("/categories/{category_id}", response_model=Category)
async def get_category(category_id: int):
    row = db.fetchone("SELECT * FROM categories WHERE id = ?", (category_id,))
    if row:
        category = Category(*row)
        return category
    else:
        raise HTTPException(status_code=404, detail="Category not found")


@app.post("/categories", response_model=dict)
async def create_category(category: Category):
    query = "INSERT INTO categories (name) VALUES (?)"
    db.execute(query, (category.name,))
    return {"message": "Category created successfully"}


@app.put("/categories/{category_id}", response_model=dict)
async def update_category(category_id: int, updated_category: Category):
    query = "UPDATE categories SET name = ? WHERE id = ?"
    db.execute(query, (updated_category.name, category_id))
    return {"message": "Category updated successfully"}


@app.delete("/categories/{category_id}", response_model=dict)
async def delete_category(category_id: int):
    query = "DELETE FROM categories WHERE id = ?"
    db.execute(query, (category_id,))
    return {"message": "Category deleted successfully"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
