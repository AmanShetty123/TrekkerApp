import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
const BottomNav = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('CreateTrek')}>
          <Ionicons name="create-sharp" color={'black'} size={28} />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('LocateTreks')}>
          <Ionicons name="map" color={'black'} size={28} />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('MyTreks')}>
          <Ionicons name="person-circle-sharp" color={'black'} size={28} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    backgroundColor: 'black',
    color: 'white',
    fontSize: 24,
  },
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default BottomNav;
