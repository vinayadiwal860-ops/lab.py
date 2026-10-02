import random

number = random.randint(1, 10)

print("🎯 Number Guessing Game")
print("I have selected a number between 1 and 10.")

while True:
    guess = int(input("Enter your guess: "))

    if guess == number:
        print("🎉 Correct! You guessed the number!")
        break
    elif guess < number:
        print("Too low! Try again.")
    else:
        print("Too high! Try again.")