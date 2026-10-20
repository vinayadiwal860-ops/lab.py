
expenses = []

print("===== Daily Expense Tracker =====")

while True:
    print("\n1. Add Expense")
    print("2. View Expenses")
    print("3. Show Total")
    print("4. Exit")

    choice = input("Enter your choice: ")

    if choice == "1":
        item = input("Enter expense name: ")
        amount = float(input("Enter amount in rupees: "))

        if amount > 0:
            expenses.append((item, amount))
            print("Expense added successfully!")
        else:
            print("Enter an amount greater than zero.")

    elif choice == "2":
        if len(expenses) == 0:
            print("No expenses recorded.")
        else:
            for item, amount in expenses:
                print(item, "- ₹", amount)

    elif choice == "3":
        total = sum(amount for item, amount in expenses)
        print("Total expenses: ₹", round(total, 2))

    elif choice == "4":
        print("Thank you for using Expense Tracker!")
        break

    else:
        print("Invalid choice. Try again.")
