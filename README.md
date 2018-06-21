This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

## Get Started

1. Run the following command to Install yarn & get node_modules
```
npm i --global yarn
yarn
```

2. Run following command to generate the platform subfolders
```
react-native upgrade
```
 - Select n / no if prompted to preserved project config

3. Copy this to android/app/build.gradle (not android/build.gradle) so we can use react-native-vector-icon
```
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"

```
 - Apply it before this line
```
project.ext.react = [
    entryFile: "index.js"
]
``` 

4. run react-native on android
```
yarn android
```