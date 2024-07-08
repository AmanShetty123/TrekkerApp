import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {collection, getDocs, doc, updateDoc} from 'firebase/firestore';
import {db} from '../configs/firebase';
import Card from '../components/Card';
import {useTreks} from '../context/TrekContext';
import BottomNav from '../components/BottomNav';
import {useFocusEffect} from '@react-navigation/native';

const MainScreen = () => {
  const {treks, setTreks} = useTreks();

  const fetchTreks = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, 'treks'));
    const treksList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTreks(treksList);
  }, [setTreks]);

  useFocusEffect(
    useCallback(() => {
      fetchTreks();
    }, [fetchTreks]),
  );

  const renderItem = ({item}) => (
    <Card
      id={item.id}
      name={item.name}
      location={item.location}
      image={item.image}
      duration={item.duration}
      description={item.description}
      slots={item.slots}
      price={item.price}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={treks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
});
export default MainScreen;
