# praticando ingles e programacao
# Exercicio 1

day = int(input("Enter a number (1-7): "))
match day:
  case 1:
    print("Monday")
  case 2:
    print("Tuesday")
  case 3:
    print("Wednesday")
  case 4:
    print("Thursday")
  case 5:
    print("Friday")
  case 6:
    print("Saturday")
  case 7:
    print("Sunday")

# Exercicio 2
cor = input("Enter a color (red, green, blue): ").lower()
match cor:
    case "red":
        print("Red is the color of passion.")
    case "green":
        print("Green is the color of nature.")
    case "blue":
        print("Blue is the color of calmness.")
    case _:
        print("Unknown color.")

# Exercicio 3
hora = int(input("Enter the hour (0-23): "))
match hora:
    case 0 | 1 | 2 | 3 | 4 | 5:
        print("Good night!")
    case 6 | 7 | 8 | 9 | 10 | 11:
        print("Good morning!")
    case 12 | 13 | 14 | 15 | 16:
        print("Good afternoon!")
    case _:
        print("Good evening!")
