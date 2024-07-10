import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {createContext, useContext} from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {AuthContext} from '../context/AuthContext';
import {useNavigation} from '@react-navigation/native';

const LogoutButton = () => {
  const {logout} = useContext(AuthContext);
  const navigation = useNavigation();

  const handlelogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handlelogout}>
      <SimpleLineIcons name="logout" size={18} color="white" />
    </TouchableOpacity>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
  container: {
    width: 60,
    padding: 8,
    backgroundColor: 'red',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
