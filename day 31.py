
print("===== ECE Resistor Calculator =====")

colors = {
    "black": 0,
    "brown": 1,
    "red": 2,
    "orange": 3,
    "yellow": 4,
    "green": 5,
    "blue": 6,
    "violet": 7,
    "grey": 8,
    "gray": 8,
    "white": 9
}

first = input("Enter first band color: ").lower()
second = input("Enter second band color: ").lower()
multiplier = input("Enter multiplier color: ").lower()

if first in colors and second in colors and multiplier in colors:
    digits = colors[first] * 10 + colors[second]
    resistance = digits * (10 ** colors[multiplier])

    print("Resistance =", resistance, "ohms")
    print("Resistance =", resistance / 1000, "kilo-ohms")
else:
    print("Invalid color! Please check the color names.")
