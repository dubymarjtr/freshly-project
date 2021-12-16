export default class Meal {
  constructor({ _id, title, description, ingredients, nutrition, diet } = {}) {
    this._id = _id;
    this.title = title;
    this.description = description;
    this.ingredients = ingredients;
    this.nutrition = nutrition;
    this.diet = diet;
  }

  validate() {
    const errors = [];

    if (!this._id) {
      errors.push("id is required");
    }

    if (!this.title) {
      errors.push("Title is required");
    }

    if (!this.description) {
      errors.push("Description is required");
    }

    if (!this.ingredients) {
      errors.push("Ingredients are required");
    }

    if (!this.nutrition) {
      errors.push("Nutritional facts are required");
    }

    if (!this.diet) {
      errors.push("Type of diet is required");
    }

    return errors;
  }
}
