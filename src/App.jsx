import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {TrekProvider} from './context/TrekContext'; // Adjust the path as necessary
import {AuthProvider} from './context/AuthContext';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import MainScreen from './screens/MainScreen';
import BookSlotScreen from './screens/BookSlotScreen';
import CreateTrekScreen from './screens/CreateTrekScreen';
import MyTrekScreen from './screens/MyTrekScreen';
import ContactsScreen from './screens/ContactsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <TrekProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{title: 'Login'}}
            />
            <Stack.Screen
              name="Signup"
              component={SignUpScreen}
              options={{title: 'Signup'}}
            />
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{title: 'Welcome Trekker'}}
            />
            <Stack.Screen
              name="BookSlotScreen"
              component={BookSlotScreen}
              options={{title: 'Confirm Booking'}}
            />
            <Stack.Screen
              name="CreateTrek"
              component={CreateTrekScreen}
              options={{title: 'Confirm Booking'}}
            />
            <Stack.Screen
              name="Weather"
              component={ContactsScreen}
              options={{title: 'Contacts'}}
            />
            <Stack.Screen
              name="MyTreks"
              component={MyTrekScreen}
              options={{title: 'My Treks'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TrekProvider>
    </AuthProvider>
  );
};

export default App;
