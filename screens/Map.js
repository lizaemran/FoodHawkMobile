import React from 'react';
import { Text, View,  StyleSheet, Image} from 'react-native';
import LocationPicker from '../components/LocationPicker';
import Colors from '../constants/colors';
const Maps = props => {
  return (
    <View style={styles.screen}>
      {/* <Text>Current Location</Text> */}
      {/* <Image source={require('../assets/gmaps.gif')} style={styles.tinyLogo} /> */}
      <LocationPicker />

    </View>
  ); 
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor:Colors.secondary,
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
   
    text: {
        color: 'white',   
    }
});

export default Maps;