import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
const MapPreview = props => {
    let imagePreviewUrl;
    if(props.location) {
    imagePreviewUrl= `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=AIzaSyAOWEsA7XNwmoFasiw9hlAewldBeEJB8-o`;
    }
     return(
            <View style={{...styles.mapPreview, ...props.style}}>
               {props.location ? <Image source={{uri: imagePreviewUrl}} style = {{ width: 400, height: 200 }} /> : props.children}
            </View>

        );
    }

    const styles = StyleSheet.create({
        mapPreview: {
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 50
        },
    });

    export default MapPreview;