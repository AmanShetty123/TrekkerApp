import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {auth} from '../configs/firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!password || !email) {
      setError('Please enter both email and password');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('Login');
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
          Sign Up
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            marginTop: 40,
          }}>
          Already have an account? Sign In
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

export default SignUpScreen;
