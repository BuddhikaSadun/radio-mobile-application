import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import theme, {LightTheme, DarkTheme} from '../constants/theme';
import React, {useState} from 'react';
import Typography from '../constants/Typography';
import firestore from '@react-native-firebase/firestore';

function FeedbackForm() {
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
      //await axios.post(`${BASE_URL}/feedback/create`, form);
      await firestore().collection('Feedback').add({
        name: form.name,
        email: form.email,
        message: form.message,
        createdAt: new Date(),
      });
      alert('Thank you for your feedback!');
      setForm({name: '', email: '', message: ''});
    } catch (error) {
      console.log('Error:', error);
      alert('Failed to send feedback. Please try again.');
    }
  };
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={[
        styles.messageForm,
        {
          backgroundColor: isDarkMode
            ? DarkTheme.cardBackground
            : LightTheme.cardBackground,
        },
      ]}>
      <Text
        style={[
          styles.headerText,
          {
            color: isDarkMode ? DarkTheme.primaryText : LightTheme.primaryText,
          },
        ]}>
        Feedback Form
      </Text>
      <Text
        style={[
          styles.messageTitle,
          {
            color: isDarkMode ? DarkTheme.primaryText : LightTheme.primaryText,
          },
        ]}>
        Write your message below
      </Text>
      <Text
        style={[
          {
            color: isDarkMode ? DarkTheme.primaryText : LightTheme.primaryText,
          },
        ]}>
        Name
      </Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter your Name"
        placeholderTextColor="black"
        value={form.name}
        onChangeText={text => handleChange('name', text)}
      />
      <Text
        style={[
          {
            color: isDarkMode ? DarkTheme.primaryText : LightTheme.primaryText,
          },
        ]}>
        <Email></Email>
      </Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter your Email"
        keyboardType="email-address"
        placeholderTextColor="black"
        value={form.email}
        onChangeText={text => handleChange('email', text)}
      />
      <Text
        style={[
          {
            color: isDarkMode ? DarkTheme.primaryText : LightTheme.primaryText,
          },
        ]}>
        Message
      </Text>
      <TextInput
        style={[styles.inputStyle, styles.textArea]}
        placeholder="Enter your Message"
        placeholderTextColor="black"
        multiline
        numberOfLines={4}
        value={form.message}
        onChangeText={text => handleChange('message', text)}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

export default FeedbackForm;
const styles = StyleSheet.create({
  header: {
    borderWidth: 2,
    padding: 10,
    borderColor: '#FF7F50',
    backgroundColor: '#FFDAB9',
    elevation: 4,
  },
  headerText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semiBold,
  },

  messageForm: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderColor: 'black',
    margin: 10,
    borderRadius: 10,
    elevation: 1,
    shadowRadius: 2,
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
    borderWidth: 2,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    color: 'black',
  },
  textArea: {
    height: 100,
  },
  submitButton: {
    backgroundColor: 'orange',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
