import React, {useState} from "react";
import {View, Button, Text, ActivityIndicator, Alert, StyleSheet} from 'react-native';
import Colors from "../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import * as Location from 'expo-location';
// import * as Permissions from 'expo-permissions';
import MapPreview from "./MapPreview";
import { patchRiderLocationAsync } from "../redux/auth";
const LocationPicker = props => {
    const token = useSelector((state) => state.auth?.token);
    const id = useSelector((state) => state.auth?.id);
    const dispatch = useDispatch();
    const [pickedLocation, setPickedLocation] = useState();
    const [isFetching, setIsFetching] = useState(false);
    const verifyPermissions = async () => {
        const {status} = await Location.requestForegroundPermissionsAsync();
        if(status !== 'granted'){
            Alert.alert('Insufficient Permissions', 
            'You need to grant location permissions to use this app',
             [{text: 'Okay'}]);
            return false;
        }
        return true;
    }

    const getLocationHandler = async() => {
        const hasPermission = await verifyPermissions();
        if(!hasPermission){
            return;
        }
        try{
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({timeout: 5000});
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            });
            dispatch(patchRiderLocationAsync({
                token: token,
                id: id,
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            }))
            
        }
        catch(err){
            Alert.alert('Could not fetch location', 
            'Please try again later', 
            [{text: 'Okay'}]
            );
        }
        setIsFetching(false);

    }
    return (
        <View style={styles.locationPicker}>
           <MapPreview style={styles.mapPreview} location={pickedLocation}> 
                {isFetching ? <ActivityIndicator 
                size='large'
                color={Colors.primary} /> : <Text >No Location chosen yet</Text>}
           </MapPreview>
            <Button 
            title="Pick Location" 
            color={Colors.primary} 
            onPress={getLocationHandler} />
        </View>
    );
}

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15 
    },
    mapPreview: {
        marginBottom : 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
    }
});
export default LocationPicker;