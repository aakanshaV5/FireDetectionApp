import React from 'react'
import { SafeAreaView , ScrollView , View , Text , StyleSheet , Image , Button , TouchableOpacity} from 'react-native'
const CoverScreens = ({navigation}) => {
return(

<SafeAreaView>
<ScrollView>
<View style={styles.containerText}>
<Text style={styles.headingText}> FireApp. </Text>

<Image
        source={require('/Users/aakansha/Desktop/Fire/components/img.png')}
        style={styles.image}
      />
 <Text style={styles.downText}> Detect fire and report. </Text>

 <View style={[{width:'60%' , marginTop:100 }]}>

 <Button style={styles.button}
 onPress={() => navigation.navigate('Detect Fire')}
   color="#EF9595"
   title="Get Started"
   fontSize='100' >

 </Button>

     </View>

</View>
<View>


</View>


</ScrollView>

</SafeAreaView>



)}

const styles = StyleSheet.create({
headingText:{
fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'center',
    color: '#000000'

       } ,
 containerText:{
 flex: 1,
alignItems: 'center',
  paddingTop: 70
 },
 image: {
     width: 350,
     height: 350,
     marginTop:60
   },

   downText:{
   fontWeight: 'bold',
       fontSize: 30,
       textAlign: 'center',
       color: '#000000',
       marginTop: 60


          },
     button:{

         justifyContent: 'center',
         alignItems: 'center',








     }

 }
)

export default CoverScreens;
