import { StackActions, NavigationActions, DrawerActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigationRef) {
  _navigator = navigationRef;
}

function replaceWith(routeName, params) {
  _navigator.dispatch(
    StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName, params })],
    })
  );
}

function openDrawer() {
  _navigator.dispatch(
    DrawerActions.openDrawer()
  );
}

export default {
  replaceWith,
  openDrawer,
  setTopLevelNavigator,
};