#!/usr/local/bin/python3

# classifier.py - returns a risk assessment probability for COVID19

# from official probability data
WEIGHTS_SYMPTOMS = {
    'fever': 87.9,
    'cough': 67.7,
    'fatigue': 38.1,
    'sputum': 33.4,
    'shortness_breath': 18.6,
    'body_pain': 14.8,
    'sore_throat': 13.9,
    'headache': 13.6,
    'chills': 11.4,
    'nasal_congestion': 4.8,
    'nausea': 5.0,
    'diarrhea': 3.7
}

# made these up, can use ML?
WEIGHTS_TRAVEL = {
    'resident': 2.5,
    'visited': 2.0,
    'contacted': 3.0,
    'none': 1.0
}


class Response:
    def __init__(self,
                 geographic_situation='none',
                 symptoms=[],
                 people_coughing=0,
                 people_coughing_w_mask=0,
                 wore_mask=False):

        if (people_coughing < 0 or people_coughing_w_mask < 0):
            raise ValueError("Can't have negative number of people")

        self.geographic_situation = geographic_situation
        self.symptoms = []
        self.people_coughing = people_coughing
        self.people_coughing_w_mask = people_coughing_w_mask
        self.wore_mask = wore_mask


# example of user input
response_example = Response('resident', ['cough', 'fever', 'body_pain'], 26, 15, False)

def get_risk_score(response):
    pass

print(get_risk_score(response_example))
