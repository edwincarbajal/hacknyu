import React from 'react';
import axios from 'axios'
import Container from './components/container'
import Wizard from './container/Wizard'
import Form from './pages/form'
import Data from './data/'

function App() {
  return (
    <Container>
      <Wizard>
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
