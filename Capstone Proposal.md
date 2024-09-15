# Fridge Bingo

## Overview

Fridge Bingo encourages users to be resourceful and creative in the kitchen in a bid to combat food waste. The aim make cooking more accessible and fun by using random or leftover ingredients that they already have at home in order to create a delicious meal.

### Problem Space

I like to experiment with new recipes but I lack the imagination or knowledge of what I could do with the half-used vegetables, sauces, or ingredients leftover in my fridge that I would ideally like to save before they spoil and go to landfill.

In a busy world of convenience and cost saving having a simple tool to help utilise what ingredients you have available at home would be benefit those that want to live sustainably and do not have the time for frequent grocery shopping or detailed meal planning. Maximise what you have to minimise food waste!

### User Profile

- Home cooks
  - seeking inspiration for meal times
  - wanting to elevate their culinary skills
  - looking to avoid wasting time, money and food
  - that want to keep track of recipes they've tried

### Features

- As a user, I want to be able to create an account to manage my recipes
- As a user, I want to be able to login to my account to manage my recipes

- As a user, I want to input the ingredients I have in my fridge, so that I can receive recipe suggestions without having to buy additional groceries
- As a user, I want to receive step-by-step instructions so that I can easily follow the recipe
- As a user, I want to be able to save a recipe that has been generated so that I can revisit it in future or share it with friends

- As a user, I want to be able to see my previous/saved recipes
- As a user, I want to be able to rate an attempted recipe out of 5 stars
- As a user, I want to be able to filter/sort my recipes by rating
- As a user, I want to be able to upload a comment or photo to the recipe

## Implementation

### Tech Stack

List technologies that will be used in your app, including any libraries to save time or provide more functionality. Be sure to research any potential limitations.

- React
- JavaScript
- mySQL
- Express
- Client libraries:
  - react
  - react-router
  - axios
- Server libraries:
  - knex
  - express

### APIs

ChefGPT (https://api.chefgpt.xyz/)

### Sitemap

- Dashboard

  - The main landing page that provides a link to generate a new recipe and view recent/saved suggestions. Possibly include an overview of the user's fridge/cupboard contents.

- Recipe Suggestions

  - A page that generates ideas based on the user's available ingredients. User enters the ingredients they want to use up and a recipe is returned.

- Rate my Plate

  - A blog style page where saved recipes can be accessed, with potential to share to other users for feedback.

- Fridge Inventory: "Shelfie"

  - A virtual record of fridge/cupboard contents with the ability to manually add, remove or update ingredients. Take a picture of what is in your fridge or cupboards so you don't buy a double of something you've already got.

### Mockups

Provide visuals of your app's screens. You can use pictures of hand-drawn sketches, or wireframing tools like Figma.
https://excalidraw.com/

### Data

![] (fridge-bingo-database-diagram.png)

### Endpoints

**POST /users/register**

- Add a user account

Parameters:

- email: User's email
- password: User's provided password

Response:

```
{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
```

**POST /users/login**

- Login a user

Parameters:

- email: User's email
- password: User's provided password

Response:

```
{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
```

**POST /api/generate/recipe-from-ingredients**

- Generates recipe suggestions based on the user's available ingredients. Using ChefGPT 'recipe-from-ingredients' endpoint or their widget. In the same function save the recipe to my db.

Parameters:

- ingredients
- meal type
- measurement system (imperial/metric)

Response:

```
{
  "recipeName": "Delicious Chicken and Rice",
  "ingredients": [
    {
      "name": "Chicken",
      "unit": "grams",
      "amount": 500
    },
    {
      "name": "Rice",
      "unit": "cups",
      "amount": 2
    },
    // ... other ingredients
  ],
  "instructions": [
    "1. Preheat the oven to 350°F.",
    "2. Season the chicken with salt and pepper.",
    // ... other instructions
  ],
  "difficulty": "intermediate",
  "macros": {
    "carbs": {
      "amount": 40,
      "unit": "grams"
    },
    // ... other macros
  },
  "preparationTime": 30,
  "servings": 2,
  "kitchenToolsUsed": ["oven", "pot"]
}
```

**GET /api/recipes/saved**

- Fetches a list of recipes the user has saved.

Parameters:

- user_id

Response:

```

```

**POST /api/recipes/:id/rate**

- Enables users to rank recipes using a star system or like/comment on a saved recipe.

Parameters:

- user_id
- recipe_id
- rating
- comments

Response:

```

```

**POST /api/fridge/shelfie**

- Enables user to upload a picture of their fridge or cupboard contents.

Parameters:

- user_id
- image

**GET /api/fridge/inventory**

- Fetches the user's current fridge/cupboard contents.

Parameters:

- user_id

Response

```
{
 "inventory": [
   { "ingredient": "", "quantity": "", "expiration": "" }
 ]
}
```

**POST /api/fridge/inventory**

- Adds ingredients in the fridge/cupboard inventory.

Parameters:

- user_id
- ingredients

Response

```

```

DELETE inventory item
PATCH/PUT inventory item

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.

## Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation working back from the capstone due date.

---

## Future Implementations

Your project will be marked based on what you committed to in the above document. Here, you can list any additional features you may complete after the MVP of your application is built, or if you have extra time before the Capstone due date.

'Shelfie' v2:
scanning of ingredients including expiration dates.
notifications for ingredients going out of date?
categorisation

processes it to identify ingredients (could integrate image recognition technology in the future).

. Expiration Alerts
Description: A notification page that shows ingredients that are about to expire, encouraging users to use them before they go to waste.

Reminders for ingredients nearing expiration to help users stay on top of her groceries.

Leftover Reinvention

- As a user with leftovers, I want to input my cooked food and get suggestions for how to transform it into a new dish, so that I can avoid eating the same meal twice.

Food Waste Tracking and Statistics
As a sustainability-conscious user, I want to track how much food waste I’ve avoided by using my fridge ingredients, so that I can measure my environmental impact.
The app logs how often the user utilizes expiring ingredients. Monthly reports show how much food waste the user has avoided. User can set goals to reduce food waste, with achievements and badges for milestones.

reject redo the recipe

---

NOTES

1. rather than builidng authentication system, assume there is only 1 user who is already logged in (potentch add users at the end)
2. rolling own auth (creating own JWT token)
3. integrate with 3rd party auth service (e.g. firebase)

color pallet
https://www.realtimecolors.com/?colors=1b0c1a-f9f2f8-b24fa5-d59fa4-c6877d&fonts=Inter-Inter

https://www.fontpalace.com/font-download/vag-rounded-bold/

flow
add ingredients to inventory
or view inventory
get those (inventory has ingredients in it)
select/filter the ingredients in the inventory you want to use
then send those to recipe api

click button to accept suggestion
upload image
post
