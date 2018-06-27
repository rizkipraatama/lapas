import { 
  Splash, Login, Register, PrisonerList, 
  PrisonerDetail, Profile, Settings, 
  FormVisit1, FormVisit2, VisitList 
} from "./activities";
import { createStackNavigator, createDrawerNavigator  } from 'react-navigation';
import { HomeDrawer } from "./components";

Home = createDrawerNavigator({
  'Penghunni Lapas': {
    screen: PrisonerList,
  },
  'List Kunjungan': {
    screen: VisitList,
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
  Splash, Login, Register, Home, PrisonerDetail, Settings, FormVisit1, FormVisit2,
}, {
  initialRouteName: 'Splash',
  headerMode: 'none',
});

// [Login, Register, Home, PrisonerDetail].map(v => v.navigationOptions = {
//   header: null
// });

export default rootNav;