import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth';
import OrdersReducer from './orders';
export default configureStore({
    reducer: {
        auth : authReducer,
        orders : OrdersReducer
    },
})