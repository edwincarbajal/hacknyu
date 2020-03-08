import requests
from bs4 import BeautifulSoup
import pandas as pd

page = requests.get('https://coronavirus.1point3acres.com/')
soup = BeautifulSoup(page.content, 'html.parser')
# tr = soup.find_all("tr", {"class": "ant-table-row ant-table-row-level-0"})
rows = soup.find("tbody").find_all("tr")

case_no = [row.find_all("td")[0].get_text() for row in rows]
date = [row.find_all("td")[1].get_text() for row in rows]
location = [row.find_all("td")[2].get_text() for row in rows]
description = [row.find_all("td")[3].get_text() for row in rows]
source = [row.find_all("td")[4].get_text() for row in rows]

# print(case_no)
# print(date)
# print(location)
# print(description)
# print(source)

case_info = pd.DataFrame({
        'case_no': case_no,
        'date': date,
        'location': location,
        'description': description,
        'source': source,
    })
print(case_info)

case_info.to_csv("case_info_pg1.csv")
