import pandas as pd

df = pd.read_csv('data.csv')

print(df.duplicated())
# print(df.duplicated().sum())
# print(df.drop_duplicates())