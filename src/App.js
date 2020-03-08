import React from 'react';
import axios from 'axios'
import Wizard from './container/Wizard'
import Form1 from './pages/form1'
import Form2 from './pages/form2'
import Options from './data/'

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
        onSubmit={(values) => getRiskScore( JSON.stringify(values) ) }
      >
        <Form1 options1={Options[0]} />
        <Form2 options2={Options[1]} />
      </Wizard>
    </div>
  );
}
export default App;
