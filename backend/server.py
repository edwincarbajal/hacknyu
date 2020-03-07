from flask import Flask, request
app = Flask(__name__)

import classifier as clf

# Returns the risk assessment score for COVID19
@app.route("/", methods=['GET', 'POST'])
def hello():
    return "Your risk assessment score is: " + "{0:.0%}".format(clf.get_risk_score(clf.response_example))

if __name__ == "__main__":
    app.run()