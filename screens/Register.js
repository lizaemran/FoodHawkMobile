import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { useDispatch } from 'react-redux';
import { 
  StyleSheet, 
  Text, 
  View , 
  Button,  
  TextInput, 
  TouchableOpacity, 
  TouchableWithoutFeedback , 
  Keyboard, 
  Alert, 
  Dimensions,
  KeyboardAvoidingView, 
  ScrollView,
} from 'react-native';
// import {ScreenOrientation} from 'expo';
import Header from '../components/Header';
import  Colors from '../constants/colors';
import {Ionicons} from '@expo/vector-icons';
import { registerRiderAsync } from '../redux/auth';
// import * as Front from 'expo-font';
// import { AppLoading } from 'expo';

// const fetchFonts = () => {
//   return FontFace.loadAsync({
//     'Poppins': require('../assets/fonts/Poppins-Regular.otf'),
//     'Poppins-Light': require('../assets/fonts/Poppins-Light.otf'),
//     'Poppins-Medium': require('../assets/fonts/Poppins-Medium.otf'),
//   });
// }

const Register = props => {
    const [fontLoaded, setFontLoaded] = useState(false);
    const dispatch = useDispatch();
    // if(!fontLoaded){
    //     return (
    //       console.log('fonts not loaded');
    //     // <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />)
    //     );
    // }
    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    const validateEmail = (email) => {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    };
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');
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
    const emailHandler = (text) => {
      if(validateEmail(text)){
        setEmailError(false);
      }
      else{
        setEmailError(true);
      }
      setEmail(text);

    }
    const nameHandler = (text) => {
      if(text === ''){
        setNameError(true);
      }
      else{
        setNameError(false);
      }
      setName(text);

    }
    const phoneHandler = (text) => {
      if(text.length !== 11){
        setPhoneError(true);
      }
      else{
        setPhoneError(false);
      }
      setPhone(text);

    }
    const submitHandler = (e) => {
        e.preventDefault();
        if(username === ''){
            Alert.alert('Invalid Username', 'Please enter a valid username', [{text: 'Okay', style: 'destructive'}]);
        }
        else if(password === '' || password.length < 6){
            Alert.alert('Invalid Password', 'Please enter a valid password of length at least 6 characters', [{text: 'Okay', style: 'destructive'}]);
        }
        else if(email === ''){
            Alert.alert('Invalid Email', 'Please enter a valid email', [{text: 'Okay', style: 'destructive'}]);
        }
        else if(name === ''){
            Alert.alert('Invalid Name', 'Please enter a valid name', [{text: 'Okay', style: 'destructive'}]);
        }
        else if(phone === '' || phone.length !== 11){
            Alert.alert('Invalid Phone', 'Please enter a valid phone number', [{text: 'Okay', style: 'destructive'}]);
        }
        else{
            Keyboard.dismiss();
            dispatch(registerRiderAsync({
                username : username,
                password : password,
                email : email,
                name : name,
                phone : phone,
                lat : 0,
                lng : 0,
                navigation : props.navigation
            }))
        }
    }
    const screenRedirect = () => {
        // props.navigation.navigate({
        //     routeName: 'Login',
        // })
        props.navigation.goBack();
    }
   
  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => {
          Keyboard.dismiss();
      }}>     
        <>
      {/* <Header title='Food Hawk' /> */}
      <View style={styles.screen}>
        <View style={styles.inputContainer}>
        <Ionicons name="bicycle-outline" size={36} color={Colors.primary} />
        <Text style={styles.heading}>Rider Sign Up.</Text>
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={10}>
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
        <TextInput 
        placeholder='Name' 
        blurOnSubmit 
        autoCapitalize='none' 
        autoCorrect={false}
        value={name}
        onChangeText={nameHandler}
        style={{borderBottomColor:Colors.primary, borderBottomWidth: 1, padding: 10, marginVertical:10 }} />
        {nameError && <Text style={styles.danger}>Enter Valid Name</Text>}
        <TextInput 
        placeholder='Email' 
        blurOnSubmit 
        autoCapitalize='none' 
        autoCorrect={false}
        value={email}
        onChangeText={emailHandler}
        keyboardType='email-address'
        style={{borderBottomColor:Colors.primary, borderBottomWidth: 1, padding: 10, marginVertical:10 }} />
        {emailError && <Text style={styles.danger}>Enter Valid Email</Text>}
        <TextInput 
        placeholder='Phone' 
        blurOnSubmit 
        autoCapitalize='none' 
        autoCorrect={false}
        value={phone}
        keyboardType = 'numeric'
        maxLength={11}
        onChangeText={phoneHandler}
        style={{borderBottomColor:Colors.primary, borderBottomWidth: 1, padding: 10, marginVertical:10 }} />
        {phoneError && <Text style={styles.danger}>Enter Valid Phone</Text>}
        {/* <Text style={styles.small}>Forget Password?</Text> */}
        <TouchableOpacity activeOpacity={0.6}>
        <View style={styles.button} > 
            <Button title="Register" color={Colors.primary} onPress={submitHandler} />
        </View>
        </TouchableOpacity>
        </KeyboardAvoidingView>
        <TouchableOpacity activeOpacity={0.6} onPress={screenRedirect} >
        <Text style={styles.small}>Already a member? Login</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
    </View>
    </View>
    </>   
    </TouchableWithoutFeedback>
    </ScrollView>
  );
}

Register.navigationOptions = {
  headerTitle: 'Register',
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
    marginVertical: 40,

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
 export default Register;