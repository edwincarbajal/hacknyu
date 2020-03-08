import React from 'react';
import axios from 'axios'
import Container from './components/container'
import Wizard from './container/Wizard'
import Form from './pages/form'
import Data from './data/'

function App() {
  return (
    <Container>
      <Wizard />
    </Container>
  );
}
export default App;
