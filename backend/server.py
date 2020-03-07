from flask import Flask, request
from classifier import get_risk_score, Response, response_example

app = Flask(__name__)

# Returns the risk assessment score for COVID19
@app.route("/", methods=['GET', 'POST'])
def main():
    return "Your risk assessment score is: " + "{0:.0%}".format(get_risk_score(response_example))

if __name__ == "__main__":
    app.run()