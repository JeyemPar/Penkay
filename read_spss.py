import pandas as pd
import pyreadstat

df, meta = pyreadstat.read_sav('BASE DE DATOS PENCO SPSS.sav')
print(df.columns)
print("----------------")
for col in df.columns:
    if 'producto' in col.lower() or 'top' in col.lower() or 'derivado' in col.lower():
        print(col)
        print(df[col].value_counts(normalize=True).head(5) * 100)
