/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Detail from '../screens/Detail';
import Search from '../screens/Search';
import Navbar from './Navbar';

const Stack = createNativeStackNavigator();

class MainNavigation extends React.PureComponent {
  render() {
    return (
      <Stack.Navigator headerMode={'screen'}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTransparent: true,
            header: ({navigation}) => (
              <Navbar navigation={navigation} main={true} />
            ),
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            headerTransparent: true,
            header: ({navigation}) => <Navbar navigation={navigation} />,
          }}
        />

        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerTransparent: true,
            header: ({navigation}) => <Navbar navigation={navigation} />,
          }}
        />

        {/* <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Home></Home>
        </View> */}
      </Stack.Navigator>
    );
  }
}

export default MainNavigation;
