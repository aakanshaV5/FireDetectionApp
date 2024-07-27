// ResultScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const ResultScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { result } = route.params;

  const handleReportNow = () => {
    navigation.navigate('ReportScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>
        {result.fire_detected ? 'Fire Detected!' : 'No Fire Detected'}
      </Text>
      {result.fire_detected && (
        <TouchableOpacity style={styles.reportButton} onPress={handleReportNow}>
          <Text style={styles.reportButtonText}>Report Now</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 40,
    marginBottom: 20,
  },
  reportButton: {
    padding: 15,
    backgroundColor: '#FFACAC',
    borderRadius: 10,
  },
  reportButtonText: {
    color: 'white',
    fontSize: 30,
  },
});

export default ResultScreen;
