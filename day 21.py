
name = input("Enter student name: ")

mark1 = int(input("Enter marks in Subject 1: "))
mark2 = int(input("Enter marks in Subject 2: "))
mark3 = int(input("Enter marks in Subject 3: "))

total = mark1 + mark2 + mark3
average = total / 3

print("\nStudent Name:", name)
print("Total Marks:", total)
print("Average Marks:", average)

if average >= 35:
    print("Result: Passed")
else:
    print("Result: Failed")
