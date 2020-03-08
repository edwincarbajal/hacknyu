import requests as re
url_infzone = "https://api.radar.io/v1/geofences/inf_zones"
API_KEY = "prj_test_sk_4afb042f1bc66611077cc222a421bcd398a8d26f"

data = {'api_dev_key': API_KEY,
        'api_option': 'paste',
        'api_paste_code': source_code,
        'api_paste_format': 'python'}

# sending post request and saving response as response object
r = re.post(url=url_infzone, data=data)

# extracting response text
pastebin_url = r.text