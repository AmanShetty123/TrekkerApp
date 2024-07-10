import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {collection, doc, setDoc, getDoc} from 'firebase/firestore';
import {AuthContext} from '../context/AuthContext';
import {db} from '../configs/firebase';
import SosButton from '../components/SosButton';

const ContactsScreen = () => {
  const {user} = useContext(AuthContext);
  const [contacts, setContacts] = useState({
    contact1: '',
    contact2: '',
    contact3: '',
  });

  const [savedContacts, setSavedContacts] = useState([]);
  const [isEditing, setIsEditing] = useState(true);
  useEffect(() => {
    const fetchContacts = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            if (data.emergencyContacts) {
              setSavedContacts(data.emergencyContacts);
              setIsEditing(false);
            }
          }
        } catch (error) {
          console.error('Error fetching contacts:', error);
        }
      }
    };

    fetchContacts();
  }, [user]);

  const handleInputChange = (name, value) => {
    setContacts({...contacts, [name]: value});
  };

  const saveContacts = async () => {
    if (user) {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        const emergencyContacts = Object.values(contacts);
        await setDoc(userDocRef, {emergencyContacts}, {merge: true});
        setSavedContacts(emergencyContacts);
        setIsEditing(false);
        Alert.alert('Success', 'Emergency contacts saved successfully');
      } catch (error) {
        console.error('Error saving contacts:', error);
        Alert.alert('Error', 'Failed to save emergency contacts');
      }
    } else {
      Alert.alert('Error', 'User not logged in');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Contacts</Text>
      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter Contact 1"
            placeholderTextColor={'black'}
            value={contacts.contact1}
            onChangeText={text => handleInputChange('contact1', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Contact 2"
            placeholderTextColor={'black'}
            value={contacts.contact2}
            onChangeText={text => handleInputChange('contact2', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Contact 3"
            placeholderTextColor={'black'}
            value={contacts.contact3}
            onChangeText={text => handleInputChange('contact3', text)}
          />
          <TouchableOpacity style={styles.button} onPress={saveContacts}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.mainContainer}>
          {savedContacts.map((contact, index) => (
            <View key={index} style={styles.contactContainer}>
              <Text style={styles.contactText}>
                {`Contact ${index + 1}: ${contact}`}
              </Text>
            </View>
          ))}
        </View>
      )}
      {savedContacts.length > 0 && <SosButton />}
    </View>
  );
};

export default ContactsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: 'black',
  },
  button: {
    backgroundColor: '#316FF6',
    padding: 12,
    borderRadius: 10,
    marginTop: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  contactText: {
    fontSize: 14,
    marginBottom: 8,
    color: 'white',
  },
  contactContainer: {
    height: '15%',
    width: '90%',
    backgroundColor: 'black',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  mainContainer: {
    alignItems: 'center',
  },
});
