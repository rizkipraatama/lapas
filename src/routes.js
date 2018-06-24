import { Login, Register, ListKunjungan, PrisonerDetail, Profile, Settings, FormVisit } from "./activities";
import { createStackNavigator, createDrawerNavigator  } from 'react-navigation';
import * as Theme from './constant/Theme'
import { HomeDrawer } from "./components";

Home = createDrawerNavigator({
  'List Kunjungan': {
    screen: ListKunjungan,
  },
  'Profile' : {
    screen:  Profile,
  }
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
  Login, Register, Home, PrisonerDetail, Settings, FormVisit
}, {
  initialRouteName: 'Login',
  headerMode: 'none',
});

// [Login, Register, Home, PrisonerDetail].map(v => v.navigationOptions = {
//   header: null
// });

export default rootNav;