import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import theme, {LightTheme, DarkTheme} from '../../constants/theme';
import React, {useState} from 'react';
import Typography from '../../constants/Typography';
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
          styles.label,
        ]}>
        Name
      </Text>
      <TextInput
        style={[
          styles.inputStyle,
          {
            backgroundColor: isDarkMode ? '#d9d9d9' : LightTheme.primaryText,
          },
        ]}
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
          styles.label,
        ]}>
        Email
      </Text>
      <TextInput
        style={[
          styles.inputStyle,
          {
            backgroundColor: isDarkMode ? '#d9d9d9' : LightTheme.primaryText,
          },
        ]}
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
          styles.label,
        ]}>
        Message
      </Text>
      <TextInput
        style={[
          styles.inputStyle,
          styles.textArea,
          {
            backgroundColor: isDarkMode ? '#d9d9d9' : LightTheme.primaryText,
          },
        ]}
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
    marginBottom: 10,
    textAlign: 'center',
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semiBold,
  },
  label: {
    fontWeight: '600',
    //color: '#555',
    marginVertical: 8,
  },
  messageForm: {
    padding: 20,
    borderColor: 'black',
    margin: 10,
    borderRadius: 10,
    shadowRadius: 2,
    padding: 18,
    elevation: 2,
    marginBottom: 0,
  },
  messageTitle: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
    //color: 'black',
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 50,
    //backgroundColor: '#FAFAFA',
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
    //color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
