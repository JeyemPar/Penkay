import pandas as pd
import pyreadstat

df, meta = pyreadstat.read_sav('BASE DE DATOS PENCO SPSS.sav')
print({k: v for k, v in meta.column_names_to_labels.items() if 'PRE_' in k})
print("---------")
print({k: v for k, v in meta.variable_value_labels.items() if 'PRE_' in k})
