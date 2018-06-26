import { Splash, Login, Register, ListKunjungan, PrisonerDetail, Profile, Settings, FormVisit, FormVisit2 } from "./activities";
import { createStackNavigator, createDrawerNavigator  } from 'react-navigation';
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
  Splash, Login, Register, Home, PrisonerDetail, Settings, FormVisit, FormVisit2,
}, {
  initialRouteName: 'Splash',
  headerMode: 'none',
});

// [Login, Register, Home, PrisonerDetail].map(v => v.navigationOptions = {
//   header: null
// });

export default rootNav;