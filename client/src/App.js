import { NavigationContainer } from '@react-navigation/native';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './navigation/RootNavigator';
import AuthProvider from './contexts/auth/AuthProvider';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  // TODO return something!
  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <AuthProvider>
        <StatusBar style="auto" />
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </>
  );
}