import csv
with open('exemple.csv','r') as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)