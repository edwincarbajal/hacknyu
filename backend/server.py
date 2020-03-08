import os.path
import sys
import json
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from classifier import get_risk_score, Response
from flask import Flask, request, make_response, jsonify

app = Flask(__name__)

# Returns the risk assessment score for COVID19 using the classifier we wrote
@app.route("/", methods=['POST'])
def main():
    print('POST request has been received! Getting the classifier\'s results...')
    req = json.loads(request.get_data())

    if 'None of the above' in req['symptoms2']:
        req['symptoms2'] = []
    if 'None of the above' in req['symptoms3']:
        req['symptoms3'] = []

    survey_response = Response(req['symptoms1'][-1], req['symptoms2'] + req['symptoms3'], 10, 0, False)
    res = {'probability': "{0:.0%}".format(get_risk_score(survey_response))}

    # if there is a json object in there and it's not empty
    if os.stat("./location.json").st_size > 0:
        with open('./location.json', 'r') as myfile:
            data = json.loads(myfile.read())
            res = {**res, **data}

    # or else Flask complains if it's served remotely
    res = jsonify(res)
    res.headers.add('Access-Control-Allow-Origin', '*')
    return res


# Radar webhook adding location metadata to be retrieved in our app
@app.route("/radar", methods=['POST'])
def radar():
    req = json.loads(request.get_data())
    with open('./location.json', 'w') as filetowrite:
        filetowrite.write(json.dumps(req))

    # or else Flask complains if it's served remotely
    res = make_response('', 200)
    res.headers.add('Access-Control-Allow-Origin', '*')
    return res


if __name__ == "__main__":
    app.run()
