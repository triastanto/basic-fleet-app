import { Image, StyleSheet, Platform, TextInput, Button } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import DateTimePicker from '@/components/DateTimePicker';

const HomeScreen: React.FC = () => {
  const [pickupLocation, setPickupLocation] = useState<string>('');
  const [dropoffLocation, setDropoffLocation] = useState<string>('');
  const [pickupDatetime, setPickupDatetime] = useState<Date | null>(null);

  const handleDateSelected = (selectedDate: Date) => {
    console.log('Selected Date:', selectedDate);
    setPickupDatetime(selectedDate);
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Pickup Location</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Enter Pickup Location"
          value={pickupLocation}
          onChangeText={setPickupLocation}
        />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Dropoff Location</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Enter Dropoff Location"
          value={dropoffLocation}
          onChangeText={setDropoffLocation}
        />
      </ThemedView>
      <ThemedView>
        <ThemedText type="subtitle">Scheduled Date & Time</ThemedText>
        <DateTimePicker onDateSelected={handleDateSelected} />
        {pickupDatetime &&
        <ThemedText style={styles.dateText}>
          Selected: {pickupDatetime.toLocaleString()}
        </ThemedText>
      }
      </ThemedView>
    </ParallaxScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  dateText: {
    marginVertical: 8,
    fontSize: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
