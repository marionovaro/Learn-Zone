class UserProfile {
  constructor(username, email, birthdate) {
      this.checkUsername(username)
      this.checkEmail(email)
      this.checkBirthdate(birthdate)
  }

  checkUsername(usernameValue) {
      if (!usernameValue || typeof usernameValue !== "string") {
          throw new Error("Invalid username.")
      } else {
          this._username = usernameValue
      }
  }
  
  checkEmail(emailValue) {
      if (!emailValue.includes("@")) {
          throw new Error("Invalid email.")
      } else {
          this._email = emailValue
      }
  }

  checkBirthdate(birthdateValue) {
    if (isNaN(Date.parse(birthdateValue))) {
        throw new Error("Invalid birthdate.")
    } else {
        this._birthdate = birthdateValue
    }
}
  
  get username() {
      return this._username
  }
  set username(usernameValue) {
      this.checkUsername(usernameValue)
  }
  
  get email() {
      return this._email
  }
  set email(emailValue) {
      this.checkEmail(emailValue)
  }

  get birthdate() {
    return this._birthdate
  }
  set birthdate(birthdateValue) {
    this.checkBirthdate(birthdateValue)
  }
}

const user = new UserProfile("mario04", "marionovaro04@gmail.com", "1990-01-01")
console.log(user.username = "")

