import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const Card = ({
  id,
  name,
  location,
  image,
  duration,
  description,
  slots,
  price,
  zip,
}) => {
  const navigation = useNavigation();
  const handleBookSlot = () => {
    navigation.navigate('BookSlotScreen', {
      id,
      name,
      location,
      image,
      duration,
      description,
      slots,
      price,
      zip,
    });
  };
  return (
    <View style={styles.card}>
      <Image source={{uri: image}} style={styles.image} />
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.location}>{location}</Text>
      <Text style={styles.text}>Duration: {duration}</Text>
      <Text style={styles.text}>Description: {description}</Text>
      <Text style={styles.text}>Remaining slots : {slots}</Text>
      <Text style={styles.text}>Price per slot : ₹ {price}</Text>
      <Text style={styles.text}>Zip Code: {zip}</Text>
      <TouchableOpacity style={styles.bookButton} onPress={handleBookSlot}>
        <Text style={styles.bookButtonText}>Book Slot</Text>
      </TouchableOpacity>
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
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    backgroundColor: 'pink', // Temporary debug color
  },
  title: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  text: {
    fontSize: 16,
    marginVertical: 0,
    color: 'black',
    fontWeight: 'semibold',
  },
  location: {
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bookButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Card;
