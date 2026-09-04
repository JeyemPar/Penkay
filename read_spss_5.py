import pandas as pd
import pyreadstat

df, meta = pyreadstat.read_sav('BASE DE DATOS PENCO SPSS.sav')
col = [c for c in df.columns if 'Shampoo' in c and 'Pr_' in c][0]
print(df[col].value_counts(normalize=True))
