
import time
from datetime import datetime

print("===== SMART ALARM CLOCK =====")

alarm_time = input("Set alarm time (HH:MM): ")

print("Alarm set for", alarm_time)
print("Waiting for alarm...")

while True:
    current_time = datetime.now().strftime("%H:%M")

    if current_time == alarm_time:
        print("\n🔔 WAKE UP! YOUR ALARM IS RINGING!")
        break

    time.sleep(1)

print("Alarm completed!")
