// App.js or HomePage.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const HomePage = () => {
  const [location, setLocation] = useState(null);
  const [serviceRequested, setServiceRequested] = useState(false);

  // Get the current location of the user
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      (error) => alert("Error getting location: " + error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  // Function to request roadside assistance
  const requestAssistance = () => {
    setServiceRequested(true);
    alert("Request for roadside assistance has been sent!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Roadside Assistance</Text>

      {/* Map with User's Location */}
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={location}
          showsUserLocation={true}
        >
          <Marker coordinate={location} title="You are here" />
        </MapView>
      ) : (
        <Text>Loading your location...</Text>
      )}

      {/* Services Offered */}
      <View style={styles.serviceContainer}>
        <Text style={styles.sectionTitle}>Services Available</Text>
        <View style={styles.serviceList}>
          <TouchableOpacity style={styles.serviceItem}>
            <Image source={require('./assets/tire.png')} style={styles.icon} />
            <Text style={styles.serviceText}>Tire Change</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceItem}>
            <Image source={require('./assets/battery.png')} style={styles.icon} />
            <Text style={styles.serviceText}>Battery Jumpstart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceItem}>
            <Image source={require('./assets/fuel.png')} style={styles.icon} />
            <Text style={styles.serviceText}>Fuel Delivery</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Request Assistance Button */}
      <TouchableOpacity style={styles.requestButton} onPress={requestAssistance}>
        <Text style={styles.buttonText}>Request Assistance</Text>
      </TouchableOpacity>

      {/* Emergency Contact */}
      <View style={styles.contactContainer}>
        <Text style={styles.contactTitle}>Emergency Contacts</Text>
        <Text style={styles.contactText}>Helpline: 1-800-123-4567</Text>
        <Text style={styles.contactText}>Nearby Towing: 1-800-987-6543</Text>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  map: {
    height: 300,
    width: '100%',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  serviceContainer: {
    marginBottom: 20,
  },
  serviceList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  serviceItem: {
    alignItems: 'center',
    width: 80,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  serviceText: {
    textAlign: 'center',
    fontSize: 14,
  },
  requestButton: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactContainer: {
    backgroundColor: '#e0f7fa',
    padding: 15,
    borderRadius: 8,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default HomePage;
