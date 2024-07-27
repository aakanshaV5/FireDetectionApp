import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, PermissionsAndroid, Platform, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import RNFS from 'react-native-fs';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const [device, setDevice] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef(null);
const navigation = useNavigation();

  useEffect(() => {
    const requestCameraPermission = async () => {
      let status;
      if (Platform.OS === 'android') {
        status = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
      } else {
        status = await Camera.requestCameraPermission();
      }

      console.log('Camera permission status:', status);
      setHasPermission(status === 'granted' || status === 'authorized');
    };

    requestCameraPermission();
  }, []);

  useEffect(() => {
    if (devices && devices.length > 0) {
      const backDevice = devices.find(dev => dev.position === 'back');
      setDevice(backDevice);
      console.log('Selected device:', backDevice);
    }
  }, [devices]);

  const handleCapture = async () => {
    if (!cameraRef.current) {
      console.log('Camera reference is null');
      return;
    }

    setIsCapturing(true);

    try {
      const photo = await cameraRef.current.takePhoto({
        flash: 'off',
      });
      console.log('Photo captured:', photo);
      // Log the path where the image is saved
      console.log('Photo path:', photo.path);
      // Convert the image to base64
            const base64Image = await RNFS.readFile(photo.path, 'base64');
                  const base64ImageUri = `data:image/jpeg;base64,${base64Image}`;

            // Send the image to the server
            const response = await axios.post('http://192.168.163.99:5001/predict', {
              file: base64ImageUri,
            });

            console.log('Server response:', response.data);

            // Navigate to ResultScreen with the response
            navigation.navigate('ResultScreen', { result: response.data });
    } catch (error) {
      console.error('Error capturing photo:', error);
    } finally {
      setIsCapturing(false);

    }
  };

  if (devices === null) {
    return <Text>Loading... device is null</Text>;
  }
  if (!hasPermission) {
    return <Text>No camera access</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        {device ? (
          <Camera
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}

            photo={true}
          />
        ) : (
          <Text>Camera device not available</Text>
        )}
      </View>


      <TouchableOpacity
        style={styles.captureButton}
        onPress={handleCapture}
        disabled={isCapturing}
      >
        <View style={styles.roundButton} />
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFACAC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  roundButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFACAC',
  },
});

export default CameraScreen;
