
print("===== Ohm's Law Calculator =====")
print("1. Calculate Voltage")
print("2. Calculate Current")
print("3. Calculate Resistance")

choice = input("Choose an option (1-3): ")

if choice == "1":
    current = float(input("Enter current in amperes: "))
    resistance = float(input("Enter resistance in ohms: "))

    voltage = current * resistance
    print("Voltage =", voltage, "volts")

elif choice == "2":
    voltage = float(input("Enter voltage in volts: "))
    resistance = float(input("Enter resistance in ohms: "))

    if resistance != 0:
        current = voltage / resistance
        print("Current =", current, "amperes")
    else:
        print("Resistance cannot be zero.")

elif choice == "3":
    voltage = float(input("Enter voltage in volts: "))
    current = float(input("Enter current in amperes: "))

    if current != 0:
        resistance = voltage / current
        print("Resistance =", resistance, "ohms")
    else:
        print("Current cannot be zero.")

else:
    print("Invalid choice!")

print("Thank you for using the calculator!")
