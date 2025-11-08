import turtle 

t = turtle.Turtle()

colors = [ 'red','orange','yellow','green','purple']

for i in range (34):
    t.pencolor(colors[i % len(colors)])
    t.width(i / 100 + 1)
    t.forward(i)
    t.left(59)
turtle.done()