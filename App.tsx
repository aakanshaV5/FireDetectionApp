import React from 'react'
import { SafeAreaView , ScrollView , View , Text  } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CoverScreens from './components/CoverScreens'
import DetectFireScreen from './components/DetectFireScreen';
import CameraScreen from './components/CameraScreen';
import ResultScreen from './components/ResultScreen';
import ReportScreen from './components/ReportScreen';
const Stack = createStackNavigator();
const App =() =>{
return(


<NavigationContainer>
      <Stack.Navigator initialRouteName="CoverScreens">
        <Stack.Screen name="CoverScreens" component={CoverScreens} />
        <Stack.Screen name="Detect Fire" component={DetectFireScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
         <Stack.Screen name="ResultScreen" component={ResultScreen} />
         <Stack.Screen name="ReportScreen" component={ReportScreen} />
      </Stack.Navigator>
    </NavigationContainer>



)}


export default App;
