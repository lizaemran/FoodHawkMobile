import React from 'react';
import { Text, View, Button , StyleSheet, Dimensions, FlatList} from 'react-native';
import Colors from '../constants/colors';
import OrdersGridTile from '../components/OrdersGridtTile';
import { useSelector } from 'react-redux';
const CurrentOrders = props => {
    const currentOrder = useSelector(state => state.orders.currentOrder);
    const renderGridItem = itemData => {
        return <OrdersGridTile 
        id={itemData.item.id} 
        date={itemData.item.date} 
        status={itemData.item.status}
        time={itemData.item.time}
        total_price={itemData.item.total_price}
           />;
    };
  return (
    <View style={styles.screen}>
      <View style={styles.button}>
            <Button title='Back To Dashboard' onPress={() => props.navigation.navigate({routeName: 'RiderDashboard'})} color={Colors.primary} />
      </View>
      {currentOrder?.length > 0 ? (<FlatList
        keyExtractor={(item, index) => item.id}
        numColumns={0} 
        data={currentOrder} 
        renderItem={renderGridItem} />) : (
        <View style={styles.noOrders}>
            <Text style={styles.text}>No Current Orders</Text>
        </View>
        )}
        
    </View>
  ); 
}

CurrentOrders.navigationOptions = {
    headerTitle: 'Current Orders',
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
   
});

export default CurrentOrders;