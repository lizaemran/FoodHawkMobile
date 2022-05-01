import React from 'react';
import { Text, View, Button , StyleSheet, Dimensions, Image } from 'react-native';
import Colors from '../constants/colors';
import { useSelector } from 'react-redux';
const CompletedOrderDetails = props => {
  const completedOrders = useSelector(state => state.orders.completedOrders);
  const order_id =  props.navigation.getParam('orderId');
  const selectedOrder = completedOrders.find(order => order.id === order_id);
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Order Details</Text>
      <View style={styles.button}>
            <Button title='Back To Completed Orders' onPress={() => props.navigation.navigate({routeName: 'CompletedOrders'})} color={Colors.primary} />
      </View>
      <View style={styles.detailItem}>
      <Image source={{uri:selectedOrder.restaurant.image}} style={styles.tinyLogo} />
      <Text style={styles.smalltext}>Order ID: {selectedOrder.id}</Text>
        <Text style={styles.smalltext}>Order Date: {selectedOrder.date}</Text>
        <Text style={styles.smalltext}>Order Time: {selectedOrder.time}</Text>
        <Text style={styles.smalltext}>Order Status: {selectedOrder.status}</Text>
        <Text style={styles.smalltext}>Order Total Price: {selectedOrder.total_price}</Text>
        <Text style={styles.smalltext}>User: {selectedOrder.user.name}</Text>
        <Text style={styles.smalltext}>Restaurant Name: {selectedOrder.restaurant.name}</Text>
        <Text style={styles.smalltext}>Restaurant Address: {selectedOrder.restaurant.location}</Text>
        <Text style={styles.smalltext}>Restaurant Contact: {selectedOrder.restaurant.phone}</Text>
        </View>


    </View>
  ); 
}

CompletedOrderDetails.navigationOptions = (navigationData) => {
     return {
         headerTitle: 'Order Details',
         
     }
 }

// CompletedOrderDetails.navigationOptions = (navigationData) => {
//    const order_id =  navigationData.navigation.getParam('orderId');
//     const selectedOrder = completedOrders.find(order => order.id === order_id);
//     return {
//         headerTitle: selectedOrder.id,
        
//     }
// }

const styles = StyleSheet.create({
    detailItem: {
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
    screen: {
        backgroundColor:Colors.secondary,
        flex:1,
        padding: 10,
        alignItems:'center',
        justifyContent:'center'
    },
    button: {
        marginVertical: 10,
        width: Dimensions.get('window').width * 0.9,    
        alignItems:'center',
        justifyContent:'center',
    },
    text : {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    smalltext : {
        fontSize: 16,
        color: Colors.primary,
        marginVertical: 5
    },
    tinyLogo: {
        width: Dimensions.get('window').width * 0.10,
        height: Dimensions.get('window').width * 0.10,
      },
});

export default CompletedOrderDetails;