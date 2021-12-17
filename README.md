# Freshly App

## Overview

In our daily basis, cooking is a time-consuming task, and some of us struggle to came up with a recipe that is easy to cook, and overall, delicious. Freshly is a platform that aims to solve this problem. Our customers can choose from a variety of meals, which will be frozen and delivered to their homes. All meals are made by our professional chefs, and the quality of the meals is guaranteed. Just put them in the microwave and enjoy!

This back-end platform will allow us to create one or more administrators to manage the meals database, and create customers that can place orders. Administrators can only interact with the database, and customers can only see the meals, without modifying them. Customers and administrators can filter the meals by diet-type: regular, low-calorie, and plant-based. Keywords can be also used to filter the meals.

## Primary Objectives

- Create admin.
- Create customer.
- Login admin/customer.
- Create meals.
- Read (show) meals
- Update meals.
- Delete meals.
- Place orders.

## Secondary Objectives

- Add additional admins.
- Add additional customers.
- Filter meals by diet-type/keywords.
- Protect Create, Update, and Delete routes (admin only).
- Protect Order routes (customer only).
- Create receipt from order and add to customer's profile.

## Bonus Objectives

- Assign price depending on the number of meals.
- Enforce password declaration with several validation rules.

## Sample Data

The password requirements for admins and customers are as follows:
- Must be at least 6 characters long.
- At least one Uppercase letter.
- At least one Lowercase letter.
- At least one Number.
The password would be encrypted.

### Admin


```json
{
  "username": "TheBestAdmin",
  "password": "Hello1234"
  },
```

### Customer

```json
{
	"fname": "John",
	"lname": "Doe",
	"address": "123 Main Street",
	"username": "johndoe",
	"password": "Hello1234"
}
```
### Meal

```json
{
	"title": "Rice with Chicken",
  "_id": 21,
  "ingredients": "Rice, Chicken Breast, Carrots, Celery",
  "description": "The most delicious one-pot meal you will ever try. Eat it any time of the day.",
  "nutrition": "Calories: 500. Carbs: 38g. Total fat: 26g. Protein: 29g.",
   "diet": "regular"
}
```
### Order

To place an order we need to send an array of numbers, which represent the meal ids.

```json
{
  "mealsId": [1, 2, 3]
}
```

## Routes

All routes will be prefaced with `/api`.
All routes will be protected via JWT after authenticating an Admin or Customer.

### Admin Routes

`/admin`
`POST - /register`
`POST - /login`


### Customer Routes

`/customer`

`POST` - `/register`
`POST` - `/login`
`PUT` - `/order`

### Meal Routes

`/meals`

`PUT` - Create a meal.
`PUT` - `/:id` - Update a meal.
`DELETE` - `/:id` - Delete a meal.
`POST`- Get all meals (with optional filters).
`POST`- `/:id` - Get a meal by its id

## External APIs

None.
