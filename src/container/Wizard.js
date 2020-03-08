import React, { Component } from 'react'
import axios from 'axios'
import Assessment from '../components/assesment'
import { Button, Form, Container, Grid, Header } from 'semantic-ui-react'
import Data from '../data/'

let buttons = {};

class Wizard extends Component {
  static Page = ({ children }) => children;
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      symptoms1: [],
      symptoms2: [],
      symptoms3: [],
      submitted: false,
    }
  }

  componentDidMount() {
    let keys = Object.keys(Data);

    keys.forEach((k, i) => {
      Data[k].map((s, i) => {
        buttons[`${s}${i}`] = false;
      })
    })
    console.log(buttons);
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

  handleChange = (input, index) => event => {
      const val = event.target.value;
      buttons[`${val}${index}`] = true;
      this.setState(prevState => ({
        [input]: [...prevState[input], val]
      }))
  }

  getRiskScore = symptoms => {
    let _this = this;
    console.log(_this);
    axios.post("https://bwliang.pythonanywhere.com/", symptoms)
      .then(function(response) {
        _this.setState({ submitted: true, probability: response.data.probability })
        console.log(response.data.probability)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  render() {
    const {step, submitted} = this.state;
    const isLastPage = (step === Object.keys(Data).length);
    const data = {
      symptoms1: this.state.symptoms1,
      symptoms2: this.state.symptoms2,
      symptoms3: this.state.symptoms3
    };
    let currQ = 0;
    return (
      <>
      {
        submitted ? (
          <Container>
            <Assessment stats={this.state.probability} />
          </Container>
        )
          : (
            <Form size="massive"
            style={{ padding: '25px 0' }}
              onSubmit={() => this.getRiskScore(data) }>
              <Container>
                <Header as='h3'>{(step - 1 < 1) ? `${step}. Please select an option below:` : `${step}. Have you had any of the following symptoms in the past two weeks?`}</Header>
                <Grid>
                  {Data[step - 1].map((option, index) => (
                    <Grid.Row key={index}>
                      <Button basic fluid toggle
                        active={
                          buttons[`${option}${index}`] ? true : false
                        }
                        key={index}
                        index={index}
                        value={option}
                        content={option}
                        type="button"
                        size="massive"
                        style={{ textAlign: 'left' }}
                        onClick={this.handleChange(`symptoms${step}`, index)}
                      />
                    </Grid.Row>
                  ))}
                </Grid>
              </Container>
              <div className="buttons">
                {step > 1 && (
                  <Container >
                    <Button
                      style={{ marginTop: '20px' }}
                      type="button"
                      className="secondary"
                      onClick={this.prevStep}
                    >
                      « Previous
                    </Button>
                  </Container>
                )}

                {!isLastPage && (
                  <Container>
                    <Button style={{ marginTop: '20px' }} color="teal" type="button" onClick={this.nextStep}>Next »</Button>
                  </Container>
                )}
                {isLastPage && (
                  <Container>
                    <Button style={{ marginTop: '20px' }} color="teal" type="submit">
                      Submit
                    </Button>
                  </Container>
                )}
              </div>
            </Form>
          )
      }
      </>
    )
  }
}
export default Wizard
