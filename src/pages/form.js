import React from 'react';
import { Form, Header, Button, Grid } from 'semantic-ui-react';

const ButtonOptions = ({ content, handleChange }) => (
  <Button basic fluid
    content={content}
    type="button"
    size="massive"
    style={{ textAlign: 'left' }}
    onClick={() => handleChange}
  />
)

export default ({symptoms, handleChange}) => (
  <Form.Field>
    <Header as='h3'>Have you had any of the following symptoms in the past 14 days?</Header>
    <Grid>
      {symptoms.map((option, index) => (
        <Grid.Row key={index}>
          <ButtonOptions handleChange={handleChange} content={option}/>
        </Grid.Row>
      ))}
    </Grid>
  </Form.Field>
)
