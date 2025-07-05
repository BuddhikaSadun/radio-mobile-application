import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Linking,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Typography from '../constants/Typography';
import axios from 'axios';
import {BASE_URL} from '../constants/BaseURL';
import theme, {LightTheme, DarkTheme} from '../constants/theme';
import Footer from '../TabScreens/Footer';
import SocialMedia from './SocialMedia';

export default function ContactUs() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (name, value) => {
    setForm({...form, [name]: value});
  };

  const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      alert('Please fill out all fields.');
      return;
    }

    if (!isValidEmail(form.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      await axios.post(`${BASE_URL}/feedback/create`, form);
      alert('Thank you for your feedback!');
      setForm({name: '', email: '', message: ''}); // reset form
    } catch (error) {
      console.error('Submission error:', error.message);
      alert('Failed to send feedback. Please try again.');
    }
  };

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ScrollView
      style={{
        backgroundColor: isDarkMode
          ? DarkTheme.background
          : LightTheme.background,
      }}>
      <Text
        style={[
          styles.headerText,
          {color: isDarkMode ? DarkTheme.primaryText : LightTheme.primaryText},
        ]}>
        CONTACT US
      </Text>

      <View
        style={[
          styles.messageForm,
          isDarkMode ? DarkTheme.cardBackground : LightTheme.cardBackground,
        ]}>
        <Text style={[styles.messageTitle, ,]}>Write your message below</Text>
        <Text style={{color: 'black'}}>Name</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Enter your Name"
          placeholderTextColor="grey"
          value={form.name}
          onChangeText={text => handleChange('name', text)}
        />

        <Text style={{color: 'black'}}>Email</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Enter your Email"
          keyboardType="email-address"
          placeholderTextColor="grey"
          value={form.email}
          onChangeText={text => handleChange('email', text)}
        />
        <Text style={{color: 'black'}}>Message</Text>
        <TextInput
          style={[styles.inputStyle, styles.textArea]}
          placeholder="Enter your Message"
          placeholderTextColor="grey"
          multiline
          numberOfLines={4}
          value={form.message}
          onChangeText={text => handleChange('message', text)}
        />
        <Button title="Submit" onPress={handleSubmit} color={'orange'} />
      </View>

      <View
        style={[
          styles.InfoContainer,
          {
            backgroundColor: isDarkMode
              ? DarkTheme.cardBackground
              : LightTheme.cardBackground,
          },
        ]}>
        <Text
          style={[
            styles.contactTitleText,
            {color: isDarkMode ? 'white' : 'black'},
          ]}>
          Contact Information
        </Text>

        <Text
          style={[
            styles.contactSubtitleText,
            {color: isDarkMode ? 'white' : 'black'},
          ]}>
          Song Requests
        </Text>

        <TouchableOpacity onPress={() => Linking.openURL('tel:+94312228181')}>
          <View style={[styles.infoSection, {paddingBottom: 10}]}>
            <FontAwesome5
              name="phone"
              size={28}
              color={isDarkMode ? 'white' : 'black'}
            />
            <Text
              style={[
                styles.infoText,
                {color: isDarkMode ? 'white' : 'black'},
                {paddingRight: 80},
              ]}>
              +94 31 222 8181
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openURL('tel:+94718758181')}>
          <View style={[styles.infoSection, {paddingBottom: 10}]}>
            <FontAwesome5
              name="phone"
              size={28}
              color={isDarkMode ? 'white' : 'black'}
            />
            <Text
              style={[
                styles.infoText,
                {color: isDarkMode ? 'white' : 'black'},
                {paddingRight: 80},
              ]}>
              +94 71 875 8181
            </Text>
          </View>
        </TouchableOpacity>

        <Text
          style={[
            styles.contactSubtitleText,
            {color: isDarkMode ? 'white' : 'black'},
          ]}>
          Marketing
        </Text>

        <View style={styles.infoWrap}>
          <TouchableOpacity
            onPress={() => Linking.openURL('tel:+94 76 317 5778')}>
            <View style={styles.infoSection}>
              <FontAwesome5
                name="phone"
                size={28}
                style={{alignContent: 'center'}}
                color={isDarkMode ? 'white' : 'black'}
              />
              <Text
                style={[
                  styles.infoText,
                  {color: isDarkMode ? 'white' : 'black'},
                ]}>
                +94 76 317 5778
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL('https://wa.me/94757104487')}>
            <View style={styles.infoSection}>
              <FontAwesome5
                name="phone"
                size={28}
                style={{alignContent: 'center'}}
                color={isDarkMode ? 'white' : 'black'}
              />
              <Text
                style={[
                  styles.infoText,
                  {color: isDarkMode ? 'white' : 'black'},
                ]}>
                +94 75 710 4487 (WhatsApp)
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL('tel:+94 75 864 0555')}>
            <View style={styles.infoSection}>
              <FontAwesome5
                name="phone"
                size={28}
                style={{alignContent: 'center'}}
                color={isDarkMode ? 'white' : 'black'}
              />
              <Text
                style={[
                  styles.infoText,
                  {color: isDarkMode ? 'white' : 'black'},
                ]}>
                +94 75 864 0555
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL('mailto:sethfm02@gmail.com')}>
            <View style={styles.infoSection}>
              <FontAwesome5
                name="envelope"
                size={28}
                style={{alignContent: 'center'}}
                color={isDarkMode ? 'white' : 'black'}
              />
              <Text
                style={[
                  styles.infoText,
                  {color: isDarkMode ? 'white' : 'black'},
                ]}>
                sethfm02@gmail.com
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              'https://www.google.com/maps/search/?api=1&query=St+Mary’s+Church+Jubilee+Hall,+Grand+St,+Negombo+11500',
            )
          }>
          <View style={[styles.infoSection, {paddingLeft: 1}]}>
            <FontAwesome5
              name="map-marker"
              size={30}
              style={{alignContent: 'center'}}
              color={isDarkMode ? 'white' : 'black'}
            />
            <Text
              style={[
                styles.infoText,
                {color: isDarkMode ? 'white' : 'black'},
              ]}>
              {'St Mary’s Church Jubilee Hall,\nGrand St, Negombo 11500'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <SocialMedia />
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    borderWidth: 2,
    padding: 10,
    borderColor: '#FF7F50',
    backgroundColor: '#FFDAB9',
    elevation: 4,
  },
  headerText: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semiBold,
  },

  messageForm: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderColor: 'black',
  },

  messageTitle: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 25,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  inputStyle: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    color: 'black',
  },
  textArea: {
    height: 100,
  },
  contactTitleText: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 35,
  },

  contactSubtitleText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingBottom: 10,
  },

  InfoContainer: {
    padding: 10,
    margin: 20,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
    elevation: 4,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoSection: {
    flexDirection: 'row',
    marginBottom: 18,
  },

  infoText: {
    fontSize: 16,
    marginLeft: 15,
  },
  connectText: {
    paddingTop: 30,
    textAlign: 'center',
    fontSize: Typography.fontSize.lg,
    fontWeight: 'bold',
  },
  socialIcons: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  iconImage: {width: 40, height: 40, marginHorizontal: 8},
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    elevation: 1,
  },
});
