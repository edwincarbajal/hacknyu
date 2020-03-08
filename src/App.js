import React from 'react';
import axios from 'axios'
import Container from './components/container'
import Wizard from './container/Wizard'
import Form from './pages/form'
import Data from './data/'

const getRiskScore = (symptoms) => {
  axios.post("http://bwliang.pythonanywhere.com/", symptoms)
    .then(function(response) {
      console.log(response)
    })
    .catch(function(error) {
      console.log(error)
    })
}

function App() {
  return (
    <Container>
      <Wizard
        initialValues={{
          options1: [],
          options2: []
        }}
        onSubmit={(values) => getRiskScore( JSON.stringify(values) ) }
      >
        {Object.keys(Data).map((option, index) => (
          <Form
            key={index}
            name={`options${index + 1}`}
            symptoms={Data[index]}
          />
        ))}
      </Wizard>
    </Container>
  );
}
export default App;
