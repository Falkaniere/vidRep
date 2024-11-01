import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../app/screens/Home';

const Stack = createNativeStackNavigator();

function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={Home} />
    </Stack.Navigator>
  );
}

export default AppRoutes;
