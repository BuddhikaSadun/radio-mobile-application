import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-splash-screen';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {
  Image,
  View,
  Text,
  useColorScheme,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import logo from './assets/SethFMLogo.png';
import ContactUs from './TabScreens/ContactUs';
import Donations from './TabScreens/Donations';
import LiveRadio from './TabScreens/LiveRadio';
import Programs from './TabScreens/Programs';
import {LightTheme} from './constants/theme';
import SettingsNavigator from './TabScreens/Settings/SettingsNavigator';
import {ONBOARDING_COMPLETE_KEY} from './constants/storageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from './TabScreens/Onboarding/OnboardingScreen';
import PrivacyPolicy from './TabScreens/Settings/PrivacyPolicy';
import RefundPolicy from './TabScreens/Settings/RefundPolicy';
import TermsConditions from './TabScreens/Settings/TermsConditions';

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
  return (
    <TouchableOpacity
      style={styles.iconButton}
      onPress={() => navigation.navigate('Settings')}>
      <MaterialCommunityIcons name="cog" size={24} color="black" />
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
        name="Donations"
        component={Donations}
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

const RootStack = ({
  initialRouteName,
}: {
  initialRouteName: 'Onboarding' | 'Tabs';
}) => {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{headerShown: false}} // 👈 add this as a blanket default
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Tabs" component={MyTabs} />
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
  const [isCheckingOnboarding, setIsCheckingOnboarding] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const value = await AsyncStorage.getItem(ONBOARDING_COMPLETE_KEY);
        setHasCompletedOnboarding(value === 'true');
        console.log(value ? value : 'value not found');
      } catch (error) {
        // If storage read fails, default to showing onboarding to be safe
        setHasCompletedOnboarding(false);
      } finally {
        setIsCheckingOnboarding(false);
        SplashScreen.hide();
      }
    };

    checkOnboardingStatus();
  }, []);

  if (isCheckingOnboarding) {
    // Keep native splash screen visible while we check storage, OR
    // show a lightweight spinner if your splash hides immediately.
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <RootStack
        initialRouteName={hasCompletedOnboarding ? 'Tabs' : 'Onboarding'}
      />
    </NavigationContainer>
  );
}

export default App;
