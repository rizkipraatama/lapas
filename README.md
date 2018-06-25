This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

## Get Started

# Install Yarn and Node Modules
1. Run the following command to Install yarn & get node_modules
```
npm i --global yarn
yarn
```

# Generate platforms folder
1. Run following command to generate the platform subfolders
```
react-native upgrade
```
 - Select n / no if prompted to preserved project config

# Install react-native-vector-icon
1. Copy this to android/app/build.gradle (not android/build.gradle) so we can use react-native-vector-icon
```
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"

```
 - Apply it before this line
```
project.ext.react = [
    entryFile: "index.js"
]
``` 

# Install react-native-splash-screen
1.  get package with yarn
```
yarn add react-native-splash-screen
```
2. install it to the platforms (automatic installation)
```
react-native link react-native-splash-screen
```
- manual installation: [crazycodeboy/rnss/plugin installation](https://github.com/crazycodeboy/react-native-splash-screen#second-stepplugin-installation)
3. update MainActivity.java to use splash-screen
```
import android.os.Bundle; // here
import com.facebook.react.ReactActivity;
// react-native-splash-screen >= 0.3.1
import org.devio.rn.splashscreen.SplashScreen; // here

public class MainActivity extends ReactActivity {
   @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this, R.style.SplashScreenTheme); // here
        super.onCreate(savedInstanceState);
    }
    // ...other code
}
```
4. create a file called `launch_screen.xml` in `android/app/src/main/res/layout` (create the `layout`-folder if it doesn't exist)
```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@drawable/launch_screen">
</LinearLayout>
```
5. Download the drawable in this [Google Drive](https://drive.google.com/file/d/10J8kh0oEsbC1bRo9ysSgbQitmXGKmp9F/view) and place the drawables in `android/app/src/main/res` folder
6. Add these color to `android/app/src/main/res/values/colors.xml`
```
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="primary_dark">#000000</color>
    <color name="bakcground_color">#68C3A3</color>
</resources>
```
7. add a style definition in `android/app/src/main/res/values/styles.xml`
```
<resources>

    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
        <!-- Customize your theme here. -->
    </style>
    <style name="SplashScreenTheme" parent="SplashScreen_SplashTheme">
        <item name="colorPrimaryDark">@color/bakcground_color</item>
    </style>
</resources>
```

# Run App
4. run react-native on android
```
yarn android
```