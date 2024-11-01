import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '@/app/screens/Home';

const Stack = createNativeStackNavigator();

function Route() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Route;
