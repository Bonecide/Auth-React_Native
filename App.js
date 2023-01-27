import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import { useCallback, useContext, useEffect, useState } from 'react';
import IconButton from './components/ui/IconButton';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';
const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {

  const authCTX = useContext(AuthContext)
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
        headerRight : ({tintColor}) => {

          return (
            <IconButton icon='exit' color={tintColor} size={24} onPress={authCTX.logout }/>
          )
        }
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const AuthCTX = useContext(AuthContext)
  return (
    
    <NavigationContainer>
      {!AuthCTX.isAuth&&<AuthStack />}
      {AuthCTX.isAuth && <AuthenticatedStack/>}
    </NavigationContainer>
  
  );
}
function Root() {
  const [isTryingToLogin,setTryingToLogin] = useState(true)
  const AuthCTX = useContext(AuthContext)
  const onLayoutRootView = useCallback(async () => {
    if (!isTryingToLogin) {
      await SplashScreen.hideAsync();
    }
  }, [isTryingToLogin]);
  useEffect(() => {
    const fetchToken = async () => {
      const AuthToken = await AsyncStorage.getItem("token");
      if (AuthToken) {
        AuthCTX.auth(AuthToken)
      }


      setTryingToLogin(false)
    };
    fetchToken();
  }, []);

  if (isTryingToLogin) {

    return null
  }
  return <Navigation/>
}
export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider >
       <Root/>
      </AuthContextProvider>
    </>
  );
}
