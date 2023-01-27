import AuthContent from '../components/Auth/AuthContent';
import { createUser } from './../util/https';
import { useContext, useState } from 'react';
import LoadingOverlay from './../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from './../store/auth-context';

function SignupScreen() {
  const AuthCTX = useContext(AuthContext)
  const [isLoading,setIsLoading] = useState(false)
  const signUpHandler = async ({email,password}) => {
    setIsLoading(true)
    try {
      const token =  await createUser(email,password)
      AuthCTX.auth(token)
    } catch (error) {
      Alert.alert('Oops..','Could not create user,please check your input or try again later!')
      setIsLoading(false)
    }
   
  }

  if(isLoading) {
    return  <LoadingOverlay message={'Ждёмс....'}/>
  }
  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
