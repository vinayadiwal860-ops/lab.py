
print("===== PYTHON QUIZ GAME =====")

questions = [
    ("Which language are we learning?", "python"),
    ("Which function displays output?", "print"),
    ("Which symbol is used for comments?", "#"),
    ("Which data type stores True or False?", "bool"),
    ("Which keyword is used for a loop?", "for")
]

score = 0

for question, answer in questions:
    print("\n" + question)
    user_answer = input("Your answer: ").lower().strip()

    if user_answer == answer:
        print("Correct answer!")
        score += 1
    else:
        print("Wrong answer! Correct answer:", answer)

print("\n===== QUIZ RESULT =====")
print("Your score:", score, "/", len(questions))

if score == 5:
    print("Excellent! Perfect score!")
elif score >= 3:
    print("Good job! Keep practicing.")
else:
    print("Keep learning. You can improve!")


