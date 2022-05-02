import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { 
  StyleSheet, 
  Text, 
  View , 
  Button,  
  TextInput, 
  TouchableOpacity, 
  TouchableNativeFeedback,
  TouchableWithoutFeedback , 
  Keyboard, 
  Alert, 
  Dimensions, 
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
// import {ScreenOrientation} from 'expo';
import Header from '../components/Header';
import  Colors from '../constants/colors';
import {Ionicons} from '@expo/vector-icons';
import { loginRiderAsync } from '../redux/auth';
const Login = props => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    let ButtonComponent = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >= 21){
        ButtonComponent = TouchableNativeFeedback;
    }
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
  
    const usernameHandler = (text) => {
      if(text === ''){
        setUsernameError(true);
          // Alert.alert('Invalid Username', 'Please enter a valid username', [{text: 'Okay', style: 'destructive'}]);
      }else{
        setUsernameError(false);
      }
      setUsername(text.replace('<', ''));

    }
    const passwordHandler = (text) => {
      if(text.length < 6){
        setPasswordError(true);
        // Alert.alert('Invalid Password', 'Password must be at least 6 characters', [{text: 'Okay', style: 'destructive'}]);
    }
    else{
    setPasswordError(false);
    }
    setPassword(text);
    }
    const submitHandler = (e) => {
        e.preventDefault();
        if(username === ''){
            Alert.alert('Invalid Username', 'Please enter a valid username', [{text: 'Okay', style: 'destructive'}]);
        }
        else if(password === ''){
            Alert.alert('Invalid Password', 'Please enter a valid password', [{text: 'Okay', style: 'destructive'}]);
        }
        else{
            // Alert.alert('Success', 'Login Successful', [{text: 'Okay', style: 'destructive'}]);
            Keyboard.dismiss();
            dispatch(loginRiderAsync({
                username: username,
                password: password,
                navigation: props.navigation
            }))
        }
    }
  return (
      <TouchableWithoutFeedback onPress={() => {
          Keyboard.dismiss();
      }}>     
        <>
      {/* <Header title='Food Hawk' /> */}
      <View style={styles.screen}>
        <View style={styles.inputContainer}>
        <Ionicons name="bicycle-outline" size={36} color={Colors.primary} />
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={10}>
        <Text style={styles.heading}>Rider Log In.</Text>
        <TextInput 
        placeholder='Username' 
        blurOnSubmit autoCapitalize='none' 
        autoCorrect={false}
        value={username}
        onChangeText={usernameHandler}
        style={{borderBottomColor:Colors.primary, borderBottomWidth: 1, padding: 10, marginVertical:10 }} />
        {usernameError && <Text style={styles.danger}>Enter Valid Username</Text>}
        <TextInput 
        placeholder='Password' 
        blurOnSubmit 
        autoCapitalize='none' 
        autoCorrect={false}
        value={password}
        onChangeText={passwordHandler}
        style={{borderBottomColor:Colors.primary, borderBottomWidth: 1, padding: 10, marginVertical:10 }} />
        {passwordError && <Text style={styles.danger}>Enter Valid Password of length atleast 6</Text>}
        {/* <Text style={styles.small}>Forget Password?</Text> */}
        <ButtonComponent activeOpacity={0.6}>
        <View style={styles.button} > 
            <Button title="Login" color={Colors.primary} onPress={submitHandler} />
        </View>
        </ButtonComponent>
        </KeyboardAvoidingView>
        <TouchableOpacity activeOpacity={0.6}>
          <Text onPress={() => props.navigation.navigate({
            routeName: 'Register'
          })} style={styles.small}>Not a member? Join Us</Text>
        </TouchableOpacity>
        {Platform.OS !== 'web' && <Text onPress={() => props.navigation.navigate({
            routeName: 'RiderDashboard'
          })}>Mobile testing</Text>}
        <StatusBar style="auto" />
    </View>
    </View>
    </>   
    </TouchableWithoutFeedback>
  );
}

Login.navigationOptions = {
  headerTitle: 'Login',
  headerStyle: {
      backgroundColor: Colors.header
  },
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor:Colors.secondary,
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  inputContainer: {
    flexDirection:'column', 
    justifyContent: 'center', 
    alignItems:'center',
    width: '85%',
    minWidth: 300,
    maxWidth: '90%',
    elevation: 2,
    padding:30,
    borderRadius: 10,
    backgroundColor:'#f7f2f2',
  },
  button: {
    marginVertical: 10,
    width: Dimensions.get('window').width * 0.5,
  },

  heading: {
    color:'black',
    fontSize:20,
},
  small: {
    color:Colors.tertiary,
    marginTop:5,
  },
  danger: {
    color:Colors.danger,
    marginVertical:5,
    fontSize: 10
  }
});
 export default Login;