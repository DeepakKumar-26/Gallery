import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import StackNavigator from './app/navigation/StackNavigator';

function App(props) {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default App;
