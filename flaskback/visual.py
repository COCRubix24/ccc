import pandas as pd
from ydata_profiling import ProfileReport

sales = pd.read_csv(r"public/uploads/updated_products3.csv")

profile = ProfileReport(sales)
# profile = ProfileReport(sales, explorative=True, dark_mode=True)

profile.to_file(output_file = "sales.html")