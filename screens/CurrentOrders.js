import React from 'react';
import { Text, View, Button , StyleSheet, Dimensions, Linking} from 'react-native';
import Colors from '../constants/colors';
// import OrdersGridTile from '../components/OrdersGridtTile';
import { useSelector, useDispatch } from 'react-redux';
import { patchOrderStatusAsync } from '../redux/orders';
import {Ionicons} from '@expo/vector-icons';
import colors from '../constants/colors';
const CurrentOrders = props => {
    const currentOrder = useSelector(state => state?.orders?.currentOrder);
    const token = useSelector(state => state?.auth?.token);
    const auth = useSelector(state => state?.auth);
    console.log(currentOrder);
    // const renderGridItem = itemData => {
    //     return <OrdersGridTile 
    //     id={itemData.item.id} 
    //     date={itemData.item.date} 
    //     status={itemData.item.status}
    //     time={itemData.item.time}
    //     total_price={itemData.item.total_price}
    //     isCurrent={true}
    //        />;
    // };
    const dispatch = useDispatch();
    const phoneHandler = (number) => {
        Linking.openURL(`tel:${number}`);
    }
    const userDirections = () => {
        openURL(`https://www.google.com/maps/dir/?api=1&origin=${auth?.lat},${auth?.lng}&destination=${currentOrder?.user?.lat},${currentOrder?.user?.lng}&travelmode=driving`)
    }
    const restaurantDirections = () => {
        openURL(`https://www.google.com/maps/dir/?api=1&origin=${auth?.lat},${auth?.lng}&destination=${currentOrder?.restaurant?.lat},${currentOrder?.restaurant?.lng}&travelmode=driving`)
    }
  return (
    <View style={styles.screen}>
      <View style={styles.button}>
            <Button title='Back To Dashboard' onPress={() => props.navigation.navigate({routeName: 'RiderDashboard'})} color={Colors.primary} />
      </View>

      { Object.keys(currentOrder).length !== 0 ? (
        <View style={styles.grid}>
            <Text style={styles.smalltext}>Order Details</Text>
            <Text>{currentOrder?.id}</Text>
            <Text>{currentOrder?.date}</Text>
            <Text>{currentOrder?.time}</Text>
            <Text>{currentOrder?.status}</Text>
            <Text>{currentOrder?.total_price}</Text>
            <Text style={styles.smalltext}>Restaurant Details</Text>
            <Text>{currentOrder?.restaurant.name}</Text>
            <Text>{currentOrder?.restaurant.location}</Text>
            <Text>
            <Ionicons color={Colors.primary} size={23} name='call-outline' onPress={() => phoneHandler(currentOrder?.restaurant.phone)} />
            {currentOrder?.restaurant.phone}
            </Text>
            <Text>{currentOrder?.restaurant?.lat}</Text>
            <Text>{currentOrder?.restaurant?.lng}</Text>
            <Text style={styles.smalltext}>User Details</Text>
            <Text>{currentOrder?.user.name}</Text>
            <Text>
            <Ionicons color={Colors.primary} size={23}  name='call-outline' onPress={() => phoneHandler(currentOrder?.user.contact)} />
                {currentOrder?.user.contact}
            </Text>
            <Text>{currentOrder?.user.address}</Text>
            <Text>{currentOrder?.user.lat}</Text>
            <Text>{currentOrder?.user.lng}</Text>
            
            <View>
                {currentOrder?.status === 'pending' && (<>
                    <View style={{marginVertical:10}}>
                    <Button title='Get Restaurant Direction' onPress={restaurantDirections}
                    color={Colors.primary} style={{marginVertical: 10}} />
                    </View>
                    <Button title='Picked Yet?' onPress={() => {
                        dispatch(patchOrderStatusAsync({
                            id: currentOrder?.id,
                            status: 'picked',
                            token: token
                        }))
                    }} color={Colors.primary} />
                    </>)}
                {currentOrder?.status === 'picked' && (<>
                <View style={{marginVertical:10}}>
                <Button title='Get User Direction'  onPress={userDirections}
                    color={Colors.primary} />
                </View>
                <Button title='Delivered Yet?' onPress={() => {
                        dispatch(patchOrderStatusAsync({
                            id: currentOrder?.id,
                            status: 'delivered',
                            token: token
                        }))
                    }}  color={Colors.primary} />
                    </>)}
            </View>
        </View>
    //   <FlatList
    //     keyExtractor={(item, index) => item.id}
    //     numColumns={0} 
    //     data={currentOrder} 
    //     renderItem={renderGridItem} />
        ) : (
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
    grid:{
        flex:1,
        padding: 10,
        alignItems:'center',
        justifyContent:'center',
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 10,
        backgroundColor:'white',
        elevation: 2,
        marginVertical: 10
    },
    smalltext : {
        fontSize: 16,
        color: Colors.primary,
        marginVertical: 5
    },
   
});

export default CurrentOrders;