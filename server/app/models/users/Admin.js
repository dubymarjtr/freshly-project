import User from "./User.js";
export default class Admin extends User {
  constructor({ username, password } = {}) {
    super({ username, password });
    this.role = "ADMIN";
  }

  validate() {
    const errors = [];
    if (!this.username) {
      errors.push("username is required");
    }

    if (!this.password) {
      errors.push("password is required");
    }

    return errors;
  }
}
