import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useCallback, useContext} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {db} from '../configs/firebase';
import {doc, updateDoc, getDoc, collection, addDoc} from 'firebase/firestore';
import {useTreks} from '../context/TrekContext';
import {AuthContext} from '../context/AuthContext';

const BookSlotScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {id, name, slots, price} = route.params;
  const {updateSlots} = useTreks();
  const [numberOfSlots, setNumberOfSlots] = useState(0);
  const [totalPrice, setTotalPrice] = useState(price);
  const {user} = useContext(AuthContext);

  const handleSlotChange = text => {
    const numSlots = parseInt(text, 10);
    if (!isNaN(numSlots) && numSlots > 0) {
      setNumberOfSlots(numSlots);
      setTotalPrice(numSlots * price);
    } else {
      setNumberOfSlots(0);
      setTotalPrice(price);
    }
  };

  const handleConfirmBooking = async () => {
    const newSlotCount = slots - numberOfSlots;
    if (newSlotCount < 0) {
      alert('Not enough slots available');
      return;
    }
    if (user) {
      // Add booking to Firestore
      await addDoc(collection(db, 'bookings'), {
        userId: user.uid,
        trekId: id,
        trekName: name,
        slotsBooked: numberOfSlots,
        totalPrice: numberOfSlots * price,
        bookingDate: new Date(),
      });

      // Update slots in Firestore
      updateSlots(id, newSlotCount);

      navigation.navigate('Main');
    } else {
      alert('You need to be logged in to book a trek.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book slots for {name}</Text>
      <Text
        style={{
          color: 'black',
        }}>
        Price per slot : ₹ {price}
      </Text>
      <View style={styles.inputBox}>
        <Text
          style={{
            color: 'black',
            marginBottom: 5,
          }}>
          Select number of slots:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter number of slots"
          placeholderTextColor="gray"
          keyboardType="number-pad"
          value={numberOfSlots.toString()}
          onChangeText={handleSlotChange}
        />
      </View>
      <Text
        style={{
          color: 'black',
        }}>
        Total Price: ₹ {totalPrice}
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleConfirmBooking}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
          }}>
          Confirm booking
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    width: '20%',
    borderColor: 'black',
    padding: 3,
    borderRadius: 5,
    marginBottom: 10,
    color: 'black',
  },
  inputBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: 'black',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
});
export default BookSlotScreen;
