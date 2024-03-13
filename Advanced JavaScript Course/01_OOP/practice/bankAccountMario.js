class BankAccount {
  constructor(account, holder, balance = 0) {
    this.accountNumber = account;
    this.accountHolder = holder;
    this.balance = balance;
  }
  deposit(amt) {
    if (amt > 0) {
      this.balance += amt
      return `Money deposited. New balance is $${this.balance}`
    } else {
      return "You can't deposit a negative amount"
    }
  }
  withdraw(amt) {
    if (this.balance < amt) {
      return `Not enough funds, you need $${amt - this.balance} to complete the operation`
    } else {
      this.balance -= amt
      return `Money withdrawn. New balance is $${this.balance}`
    }
  }
}

const mariosBankAccount = new BankAccount("123abc", "Mario Novaro Custodio")
console.log(mariosBankAccount)
console.log(mariosBankAccount.deposit(700))
console.log(mariosBankAccount)
console.log(mariosBankAccount.withdraw(2000))