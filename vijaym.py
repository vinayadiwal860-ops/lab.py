
import random

print("===== ROCK PAPER SCISSORS =====")

choices = ["rock", "paper", "scissors"]

computer = random.choice(choices)

player = input("Choose rock, paper or scissors: ").lower()

if player not in choices:
    print("Invalid choice!")

else:
    print("You chose:", player)
    print("Computer chose:", computer)

    if player == computer:
        print("It's a Draw!")

    elif (player == "rock" and computer == "scissors") or \
         (player == "paper" and computer == "rock") or \
         (player == "scissors" and computer == "paper"):
        print("Congratulations! You Win!")

    else:
        print("Computer Wins!")

print("Thanks for playing!")
