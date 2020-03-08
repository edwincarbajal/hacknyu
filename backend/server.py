import os.path
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from flask import Flask, request
from flask_cors import CORS, cross_origin
from classifier import get_risk_score, Response, response_example

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Returns the risk assessment score for COVID19
@app.route("/", methods=['POST'])
def main():
    // print(request.json)
    return "Your risk assessment score is: " + "{0:.0%}".format(get_risk_score(response_example))

if __name__ == "__main__":
    app.run()