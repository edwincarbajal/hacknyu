import React from 'react'
import Wizard from '../container/Wizard'
import { Form } from 'semantic-ui-react'
import { Field, FieldArray } from 'formik';

export default ({ options1 }) => (
  <FieldArray
    name="options"
    render={arrayHelpers => (
        <Wizard.Page>
          <Form.Field>
            <label>Do you have any of the following symtoms in the past 14 days?</label>
            <Field
              name="options1"
              component="select"
              type="text"
              placeholder=""
              multiple={true}
            >
              {options1.map(o => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </Field>
          </Form.Field>
        </Wizard.Page>
    )}
  />
)
