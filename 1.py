import turtle

screen = turtle.Screen()
ball = turtle.Turtle()

ball.shape("circle")
ball.color("red")
ball.penup()

x = -200
y = 0

for i in range(100):
    ball.goto(x, y)
    x += 5
    y += 5

    if y > 100:
        y = -100

turtle.done()