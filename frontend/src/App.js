import React from 'react';
import { Pane, Text, Button } from 'evergreen-ui'

import Roll from './components/Roll'
import Stats from './components/Stats'
import Plane from './components/Plane'

import './App.css';

const App = () => {
  return (
    <Pane className="App" display="flex" alignItems="stretch" flexDirection="column">
      <Plane></Plane>
      <Stats></Stats>
    </Pane>
  )
}
export default App;
