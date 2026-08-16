import os
import json

from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai
from supabase_client import supabase  


# ---------------------------------
# SETUP
# ---------------------------------

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=api_key)

app = FastAPI()


# ---------------------------------
# HOME
# ---------------------------------

@app.get("/")
def home():
    return {
        "message": "CookSmart backend is working"
    }


# ---------------------------------
# DATA FROM FRONTEND
# ---------------------------------

class RecipeRequest(BaseModel):
    ingredients: list[str]

    cuisine: str
    dietary_preference: str
    skill_level: str

    disliked_ingredients: list[str]

    max_cooking_time: int
    servings: int


# ---------------------------------
# GENERATE RECIPE
# ---------------------------------

@app.post("/generate-recipe")
def generate_recipe(request: RecipeRequest):

    ingredients = ", ".join(request.ingredients)

    disliked = ", ".join(request.disliked_ingredients)

    prompt = f"""
You are the AI recipe generator for CookSmart.

Create ONE recipe based on the user's information below.

AVAILABLE INGREDIENTS:
{ingredients}

CUISINE:
{request.cuisine}

DIETARY PREFERENCE:
{request.dietary_preference}

COOKING SKILL LEVEL:
{request.skill_level}

DISLIKED INGREDIENTS:
{disliked}

MAXIMUM COOKING TIME:
{request.max_cooking_time} minutes

SERVINGS:
{request.servings}


RULES:

1. Use the available ingredients when appropriate.

2. Follow the requested cuisine.

3. Follow the dietary preference.

4. Do NOT use any disliked ingredients.

5. Keep the total cooking time within
   {request.max_cooking_time} minutes.

6. Adjust ingredient quantities for
   {request.servings} servings.

7. Adjust the difficulty and explanation of the cooking
   steps according to the user's cooking skill level.

8. Keep the recipe practical and beginner-friendly
   when the skill level is Beginner.


Return ONLY valid JSON using exactly this structure:

{{
    "recipe_name": "name of recipe",

    "cuisine": "cuisine",

    "cooking_time": "time needed",

    "servings": {request.servings},

    "ingredients": [
        "ingredient with quantity",
        "ingredient with quantity"
    ],

    "steps": [
        "step 1",
        "step 2",
        "step 3"
    ]
}}

Do not include markdown.

Do not include ```json.

Do not write explanations before or after the JSON.
"""


    try:

        response = client.models.generate_content(
            model="gemini-3-flash-preview",
            contents=prompt
        )

        recipe = json.loads(response.text)

        return recipe


    except Exception as error:

        return {
            "error": "Could not generate recipe",
            "details": str(error)
        }

    # ---------------------------------
# SUBSTITUTE SUGGESTIONS
# ---------------------------------

class SubstituteRequest(BaseModel):
    ingredient: str
    dietary_preference: str


@app.post("/suggest-substitutes")
def suggest_substitutes(request: SubstituteRequest):

    prompt = f"""
You are the AI cooking assistant for CookSmart.

The user needs a substitute for:

{request.ingredient}

Dietary preference:
{request.dietary_preference}

Suggest 3 suitable ingredient substitutes.

Return ONLY valid JSON in exactly this structure:

{{
    "original_ingredient": "{request.ingredient}",
    "substitutes": [
        {{
            "name": "substitute name",
            "reason": "short reason"
        }},
        {{
            "name": "substitute name",
            "reason": "short reason"
        }},
        {{
            "name": "substitute name",
            "reason": "short reason"
        }}
    ]
}}

Do not include markdown.
Do not write anything before or after the JSON.
"""

    try:

        response = client.models.generate_content(
            model="gemini-3-flash-preview",
            contents=prompt
        )

        substitutes = json.loads(response.text)

        return substitutes

    except Exception as error:

        return {
            "error": "Could not generate substitutes",
            "details": str(error)
        }

@app.get("/pantry")
def get_pantry():
    response = supabase.table("pantry_ingredients").select("*").execute()
    return response.data


class PantryItem(BaseModel):
    ingredient: str
    quantity: str


from pydantic import BaseModel

class PantryItem(BaseModel):
    user_id: str
    ingredient_name: str
    quantity: int
    unit: str
    expiry_date: str
    cost: int

@app.post("/pantry")
def add_pantry(item: PantryItem):
    response = supabase.table("pantry_ingredients").insert({
        "user_id": item.user_id,
        "ingredient_name": item.ingredient_name,
        "quantity": item.quantity,
        "unit": item.unit,
        "expiry_date": item.expiry_date,
        "cost": item.cost
    }).execute()

    return response.data