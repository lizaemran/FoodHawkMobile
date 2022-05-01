import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import { toast } from 'react-toastify';

export const loginRiderAsync = createAsyncThunk('auth/loginRiderAsync',
async(payload) => {
    const response = await fetch('http://localhost:7000/api/auth/rider', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            username: payload.username,
            password: payload.password,
        })
    });
    if(response.ok){
        const token = await response.json();
        payload.navigation.replace('RiderDashboard');
        return {token};
    }
    else{
        var error = true;
        return {error};
    }
});

export const getRiderAsync = createAsyncThunk('auth/getRiderAsync',
async(payload) => {
    const response = await fetch('http://localhost:7000/api/rider/', {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
            "x-auth-token": payload.token,
        },
    });
    if(response.ok){
        const rider = await response.json();
        // console.log(rider);
        return {rider};
    }
});

const AuthSlice = createSlice({
    name: "auth",
    initialState: 
        {
            username:"", 
            name:"", 
            email:"", 
            phone:"",
            lat:"",
            lng: "",
            token: null,
        },
    reducers:{
        hydrate:(state, action) => {
            // do not do state = action.payload it will not update the store
            return action.payload
            },
        logoutUser: (state, action) => {
            // localStorage.removeItem('token');
            action.payload.navigate('Login');
            return{
                ...state,
                token: null,
                
            }
        },
    },
    extraReducers: {
        [loginRiderAsync.fulfilled]: (state,action) => {
            if(action?.payload?.error){
                // toast("Invalid username or password", {
                //     position: "top-right",
                //     autoClose: 5000,
                // });    
                console.log("Invalid username or password");        
            }
            else{
            console.log("Rider logged in successfully.");
            return{...state, token : action?.payload?.token?.token}
            }
        },
        [getRiderAsync.fulfilled]: (state,action) => {
            console.log("Got Rider successfully.");
            return{
                ...state,
                id: action?.payload?.rider?._id,
                username: action?.payload?.rider?.username,
                name: action?.payload?.rider?.name,
                email: action?.payload?.rider?.email,
                password: action?.payload?.rider?.password,
                phone: action?.payload?.rider?.phone,
                user_type: 'rider',
                isConfirmed : action?.payload?.rider?.isConfirmed,

            }
        },

    }
       
});
export const {logoutUser} = AuthSlice.actions;
export default AuthSlice.reducer; 