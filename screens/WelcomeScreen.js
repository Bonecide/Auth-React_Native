import { useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  axios  from 'axios';
import { useState } from 'react';
import { AuthContext } from './../store/auth-context';

function WelcomeScreen() {
  const [text,setText] = useState('')
  
  const authCTX = useContext(AuthContext)
  useEffect(() => {
    axios.get(`https://react-native-course-6a8fb-default-rtdb.firebaseio.com/message.json?auth=${authCTX.token}`)
    .then((res) => {
      setText(res.data)
    })
  },[authCTX.token])
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{text}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
