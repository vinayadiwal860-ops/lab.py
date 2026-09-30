import turtle

t = turtle.Turtle()
t.speed(0)

colors = ["red", "blue", "green", "orange", "purple"]

for i in range(100):
    t.color(colors[i % 5])
    t.circle(100)
    t.right(10)

turtle.done()