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
    const varUpperCase = /[A-Z]/;
    const varLowerCase = /[a-z]/;
    const varNumber = /[0-9]/;
    const varLength = /.{6,}/;

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

    if (!varUpperCase.test(this.password)) {
      errors.push("password must contain at least one uppercase letter");
    }
    if (!varLowerCase.test(this.password)) {
      errors.push("password must contain at least one lowercase letter");
    }
    if (!varNumber.test(this.password)) {
      errors.push("password must contain at least one number");
    }
    if (!varLength.test(this.password)) {
      errors.push("password must be at least 6 characters long");
    }

    return errors;
  }
}
