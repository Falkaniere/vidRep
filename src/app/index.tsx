import AppRoutes from '../route/index';
import { NavigationContainer } from '@react-navigation/native';

export default function AppIndex() {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
}
