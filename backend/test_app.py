# test_app.py

import pytest
from fastapi.testclient import TestClient
from app import app
from models import Recipe

client = TestClient(app)

# Test for retrieving all recipes
def test_get_all_recipes():
    response = client.get("/recipes")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

# Test for creating a new recipe
def test_create_recipe():
    new_recipe = {
        "name": "Test Recipe",
        "description": "This is a test recipe",
        "instructions": "Test instructions",
        "category_id": 1  
    }
    response = client.post("/recipes", json=new_recipe)
    assert response.status_code == 200
    assert response.json()["message"] == "Recipe created successfully"
