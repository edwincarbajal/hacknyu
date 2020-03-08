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
    <Grid>
      {symptoms.map((option, index) => (
        <Grid.Row key={index}>
          <ButtonOptions handleChange={handleChange} content={option}/>
        </Grid.Row>
      ))}
    </Grid>
  </Form.Field>
)
