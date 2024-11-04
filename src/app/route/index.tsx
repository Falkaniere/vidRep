import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VideoListScreen from '../screens/VideoList/VideoListScreen';
import VideoDetailScreen from '../screens/VideoDetail/VideoDetailScreen';

export type RootStackParamList = {
  VideoList: undefined;
  VideoDetail: { videoId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={VideoListScreen}
        options={{ title: 'Lista de vídeos' }}
        name="VideoList"
      />
      <Stack.Screen
        component={VideoDetailScreen}
        options={{ title: 'Detalhes' }}
        name="VideoDetail"
      />
    </Stack.Navigator>
  );
}

export default AppRoutes;
