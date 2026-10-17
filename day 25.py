
balance = 1000

print("===== Welcome to Mini ATM =====")
print("1. Check Balance")
print("2. Deposit Money")
print("3. Withdraw Money")

choice = input("Enter your choice (1-3): ")

if choice == "1":
    print("Your balance is ₹", balance)

elif choice == "2":
    amount = int(input("Enter deposit amount: "))
    if amount > 0:
        balance = balance + amount
        print("Deposit successful!")
        print("New balance: ₹", balance)
    else:
        print("Enter a valid amount.")

elif choice == "3":
    amount = int(input("Enter withdrawal amount: "))
    if amount > 0 and amount <= balance:
        balance = balance - amount
        print("Please collect your money.")
        print("Remaining balance: ₹", balance)
    else:
        print("Invalid amount or insufficient balance.")

else:
    print("Invalid choice!")

print("Thank you for using Mini ATM!")
