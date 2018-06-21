import { Login, Register, ListKunjungan } from "./activities";
import { createStackNavigator, createDrawerNavigator  } from 'react-navigation';
import * as Theme from './constant/Theme'
import { HomeDrawer } from "./components";

Home = createDrawerNavigator({
  'List Kunjungan': {
    screen: ListKunjungan,
  },
}, {
  contentComponent: HomeDrawer,
  drawerWidth: 300,
});

// Home.navigationOptions = {
//   // headerStyle: {
//   //   backgroundColor: Theme.PRIMARY_COLOR,
//   //   height: Theme.HEADER_HEIGHT,
//   // },
// };

rootNav = createStackNavigator({
  Login, Register, Home,
}, {
  initialRouteName: 'Login',
  headerMode: 'screen',
});

[Login, Register, Home].map(v => v.navigationOptions = {
  header: null
});

export default rootNav;