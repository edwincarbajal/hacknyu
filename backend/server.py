import os.path
import sys
import json
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from flask import Flask, request
from classifier import get_risk_score, Response, response_example

app = Flask(__name__)

# Returns the risk assessment score for COVID19 using the classifier we wrote
@app.route("/", methods=['POST'])
def main():
    print('POST request has been received! Getting the classifier\'s results...')
    req = json.loads(request.get_data())

    if 'None of the above' in req['options1']:
        req['options1'] = []
    if 'None of the above' in req['options2']:
        req['options2'] = []
    
    survey_response = Response('contacted', req['options1'] + req['options2'], 10, 0, False)
    return "Your risk assessment score is: " + "{0:.0%}".format(get_risk_score(survey_response))

if __name__ == "__main__":
    app.run()