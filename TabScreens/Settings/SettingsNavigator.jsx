import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SettingsScreen from './SettingsHome';
import PrivacyPolicy from './PrivacyPolicy';
import RefundPolicy from './RefundPolicy';
import TermsConditions from './TermsConditions';
import LinearGradient from 'react-native-linear-gradient';
import {LightTheme} from '../../constants/theme';
import {StyleSheet} from 'react-native';
const SettingsStack = createNativeStackNavigator();

const SettingsNavigator = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackground: () => (
          <LinearGradient
            colors={[LightTheme.highlight, 'transparent']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={StyleSheet.absoluteFill}
          />
        ),
        headerTintColor: 'black',
        headerShown: true,
      }}>
      <SettingsStack.Screen
        name="SettingsHome"
        component={SettingsScreen}
        options={{headerTitle: 'Settings'}}
      />
      <SettingsStack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{headerTitle: 'Privacy Policy'}}
      />
      <SettingsStack.Screen
        name="RefundPolicy"
        component={RefundPolicy}
        options={{headerTitle: 'Refund Policy'}}
      />
      <SettingsStack.Screen
        name="TermsAndConditions"
        component={TermsConditions}
        options={{headerTitle: 'Terms & Conditions'}}
      />
    </SettingsStack.Navigator>
  );
};
export default SettingsNavigator;
