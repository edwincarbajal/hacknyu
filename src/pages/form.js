import React from 'react'
import Wizard from '../container/Wizard'
import { Form, Header } from 'semantic-ui-react'
import { Field, FieldArray } from 'formik';

export default ({ symptoms, name }) => (
  <FieldArray
    name="options"
    render={arrayHelpers => (
        <Wizard.Page>
          <Form.Field>
            <Header as='h3'>Do you have any of the following symtoms in the past 14 days?</Header>
            <Field
              name={name}
              component="select"
              type="text"
              placeholder=""
              multiple={true}
            >
              {symptoms.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Field>
          </Form.Field>
        </Wizard.Page>
    )}
  />
)
