import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const TimeoutScreen = ({ route }) => {
  const navigation = useNavigation();
  const { name = 'Unknown', location = 'Unknown', estimatedFee = "0" } = route.params || {}; 
  const [seconds, setSeconds] = useState(10);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 6) {
          clearInterval(timer);
          setAccepted(true);
          return 5; 
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>RAVB</Text>
      
      <View style={styles.circle}>
        {accepted ? (
          <AntDesign name="checkcircle" size={50} color="green" />
        ) : (
          <Text style={styles.timer}>{seconds} sec</Text>
        )}
      </View>
      
      {accepted && (
        <Text style={styles.acceptedText}>Mechanic Accepted</Text>
      )}
      
      <View style={styles.infoBox}>
        <Image source={require('./roadside/profile.jpg')} style={styles.avatar} />
        <View>
          <Text style={styles.infoText}>Name: {name}</Text>
          <Text style={styles.infoText}>Location: {location}</Text>
          <Text style={styles.infoText}>💵 Estimated Cost: {estimatedFee}</Text>
        </View>
      </View>

      {accepted && (
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate("PaymentScreen", { estimatedFee })}
        >
          <Text style={styles.buttonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TimeoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  timer: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  acceptedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 10,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: '80%',
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
