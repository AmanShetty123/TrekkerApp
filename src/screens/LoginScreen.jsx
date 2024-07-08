import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import {auth} from '../configs/firebase';
import {useFocusEffect} from '@react-navigation/native';
import {signInWithEmailAndPassword} from 'firebase/auth';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useFocusEffect(
    useCallback(() => {
      setEmail('');
      setPassword('');
      setError('');
    }, []),
  );

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill all fields');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Main');
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Image source={require('../assets/Profile.jpeg')} style={styles.image} />
      <TextInput
        placeholder="Enter email"
        placeholderTextColor="black"
        style={styles.textInput}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Enter password"
        placeholderTextColor="black"
        style={styles.textInput}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? (
        <Text
          style={{
            color: 'red',
            fontWeight: 'semi-bold',
          }}>
          *{error}*
        </Text>
      ) : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
          }}>
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            marginTop: 40,
          }}>
          Dont have an account? Signup
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderRadius: 30 / 2,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontWeight: 'semibold',
    paddingLeft: 20,
    color: 'black',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  button: {
    backgroundColor: '#17A9FD',
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 30,
    marginTop: 0,
  },
  image: {
    height: 200,
    width: 200,
    marginBottom: 30,
  },
});

export default LoginScreen;
