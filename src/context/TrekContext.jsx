// src/context/TrekContext.js

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import {collection, getDocs, doc, updateDoc} from 'firebase/firestore';
import {db} from '../configs/firebase';
import {fetchWeatherForZip} from '../services/weatherService';

const TrekContext = createContext();

export const TrekProvider = ({children}) => {
  const [treks, setTreks] = useState([]);
  useEffect(() => {
    const fetchTreks = async () => {
      const querySnapshot = await getDocs(collection(db, 'treks'));
      const treksList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTreks(treksList);
    };

    fetchTreks();
  }, []);

  const updateSlots = useCallback((id, newSlotCount) => {
    setTreks(prevTreks =>
      prevTreks.map(trek =>
        trek.id === id ? {...trek, slots: newSlotCount} : trek,
      ),
    );

    const trekDocRef = doc(db, 'treks', id);
    updateDoc(trekDocRef, {slots: newSlotCount}).catch(error => {
      console.error('Error updating slots:', error);
    });
  }, []);

  return (
    <TrekContext.Provider
      value={{
        treks,
        setTreks,
        updateSlots,
      }}>
      {children}
    </TrekContext.Provider>
  );
};

export const useTreks = () => useContext(TrekContext);
