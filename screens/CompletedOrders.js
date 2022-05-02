import React from 'react';
import { View, Button , StyleSheet, Dimensions, FlatList, Text} from 'react-native';
import Colors from '../constants/colors';
import OrdersGridTile from '../components/OrdersGridtTile';
import { useSelector } from 'react-redux';
const CompletedOrders = props => {
    const completedOrders = useSelector(state => state.orders.completedOrders);
    const renderGridItem = itemData => {
        return <OrdersGridTile 
        id={itemData.item.id} 
        date={itemData.item.date} 
        status={itemData.item.status}
        time={itemData.item.time}
        total_price={itemData.item.total_price}
        image={itemData.item.restaurant.image}
        onSelect={() => props.navigation.navigate({
            routeName: 'CompletedOrderDetails',
            params: {
                orderId: itemData.item.id,
            }
          })}
           />;
    };
  return (
    <View style={styles.screen}>
      <View style={styles.button}>
            <Button title='Back To Dashboard' onPress={() => props.navigation.navigate({routeName: 'RiderDashboard'})} color={Colors.primary} />
      </View>
      {completedOrders.length > 0 ? (<FlatList
        keyExtractor={(item, index) => item.id}
        numColumns={0} 
        data={completedOrders} 
        renderItem={renderGridItem} />) : (
        <View style={styles.noOrders}>
            <Text style={styles.text}>No Completed Orders</Text>
        </View>
        )}
        
    </View>
  ); 
}

CompletedOrders.navigationOptions = {
    headerTitle: 'Completed Orders',
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor:Colors.secondary,
        flex:1,
        padding: 10
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
        color: Colors.primary
    },
    noOrders: {
        flex:1,
    }
   
});

export default CompletedOrders;