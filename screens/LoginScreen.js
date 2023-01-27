import AuthContent from '../components/Auth/AuthContent';
import { useState, useContext } from 'react';
import { SignIn } from './../util/https';
import LoadingOverlay from './../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from './../store/auth-context';

function LoginScreen() {
  const AuthCTX = useContext(AuthContext)
  const [isLoading,setIsLoading] = useState(false)
  const signUpHandler = async ({email,password}) => {
    setIsLoading(true)
    try {
      const token = await SignIn(email,password)
      AuthCTX.auth(token)
    } catch (error) {
      Alert.alert('Oh No..','Could not you log in,check your credentials! Or try again later')
      
    setIsLoading(false)
    }
  }

  if(isLoading) {
    return  <LoadingOverlay message={'Ждёмс....'}/>
  }
  return <AuthContent isLogin onAuthenticate={signUpHandler} />;
}

export default LoginScreen;
