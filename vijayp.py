
import qrcode

print("===== QR CODE GENERATOR =====")

data = input("Enter text or website URL: ")

qr = qrcode.make(data)

qr.save("my_qrcode.png")

print("QR Code generated successfully!")
print("Saved as my_qrcode.png")
