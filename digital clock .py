
import time

print("===== DIGITAL CLOCK =====")

while True:
    current_time = time.strftime("%H:%M:%S")

    print("\rCurrent Time:", current_time, end="", flush=True)

    time.sleep(1)
