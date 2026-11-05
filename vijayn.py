
import random
import string

print("===== PASSWORD GENERATOR =====")

length = int(input("Enter password length: "))

if length < 4:
    print("Password length must be at least 4.")
else:
    characters = string.ascii_letters + string.digits + string.punctuation

    password = ""

    for i in range(length):
        password += random.choice(characters)

    print("Your generated password is:")
    print(password)
