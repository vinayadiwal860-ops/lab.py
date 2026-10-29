
print("===== Student Grade Calculator =====")

name = input("Enter student name: ")

mark1 = float(input("Enter marks in Subject 1 (out of 100): "))
mark2 = float(input("Enter marks in Subject 2 (out of 100): "))
mark3 = float(input("Enter marks in Subject 3 (out of 100): "))

if not all(0 <= mark <= 100 for mark in [mark1, mark2, mark3]):
    print("Invalid marks! Enter marks between 0 and 100.")
else:
    total = mark1 + mark2 + mark3
    percentage = total / 3

    if percentage >= 90:
        grade = "A+"
    elif percentage >= 80:
        grade = "A"
    elif percentage >= 70:
        grade = "B"
    elif percentage >= 60:
        grade = "C"
    elif percentage >= 35:
        grade = "D"
    else:
        grade = "F"

    print("\n===== Result =====")
    print("Student:", name)
    print("Total:", total, "/ 300")
    print("Percentage:", round(percentage, 2), "%")
    print("Grade:", grade)
