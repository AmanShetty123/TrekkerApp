import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {collection, addDoc} from 'firebase/firestore';
import {db} from '../configs/firebase';

const CreateTrekScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [slots, setSlots] = useState('');

  const handleCreateTrek = async () => {
    try {
      const trekData = {
        name,
        description,
        duration,
        image,
        location,
        price: Number(price),
        slots: Number(slots),
      };

      const docRef = await addDoc(collection(db, 'treks'), trekData);
      console.log('Trek added with ID: ', docRef.id);

      // Clear form fields after successful submission
      setName('');
      setDescription('');
      setDuration('');
      setImage('');
      setLocation('');
      setPrice('');
      setSlots('');
      navigation.navigate('Main');
      // Optionally, navigate to another screen or show a success message
    } catch (error) {
      console.error('Error adding trek: ', error);
      // Handle error state or display error message
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: 'black',
          marginBottom: 20,
          fontSize: 24,
          fontWeight: 'bold',
        }}>
        Fill Your trek Information
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        placeholderTextColor={'black'}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Description"
        placeholderTextColor={'black'}
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Duration"
        placeholderTextColor={'black'}
        value={duration}
        onChangeText={setDuration}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Image URL"
        placeholderTextColor={'black'}
        value={image}
        onChangeText={setImage}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Location"
        placeholderTextColor={'black'}
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Price"
        placeholderTextColor={'black'}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Select Slots"
        placeholderTextColor={'black'}
        value={slots}
        onChangeText={setSlots}
        keyboardType="numeric"
      />
      <Button title="Create Trek" onPress={handleCreateTrek} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    color: 'black',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: 'black',
  },
});

export default CreateTrekScreen;
