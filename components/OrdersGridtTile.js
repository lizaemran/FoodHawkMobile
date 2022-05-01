import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Dimensions , Image} from "react-native";
import Colors from "../constants/colors";
const OrdersGridTile = props => {
    return (
        <TouchableOpacity style={styles.gridItem} onPress={props.onSelect}>
        <View style={{...styles.container,...{color : Colors.header}}}>
        {props.image && <Image source={{uri:props.image}} style={styles.tinyLogo} />}
            <Text style={styles.text}>Order ID: {props.id}</Text>
            <Text >Date: {props.date}</Text>
            <Text >Time: {props.time}</Text>
            <Text >Status: {props.status}</Text>
            <Text >Total Bill: Rs.{props.total_price}</Text>
        </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        padding: 30,
        borderRadius: 10,
        elevation: 2,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10 ,
        borderColor: Colors.primary,
        borderWidth:  2,
    
    },
    container: {
        flex: 1,
        // borderRadius: 10,
        // shadowColor: 'black',
        // shadowOpacity: 0.26,
        // elevation: 3,
        // padding: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    text: {
        marginVertical: 5
    },
    tinyLogo: {
        width: Dimensions.get('window').width * 0.13,
        height: Dimensions.get('window').width * 0.13,
        borderRadius: '50%'
      },
});

export default OrdersGridTile;
        
