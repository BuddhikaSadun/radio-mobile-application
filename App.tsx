import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Programs from './TabScreens/Programs';
import {Image, View, Text, useColorScheme} from 'react-native';
import logo from './assets/SethFMLogo.png';
import ContactUs from './TabScreens/ContactUs';
import Donations from './TabScreens/Donations';
import LinearGradient from 'react-native-linear-gradient';
import LiveRadio from './TabScreens/LiveRadio';
import {LightTheme} from './constants/theme';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

const Tab = createBottomTabNavigator();

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

const MyTabs = () => {
  const colorScheme = useColorScheme(); // 'light' | 'dark' | null

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].inactive,
        headerShown: true,
        headerBackground: () => (
          <LinearGradient
            colors={[LightTheme.highlight, 'transparent']} // red to transparent
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{flex: 1}}
          />
        ),
        headerTitle: () => (
          <View style={{flex: 1, paddingLeft: 120}}>
            <Image
              source={logo}
              style={{
                width: 130,
                height: 65,
                resizeMode: 'contain',
              }}
            />
          </View>
        ),
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
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="payments" size={size} color={color} />
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
    SplashScreen.hide(); // Hide the splash screen when the app is ready
  }, []);
  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <MyTabs />
    </NavigationContainer>
  );
}

export default App;
