import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const getDeliveredOrders = createAsyncThunk('orders/getDeliveredOrders' ,
        async(payload) => {
            const response = await fetch(`http://localhost:7000/api/rider/${payload.id}/order/delivered`, {  
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "x-auth-token": payload.token
            }});
            if(response.ok){
                const orders = await response.json();
                // console.log(rider);
                return {orders};
            }
});

export const getAssignedOrder = createAsyncThunk('orders/getAssignedOrder' ,
        async(payload) => {
            const response = await fetch(`http://localhost:7000/api/rider/${payload.id}/order`, {  
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "x-auth-token": payload.token
            }});
            if(response.ok){
                const order = await response.json();
                // console.log(rider);
                return {order};
            }
        });


const OrdersSlice = createSlice({
    name: "orders",
    initialState:
    {
        completedOrders: [],
        isLoading: false,
        currentOrder: {},
    },
    extraReducers: {
        [getDeliveredOrders.fulfilled]: (state,action) => {
            console.log("Got Delivered Order successfully.");
            return {...state, completedOrders: action.payload?.orders};
        },
        [getAssignedOrder.fulfilled]: (state,action) => {
            console.log("Got Assigned Order successfully.");
            return {...state, currentOrder: action.payload?.order};
        },
    },
});
export default OrdersSlice.reducer;