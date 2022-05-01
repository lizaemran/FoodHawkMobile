import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Login from '../screens/Login';
import Register from '../screens/Register';
import RiderDashboard from '../screens/RiderDashboard';
import CompletedOrders from '../screens/CompletedOrders';
import CompletedOrderDetails from '../screens/CompletedOrderDetails';
import Colors from '../constants/colors';
import Map from '../screens/Map';
import CurrentOrders from '../screens/CurrentOrders';


const Navigator = createStackNavigator({
    Login : {
        screen : Login,
        // navigationOptions : {
        //     header : null
        // },
    },
    Register : {
        screen : Register,
        // navigationOptions : {
        //     header : null
        // },
    },
    RiderDashboard : {
        screen : RiderDashboard,
        // navigationOptions : {
        //     header : null
        // },
    },
    CompletedOrders : {
        screen : CompletedOrders,
        
    },
    CompletedOrderDetails : {
        screen : CompletedOrderDetails,
    }, 
    CurrentOrders : {
        screen : CurrentOrders,
    },
    Map : {
        screen : Map,
    }
},{
    mode : 'modal',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Colors.header,
        },
        headerTintColor: Colors.headerText,
    }
});

export default createAppContainer(Navigator);