This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

## Get Started

1. Run following command to generate the platform subfolders
```
react-native upgrade
```
 - Select n / no if prompted to preserved project config

2. Copy this to android/app/build.gradle (not android/build.gradle) so we can use react-native-vector-icon
```
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"

```
 - Apply it before this line
```
project.ext.react = [
    entryFile: "index.js"
]
``` 

3. Install yarn, get node_modules & run react-native on android
```
npm i --global yarn
yarn
yarn android
```
