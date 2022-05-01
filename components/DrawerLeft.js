import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Maps from '../screens/Map';

const Drawer = createDrawerNavigator();

const DrawerLeft = () => {
  return(
    <NavigationContainer>
    <Drawer.Navigator useLegacyImplementation initialRouteName="Location">
      <Drawer.Screen name="Location" component={Maps} />
    </Drawer.Navigator>
  </NavigationContainer>
  )
};
export default DrawerLeft;