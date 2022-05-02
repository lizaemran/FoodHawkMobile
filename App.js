import React from 'react';
import { enableScreens } from 'react-native-screens';
// import DrawerLeft from './components/DrawerLeft';
import Navigator from './navigation/Navigator';
import store from './redux/Store';
import { Provider } from 'react-redux';
enableScreens();


export default function App() {
  // const [isLogin, setIsLogin] = useState(false);
  return (
   <>
      <Provider store={store}>
        <Navigator /> 
      </Provider>
     
   </>
  );
}
 
