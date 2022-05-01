import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
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
    // if(!fontLoaded){
    //     return (
    //       console.log('fonts not loaded');
    //     // <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />)
    //     );
    // }
    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const usernameHandler = (text) => {
        if(text === undefined){
            Alert.alert('Invalid Username', 'Please enter a valid username', [{text: 'Okay', style: 'destructive'}]);
        }
        setUsername(text.replace('<', ''));

    }
    const passwordHandler = (text) => {
        setPassword(text);
    }
    const emailHandler = (text) => {
        setEmail(text);
    }
    const nameHandler = (text) => {
        setName(text);
    }
    const phoneHandler = (text) => {
        setPhone(text);
    }
    const submitHandler = (e) => {
        e.preventDefault();
        if(username === ''){
            Alert.alert('Invalid Username', 'Please enter a valid username', [{text: 'Okay', style: 'destructive'}]);
        }
        else if(password === ''){
            Alert.alert('Invalid Password', 'Please enter a valid password', [{text: 'Okay', style: 'destructive'}]);
        }
        else if(email === ''){
            Alert.alert('Invalid Email', 'Please enter a valid email', [{text: 'Okay', style: 'destructive'}]);
        }
        else if(name === ''){
            Alert.alert('Invalid Name', 'Please enter a valid name', [{text: 'Okay', style: 'destructive'}]);
        }
        else if(phone === ''){
            Alert.alert('Invalid Phone', 'Please enter a valid phone number', [{text: 'Okay', style: 'destructive'}]);
        }
        else{
            Alert.alert('Success', 'Register Successful', [{text: 'Okay', style: 'destructive'}]);
            Keyboard.dismiss();
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
      <Header title='Food Hawk' />
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
        <TextInput 
        placeholder='Password' 
        blurOnSubmit 
        autoCapitalize='none' 
        autoCorrect={false}
        value={password}
        onChangeText={passwordHandler}
        style={{borderBottomColor:Colors.primary, borderBottomWidth: 1, padding: 10, marginVertical:10 }} />
        <TextInput 
        placeholder='Name' 
        blurOnSubmit 
        autoCapitalize='none' 
        autoCorrect={false}
        value={name}
        onChangeText={nameHandler}
        style={{borderBottomColor:Colors.primary, borderBottomWidth: 1, padding: 10, marginVertical:10 }} />
        <TextInput 
        placeholder='Email' 
        blurOnSubmit 
        autoCapitalize='none' 
        autoCorrect={false}
        value={email}
        onChangeText={emailHandler}
        keyboardType='email-address'
        style={{borderBottomColor:Colors.primary, borderBottomWidth: 1, padding: 10, marginVertical:10 }} />
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
        <Text style={styles.small}>Forget Password?</Text>
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
  }
});
 export default Register;