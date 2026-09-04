import pandas as pd
import pyreadstat

df, meta = pyreadstat.read_sav('BASE DE DATOS PENCO SPSS.sav')

cols = ['Pr_Miel', 'Pr_Mermelada', 'Pr_Shampoo_natorga', 'Pr_Vinagre',
       'Pr_Jugos_saborizados', 'Pr_Helados_caseros', 'Pr_Jarabes_medicinales',
       'Pr_Licores_artesanales']

print("Meta column names to labels:")
for col in cols:
    try:
        print(f"{col}: {meta.column_names_to_labels[col]}")
        print(df[col].value_counts(normalize=True))
    except:
        pass
