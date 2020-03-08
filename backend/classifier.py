#!/usr/local/bin/python3
# classifier.py - returns a risk assessment probability for COVID19

# from official probability data
import os.path
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

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

# also made these up, can use ML?
WEIGHT_INTERACTIONS = {
    'coughing': 8,
    'with_mask': 3.2,
    'protection': 3.7
}

MAX_MAGNITUDE = 500

# on what magnitude of coughing people has this person interacted with
def get_interaction_magnitude(people):
    if (people <= 0):
        return 0
    elif (people <= 10):
        return 10
    elif (people <= 20):
        return 20
    elif (people <= 50):
        return 50
    elif (people <= 100):
        return 100
    else:
        return MAX_MAGNITUDE

# represents a response object from the frontend
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
        self.symptoms = symptoms
        self.people_coughing = people_coughing
        self.people_coughing_w_mask = people_coughing_w_mask
        self.wore_mask = wore_mask

# example of user input
response_example = Response('contacted', ['fever', 'fatigue', 'cough', 'body_pain'], 50, 0, False)

# get the maximum risk score
def get_max_score():
    score = 0

    # has EVERY symptom
    for symptom in WEIGHTS_SYMPTOMS:
        score += WEIGHTS_SYMPTOMS[symptom] * WEIGHTS_TRAVEL['contacted']

    # and NO protection meeting everyone coughing
    score += MAX_MAGNITUDE * WEIGHT_INTERACTIONS['coughing']

    return score

# get the risk score for this user
def get_risk_score(response):
    score = 0

    # add up scores for symptoms
    for symptom in response.symptoms:
        score += WEIGHTS_TRAVEL[response.geographic_situation] * WEIGHTS_SYMPTOMS[symptom]

    magnitude_coughing = get_interaction_magnitude(response.people_coughing)
    magnitude_coughing_with_mask = get_interaction_magnitude(response.people_coughing_w_mask)
    
    # add up scores for interactions
    score += magnitude_coughing * WEIGHT_INTERACTIONS['coughing']
    score -= magnitude_coughing_with_mask * WEIGHT_INTERACTIONS['with_mask']
    
    if (response.wore_mask):
        score -= magnitude_coughing * WEIGHT_INTERACTIONS['protection']

    return score / get_max_score()
