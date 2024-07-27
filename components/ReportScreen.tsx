
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { PERMISSIONS, request, check, RESULTS } from 'react-native-permissions';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const GOOGLE_PLACES_API_KEY = 'AIzaSyDsbPqHix46PPV0nnh9pXbAMThYNaE4A6I';

const ReportScreen = () => {
  const [location, setLocation] = useState('');
  const [fireStations, setFireStations] = useState([]);

  const getCurrentLocation = async () => {
    try {
      const permission = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (permission !== RESULTS.GRANTED) {
        const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (result !== RESULTS.GRANTED) {
          Alert.alert('Permission denied', 'Location permission was not granted');
          return;
        }
      }
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentLocation = `${latitude},${longitude}`;
          setLocation(currentLocation);
        },
        (error) => {
          Alert.alert('Error getting current location', error.message);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    } catch (error) {
      Alert.alert('Error getting location permission', error.message);
    }
  };

  const fetchFireStations = async (location) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=5000&type=fire_station&key=${GOOGLE_PLACES_API_KEY}`
      );
      setFireStations(response.data.results);
    } catch (error) {
      console.error('Error fetching fire stations', error.message);
      Alert.alert('Error fetching fire stations', error.message);
    }
  };

  useEffect(() => {
    if (location) {
      fetchFireStations(location);
    }
  }, [location]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon name="location-outline" size={30} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Enter location"
          value={location}
          onChangeText={(text) => setLocation(text)}
        />
      </View>
      <Button title="Use Current Location" onPress={getCurrentLocation} color="#EF9595" />
      <FlatList
        data={fireStations}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <View style={styles.stationContainer}>
            <Text style={styles.stationName}>{item.name}</Text>
            <Text>{item.vicinity}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  stationContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  stationName: {
    fontWeight: 'bold',
  },
});

export default ReportScreen;
