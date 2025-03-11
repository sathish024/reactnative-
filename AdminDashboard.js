import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
5555
const DashboardCard = ({ title, value, icon }) => (
  <View style={styles.card}>
    <MaterialIcons name={icon} size={40} color="white" />
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardValue}>{value}</Text>
  </View>
);

const AdminDashboard = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Admin Dashboard</Text>
      <View style={styles.row}>
        <DashboardCard title="Total Requests" value="1,245" icon="assignment" />
        <DashboardCard title="Active Requests" value="45" icon="sync" />
      </View>
      <View style={styles.row}>
        <DashboardCard title="Completed Requests" value="1,200" icon="check-circle" />
        <DashboardCard title="Revenue" value="$23,450" icon="attach-money" />
      </View>
      <View style={styles.section}>
        <Text style={styles.subHeading}>Service Provider Performance</Text>
        <View style={styles.performanceCard}>
          <Text>Top Provider: John Doe</Text>
          <Text>Completed Jobs: 200</Text>
          <Text>Rating: 4.8/5</Text>
        </View>
        <View style={styles.performanceCard}>
          <Text>Top Rated: Jane Smith</Text>
          <Text>Completed Jobs: 180</Text>
          <Text>Rating: 4.9/5</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#007bff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  cardValue: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginTop: 20,
    padding: 10,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  performanceCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});
export default AdminDashboard;
