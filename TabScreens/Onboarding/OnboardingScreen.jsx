import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

import OnboardingPic from '../../assets/SethFMLogo.png';
import {ONBOARDING_COMPLETE_KEY} from '../../constants/storageKeys';

const PRIMARY = '#F57C00';
const OnboardingScreen = () => {
  const navigation = useNavigation();

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeRefund, setAgreeRefund] = useState(false);

  const canContinue = agreeTerms && agreePrivacy && agreeRefund;

  const handleContinue = async () => {
    if (!canContinue) {
      return;
    }

    try {
      await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, 'true');

      navigation.replace('Tabs');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.imageContainer}>
          <Image
            source={OnboardingPic}
            resizeMode="contain"
            style={styles.image}
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Welcome to Seth FM Mobile</Text>
          <Text style={styles.description}>
            Listen to live radio, explore our daily programs and get connect
            with our community across social media platforms.
          </Text>
        </View>
      </View>

      <Text style={styles.subtitle}>
        Before continuing, please review and accept the following policies.
      </Text>

      <View style={styles.checkboxRow}>
        <TouchableOpacity
          style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}
          onPress={() => setAgreeTerms(!agreeTerms)}>
          {agreeTerms && <Ionicons name="checkmark" size={16} color="#fff" />}
        </TouchableOpacity>
        <Text style={styles.checkboxText}>
          I have read and agree to the{' '}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('TermsConditions')}>
            Terms & Conditions
          </Text>
        </Text>
      </View>

      <View style={styles.checkboxRow}>
        <TouchableOpacity
          style={[styles.checkbox, agreePrivacy && styles.checkboxChecked]}
          onPress={() => setAgreePrivacy(!agreePrivacy)}>
          {agreePrivacy && <Ionicons name="checkmark" size={16} color="#fff" />}
        </TouchableOpacity>
        <Text style={styles.checkboxText}>
          I have read and agree to the{' '}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('PrivacyPolicy')}>
            Privacy Policy
          </Text>
        </Text>
      </View>

      <View style={styles.checkboxRow}>
        <TouchableOpacity
          style={[styles.checkbox, agreeRefund && styles.checkboxChecked]}
          onPress={() => setAgreeRefund(!agreeRefund)}>
          {agreeRefund && <Ionicons name="checkmark" size={16} color="#fff" />}
        </TouchableOpacity>
        <Text style={styles.checkboxText}>
          I have read and agree to the{' '}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('RefundPolicy')}>
            Refund Policy
          </Text>
        </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        disabled={!canContinue}
        style={[styles.button, !canContinue && styles.buttonDisabled]}
        onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      {/*
     
*/}
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 300,
  },

  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  image: {
    width: 200,
    height: 200,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
    paddingBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 5,
  },
  subtitle: {
    paddingTop: 60,
    paddingBottom: 20,
    fontSize: 15,
    fontWeight: '600',
    color: PRIMARY,
    textAlign: 'center',
  },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: PRIMARY,
    borderRadius: 6,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: PRIMARY,
  },
  checkboxText: {
    fontSize: 15,
    color: '#444',
  },
  link: {
    color: '#1976D2',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  button: {
    height: 56,
    borderRadius: 16,
    backgroundColor: PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  buttonDisabled: {
    backgroundColor: '#BDBDBD',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
