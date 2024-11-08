def contador():
    yield 1
    yield 2
    yield 3







gen = contador()

# Iterando usando next()
try:
    while True:
        print(next(gen))
except StopIteration:
    print("Fim dos valores!")


