import React, {useState,useEffect} from 'react';
import { Text, View, StyleSheet, Dimensions, Alert, Switch, Platform} from 'react-native';
import Colors from '../constants/colors';
import {Ionicons} from '@expo/vector-icons';
// import { HeaderButtons, Item } from 'react-navigation-header-buttons';
// import HeaderButton from '../components/HeaderButton';
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux';
import { getRiderAsync, logoutUser, patchRiderStatusAsync } from '../redux/auth';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { getAssignedOrder, getDeliveredOrders } from '../redux/orders';
const RiderDashboard = props => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState(null);
    const getCurrentTime = () => {
        let today = new Date();
        let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
        let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
        let seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
        return hours + ':' + minutes + ':' + seconds;
    }
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const auth = useSelector(state => state.auth);
    var decodedToken;
    useEffect(() => {
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        setDate(date);
        let time = getCurrentTime();
        setTime(time);
      }, []);
    useEffect (() => {
        if(token !== null){
            decodedToken = jwt_decode(token);
            console.log(decodedToken);
            dispatch(getRiderAsync({
                token: token
            }));
            dispatch(getDeliveredOrders({
                token: token,
                id: decodedToken._id
            }))
            setInterval(() => {
                dispatch(getAssignedOrder({
                    token: token,
                    id: decodedToken._id
                }))
            }, 5000);
        }
    }, [token!==null]);
    const [isEnabled, setIsEnabled] = useState(false);
    useEffect(() => {
        if(auth.status === 'available'){
            setIsEnabled(true);
        }
        else{
            setIsEnabled(false);
        }
    }, [auth?.status]);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        dispatch(patchRiderStatusAsync({
            token: token,
            status: !isEnabled ? 'available' : 'inactive',
            id: auth?.id
        }))
    }
    const logoutHandler = () => {
        console.log('loggg')
        // Alert.alert('Logout', 'Are you sure you want to logout?', [
        //     {text: 'Yes', onPress: () => {
                dispatch(logoutUser({
                    navigation: props.navigation
                }))
                dispatch(patchRiderStatusAsync({
                    token: token,
                    status: 'inactive',
                    id: auth?.id
                }))
        //     }},
        //     {text: 'No', style: 'destructive'}
        // ]);
    }

  return (
      <>
      {/* <ToastContainer /> */}
    <View style={styles.screen}>
      <View style={styles.profile}>
        <Ionicons name="person-circle-outline" size={Dimensions.get('window').width/10} color={Colors.primary} />
        {/* <Text style={styles.textDescription}>ID: {decodedToken && decodedToken._id}</Text> */}
        <Text style={styles.textDescription}>Username: {auth?.username}</Text>
        <Text style={styles.textDescription}>Name: {auth?.name}</Text>
        {auth.status === 'available' ? (<Text style={styles.textDescription}>Status: <Text style={styles.activeStatus}>{auth?.status}</Text></Text>)
        : (<Text style={styles.textDescription}>Status: <Text style={styles.notActiveStatus}>{auth?.status}</Text></Text>)}
         
        <Switch
        trackColor={{ false: "#767577", true: "#cdf7dc" }}
        thumbColor={isEnabled ? Colors.active : "#f4f3f4"}
        style={{marginVertical: 5}}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        disabled= {auth?.status === 'busy' ? true : false}
      />
        <Text style={styles.textDescription}>Current Time: {time}</Text>
        <Text style={styles.textDescription}>Current Date: {date}</Text>
        <View styls={styles.buttonsContainers}>
      <View style={styles.buttonContainers}>
      <Ionicons name="location-outline" size={28} color='white' style={{marginRight: 10}} />
      <Text style={styles.text} onPress={() => props.navigation.navigate({routeName: 'Map'})}>Current</Text>
      </View>
      <View style={styles.buttonContainers}>
      <Ionicons name="receipt-outline" size={28} color='white' style={{marginRight: 10}} />
      <Text style={styles.text} onPress={() => props.navigation.navigate({routeName: 'CurrentOrders'})}>Current </Text>
      </View>
      <View style={styles.buttonContainers}>
      <Ionicons name="checkmark-circle-outline" size={28} color='white' style={{marginRight: 10}} />
      <Text style={styles.text} onPress={() => props.navigation.navigate({routeName: 'CompletedOrders'})}> Orders</Text>
      </View>
      <View style={styles.buttonContainers}>
      <Ionicons name="log-out-outline" size={28} color='white' style={{marginRight: 10}} />
            <Text style={styles.text} onPress={() => logoutHandler()} color={Colors.primary}>
            Logout
            </Text>
      </View>
      {Platform.OS !== 'web' && <Text onPress={() => props.navigation.navigate({
            routeName: 'Login'
          })}>Mobile testing</Text>}
      </View>
        </View>
    
    </View>
    </>
  ); 
}

RiderDashboard.navigationOptions = {
    headerTitle: 'Rider Dashboard',
    // headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //     <Item title='Logout' iconName='log-out-outline' 
    //     // onPress={() => console.log('it is clicked')} />
    //     />
    // </HeaderButtons>
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor:Colors.secondary,
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    profile: {
        backgroundColor: 'white',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        elevation: 5, 
        padding: 70,
        borderRadius: 10,
        marginVertical: Dimensions.get('window').height/50,
    },
    buttonsContainers: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
    },
    buttonContainers: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width * 0.50,
        marginVertical: 5,
        backgroundColor: Colors.primary,
        padding: 5,
        color: 'white',
        elevation: 5,
    },
    text: {
        color: 'white', 
        marginVertical: 10  
    },
    textDescription: {
        color: Colors.header,
        marginVertical: 5
    },
    activeStatus: {
        color: Colors.active,
        borderWidth: 2,
        borderColor: Colors.active,
        padding: 5,
        borderRadius: 5,
        backgroundColor: '#cdf7dc',
        marginVertical: 5
    },
    notActiveStatus: {
        color: Colors.notActive,
        borderWidth: 2,
        borderColor: Colors.notActive,
        padding: 5,
        borderRadius: 5,
        backgroundColor: '#e5e5e5',
        marginVertical: 5
    }
});

export default RiderDashboard;