/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
// import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigation from './components/MainNavigation';

const App = () => {
  return (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
  );
};

export default App;
