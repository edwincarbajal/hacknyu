import requests as re
import csv

url = "https://api.radar.io/v1/geofences/"
API_KEY = "prj_test_sk_4afb042f1bc66611077cc222a421bcd398a8d26f"
header = {'Authorization': API_KEY}

with open('time_series_19-covid-Confirmed.csv', mode='r') as file:
    reader = csv.DictReader(file)
    line_count = 0
    for row in reader:
        if line_count == 0:
            print(f'Column names are {", ".join(row)}')
            line_count += 1
        data = {
            'description': str(row["Province/State"]),
            'tag': 'inf_zone',
            'type': 'circle',
            'radius': 10000,
            'coordinates': [row["Long"], row["Lat"]]
        }
        r = re.post(url=url, data=data, headers=header)
        response = r.text
        print(response)
