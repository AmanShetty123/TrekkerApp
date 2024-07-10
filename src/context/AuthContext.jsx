import React, {createContext, useState, useEffect} from 'react';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import {auth} from '../configs/firebase'; // Adjust this import to your Firebase configuration

// Create the context
export const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{user, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
