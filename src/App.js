import React from 'react';
import axios from 'axios'
import Wizard from './container/Wizard'
import Options from './data/'
import { Field, ErrorMessage, FieldArray } from 'formik';

const getRiskScore = (symptoms) => {
  axios.post("/", symptoms)
    .then(function(response) {
      console.log(response)
    })
    .catch(function(error) {
      console.log(error)
    })
}

function App() {
  return (
    <div className="App">
      <h1>Multistep / Form Wizard </h1>
      <Wizard
        initialValues={{
          options1: [],
          options2: []
        }}
        onSubmit={(values) => getRiskScore( JSON.stringify(values) ) } // submit to backend here
      >
        <FieldArray
          name="options"
          render={arrayHelpers => (
              <Wizard.Page>
                <div>
                  <label>Do you have any of the following symtoms in the past 14 days?</label>
                  <Field
                    name="options1"
                    component="select"
                    type="text"
                    placeholder=""
                    multiple={true}
                  >
                    {Options[0].map(o => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </Field>
                </div>
              </Wizard.Page>
          )}
        />
        <FieldArray
          name="options"
          render={arrayHelpers => (
            <Wizard.Page>
              <label>Do you have any of the following symtoms in the past 14 days?</label>
              <Field
                name="options2"
                component="select"
                type="text"
                placeholder=""
                multiple={true}
              >
                {Options[1].map(o => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </Field>
            </Wizard.Page>
          )}
        />
      </Wizard>
    </div>
  );
}
export default App;
