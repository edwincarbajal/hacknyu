import React, { Component } from 'react'
import Options from '../pages/form'
import { Button, Form, Container, Grid } from 'semantic-ui-react'
import Data from '../data/'

class Wizard extends Component {
  static Page = ({ children }) => children;
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      symptoms1: [],
      symptoms2: [],
    }
  }

  nextStep = () => {
    const { step } = this.state
    this.setState({
        step : step + 1
    })
  }

  prevStep = () => {
    const { step } = this.state
    this.setState({
        step : step - 1
    })
  }

  handleChange = input => event => {
      const val = event.target.value;
      this.setState(prevState => ({
        [input]: [...prevState[input], val]
      }))
  }

  render() {
    const {step} = this.state;
    const isLastPage = step == Data.length;
    return (
      <Form size="massive">
        <Container>
          <Grid>
            {Data[step - 1].map((option, index) => (
              <Grid.Row key={index}>
                <Button basic fluid
                  value={option}
                  content={option}
                  type="button"
                  size="massive"
                  style={{ textAlign: 'left' }}
                  onClick={this.handleChange(`symptoms${step}`)}
                />
              </Grid.Row>
            ))}
          </Grid>
        </Container>
        <div className="buttons">
          {step > 1 && (
            <Button
              type="button"
              className="secondary"
              onClick={this.previous}
            >
              « Previous
            </Button>
          )}

          {!isLastPage && <Button color="teal" type="submit">Next »</Button>}
          {isLastPage && (
            <Button color="teal" type="submit">
              Submit
            </Button>
          )}
        </div>
      </Form>
    )}
}
export default Wizard
