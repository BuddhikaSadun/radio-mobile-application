import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-splash-screen';
import {enableScreens} from 'react-native-screens';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {
  Image,
  Text,
  useColorScheme,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {LightTheme} from './constants/theme';
import logo from './assets/SethFMLogo.png';
import ContactUs from './TabScreens/ContactUs/ContactUs';
import LiveRadio from './TabScreens/LiveRadio/LiveRadio';
import Programs from './TabScreens/Programs/Programs';
import SettingsNavigator from './TabScreens/Settings/SettingsNavigator';
import PrivacyPolicy from './TabScreens/Settings/PrivacyPolicy';
import RefundPolicy from './TabScreens/Settings/RefundPolicy';
import TermsConditions from './TabScreens/Settings/TermsConditions';
import ProgramContribution from './TabScreens/ProgramContribution/ProgramContribution';

enableScreens();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  headerBg: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLogo: {width: 130, height: 65, resizeMode: 'contain'},

  iconButton: {
    marginHorizontal: 8,
    borderRadius: 20,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
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

const SettingsButton = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const iconColor = colorScheme === 'dark' ? '#FFFFFF' : '#000000';

  return (
    <TouchableOpacity
      style={styles.iconButton}
      onPress={() => navigation.navigate('Settings')}>
      <MaterialCommunityIcons name="cog" size={24} color={iconColor} />
    </TouchableOpacity>
  );
};

const MyTabs = () => {
  const colorScheme = useColorScheme(); // 'light' | 'dark' | null
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].inactive,
        headerShown: true,
        headerTitleAlign: 'center',

        headerRight: () => <SettingsButton />,
        headerBackground: () => {
          if (Platform.OS === 'ios') {
            return (
              <LinearGradient
                colors={[LightTheme.highlight, 'transparent']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={[styles.headerBg, {alignItems: 'flex-end'}]}>
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
        tabBarItemStyle: {
          maxWidth: 100,
        },
      }}
      initialRouteName="LiveRadio">
      <Tab.Screen
        name="LiveRadio"
        component={LiveRadio}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="radio" size={20} color={color} />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused
                  ? Colors[colorScheme ?? 'light'].tint
                  : Colors[colorScheme ?? 'light'].inactive,
                fontSize: 12,
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
            <MaterialCommunityIcons name="file" size={20} color={color} />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused
                  ? Colors[colorScheme ?? 'light'].tint
                  : Colors[colorScheme ?? 'light'].inactive,
                fontSize: 12,
              }}>
              Programs
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Contribution"
        component={ProgramContribution}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="donate" size={20} color={color} />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused
                  ? Colors[colorScheme ?? 'light'].tint
                  : Colors[colorScheme ?? 'light'].inactive,
                fontSize: 12,
              }}>
              Contribution
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="contacts" size={20} color={color} />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused
                  ? Colors[colorScheme ?? 'light'].tint
                  : Colors[colorScheme ?? 'light'].inactive,
                fontSize: 12,
              }}>
              Contact Us
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const RootStack = ({initialRouteName}: {initialRouteName: 'Tabs'}) => {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Tabs" component={MyTabs} options={{title: 'Home'}} />
      <Stack.Screen
        name="TermsConditions"
        component={TermsConditions}
        options={{
          headerShown: true,
          title: 'Terms & Conditions',
          headerTitleAlign: 'center',
          headerBackground: () => {
            if (Platform.OS === 'ios') {
              return (
                <LinearGradient
                  colors={[LightTheme.highlight, 'transparent']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={[styles.headerBg, {alignItems: 'flex-end'}]}>
                  <HeaderLogo />
                </LinearGradient>
              );
            }

            return <HeaderBackground />;
          },
        }}
      />

      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          headerShown: true,
          title: 'Privacy Policy',
          headerTitleAlign: 'center',
          headerBackground: () => {
            if (Platform.OS === 'ios') {
              return (
                <LinearGradient
                  colors={[LightTheme.highlight, 'transparent']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={[styles.headerBg, {alignItems: 'flex-end'}]}>
                  <HeaderLogo />
                </LinearGradient>
              );
            }

            return <HeaderBackground />;
          },
        }}
      />

      <Stack.Screen
        name="RefundPolicy"
        component={RefundPolicy}
        options={{
          headerShown: true,
          title: 'Refund Policy',
          headerTitleAlign: 'center',
          headerBackground: () => {
            if (Platform.OS === 'ios') {
              return (
                <LinearGradient
                  colors={[LightTheme.highlight, 'transparent']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={[styles.headerBg, {alignItems: 'flex-end'}]}>
                  <HeaderLogo />
                </LinearGradient>
              );
            }

            return <HeaderBackground />;
          },
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{headerTitleAlign: 'center', headerTintColor: 'white'}}
      />
    </Stack.Navigator>
  );
};
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <RootStack initialRouteName="Tabs" />
    </NavigationContainer>
  );
}

export default App;
