import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home, Income } from '../screens';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Income" component={Income} />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
