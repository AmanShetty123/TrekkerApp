import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const MyTrekCard = ({
  bookingDate,
  slotsBooked,
  totalPrice,
  trekId,
  trekName,
  userId,
  zip,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{trekName}</Text>
      <Text style={styles.text}>Booked Slots: {slotsBooked}</Text>
      <Text style={styles.text}>
        Booking Date: {bookingDate.toDate().toLocaleDateString()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
});

export default MyTrekCard;
