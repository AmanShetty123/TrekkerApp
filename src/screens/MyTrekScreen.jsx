import React, {useContext, useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {collection, query, where, getDocs} from 'firebase/firestore';
import {db} from '../configs/firebase';
import {AuthContext} from '../context/AuthContext';
import MyTrekCard from '../components/MyTrekCard';
import LogoutButton from '../components/LogoutButton';

const MyTreksScreen = () => {
  const {user} = useContext(AuthContext);
  const [myTreks, setMyTreks] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchMyTreks = async () => {
        const userBookingsQuery = query(
          collection(db, 'bookings'),
          where('userId', '==', user.uid),
        );
        const querySnapshot = await getDocs(userBookingsQuery);
        const bookedTreks = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMyTreks(bookedTreks);
      };

      fetchMyTreks();
    }
  }, [user]);

  const renderItem = ({item}) => (
    <MyTrekCard
      trekName={item.trekName}
      slotsBooked={item.slotsBooked}
      bookingDate={item.bookingDate} // Ensure this is the correct field
    />
  );

  return (
    <View style={styles.container}>
      {myTreks.length === 0 ? (
        <Text style={styles.message}>No treks Found, Book treks</Text>
      ) : (
        <FlatList
          data={myTreks}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
      <LogoutButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    padding: 10,
  },
  message: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MyTreksScreen;
