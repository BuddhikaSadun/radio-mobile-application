import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingsScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();

  const rows = [
    {
      label: 'Privacy Policy',
      screen: 'PrivacyPolicy',
      icon: 'shield-lock-outline',
    },
    {label: 'Refund Policy', screen: 'RefundPolicy', icon: 'cash-refund'},
    {
      label: 'Terms & Conditions',
      screen: 'TermsAndConditions',
      icon: 'file-document-outline',
    },
  ];

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#111' : '#f5f5f5'},
      ]}>
      <Text
        style={[styles.sectionTitle, {color: isDarkMode ? 'white' : 'black'}]}>
        General Settings
      </Text>
      {rows.map(({label, screen, icon}) => (
        <TouchableOpacity
          key={screen}
          style={[
            styles.row,
            {backgroundColor: isDarkMode ? '#1e1e1e' : 'white'},
          ]}
          onPress={() => navigation.navigate(screen)}>
          <MaterialCommunityIcons
            name={icon}
            size={20}
            color="orange"
            style={styles.rowIcon}
          />
          <Text
            style={[styles.rowText, {color: isDarkMode ? 'white' : 'black'}]}>
            {label}
          </Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="#aaa" />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, paddingTop: 16},
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    paddingHorizontal: 20,
    paddingVertical: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#888',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 6,
    marginHorizontal: 5,
    borderRadius: 10,
    elevation: 1,
  },
  rowIcon: {marginRight: 14},
  rowText: {flex: 1, fontSize: 16},
});

export default SettingsScreen;
