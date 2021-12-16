import User from "./User.js";
export default class Customer extends User {
  constructor({ fname, lname, address, username, password } = {}) {
    super({ username, password });
    this.role = "CUSTOMER";
    this.fname = fname;
    this.lname = lname;
    this.address = address;
  }

  validate() {
    const errors = [];

    if (!this.fname) {
      errors.push("First name is required");
    }

    if (!this.lname) {
      errors.push("Last name is required");
    }

    if (!this.address) {
      errors.push("Address is required");
    }

    if (!this.username) {
      errors.push("username is required");
    }

    if (!this.password) {
      errors.push("password is required");
    }

    return errors;
  }
}
