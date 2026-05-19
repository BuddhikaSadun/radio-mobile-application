import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Programs from './TabScreens/Programs';
import {
  Image,
  View,
  Text,
  useColorScheme,
  Platform,
  StyleSheet,
} from 'react-native';
import logo from './assets/SethFMLogo.png';
import ContactUs from './TabScreens/ContactUs';
import Donations from './TabScreens/Donations';
import LinearGradient from 'react-native-linear-gradient';
import LiveRadio from './TabScreens/LiveRadio';
import {LightTheme} from './constants/theme';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();
const styles = StyleSheet.create({
  headerBg: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //paddingLeft: 50,
  },
  headerLogo: {width: 130, height: 65, resizeMode: 'contain'},

  iconButton: {
    marginHorizontal: 8,
    borderRadius: 20,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Colors = {
  light: {
    tint: 'orange',
    inactive: '#000000',
  },
  dark: {
    tint: 'orange',
    inactive: 'white',
  },
};
const HeaderBackground = () => (
  <LinearGradient
    colors={[LightTheme.highlight, 'transparent']}
    start={{x: 0, y: 0}}
    end={{x: 1, y: 0}}
    style={styles.headerBg}
  />
);

const HeaderLogo = () => <Image source={logo} style={styles.headerLogo} />;

const MyTabs = () => {
  const colorScheme = useColorScheme(); // 'light' | 'dark' | null
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].inactive,
        headerShown: true,
        headerTitleAlign: 'center',
        headerBackground: () => {
          if (Platform.OS === 'ios') {
            return (
              <LinearGradient
                colors={[LightTheme.highlight, 'transparent']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={[styles.headerBg, {paddingTop: 50}]}>
                <HeaderLogo />
              </LinearGradient>
            );
          }

          return <HeaderBackground />;
        },
        headerTitle: () => (Platform.OS === 'ios' ? null : <HeaderLogo />),

        tabBarStyle: {
          height: 70,
          paddingBottom: 5,
          paddingTop: 5,
        },
      }}>
      <Tab.Screen
        name="LiveRadio"
        component={LiveRadio}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="radio" size={size} color={color} />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused
                  ? Colors[colorScheme ?? 'light'].tint
                  : Colors[colorScheme ?? 'light'].inactive,
                fontSize: 14,
              }}>
              LiveRadio
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Programs"
        component={Programs}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="file" size={size} color={color} />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused
                  ? Colors[colorScheme ?? 'light'].tint
                  : Colors[colorScheme ?? 'light'].inactive,
                fontSize: 14,
              }}>
              Programs
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Donations"
        component={Donations}
        options={{
          headerShown: true,
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="donate" size={size} color={color} />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused
                  ? Colors[colorScheme ?? 'light'].tint
                  : Colors[colorScheme ?? 'light'].inactive,
                fontSize: 14,
              }}>
              Donations
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="contacts" size={size} color={color} />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused
                  ? Colors[colorScheme ?? 'light'].tint
                  : Colors[colorScheme ?? 'light'].inactive,
                fontSize: 14,
              }}>
              Contact Us
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <MyTabs />
    </NavigationContainer>
  );
}

export default App;
