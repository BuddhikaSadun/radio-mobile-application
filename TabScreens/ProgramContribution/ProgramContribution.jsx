import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useColorScheme,
  Platform,
  Button,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Typography from '../../constants/Typography';
import theme, {LightTheme, DarkTheme} from '../../constants/theme';
import SocialMedia from '../SocialMedia';
import Footer from '../Footer';
import firestore from '@react-native-firebase/firestore';

const initialForm = {
  name: '',
  contactNo: '',
  email: '',
  program: null,
  message: '',
  date: null,
};
const ProgramContribution = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [date, setDate] = useState(new Date());
  const [isDateFocus, setIsDateFocus] = useState(false); //date field
  const [open, setOpen] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedDate, setSelectedDate] = useState(false);
  const [form, setForm] = useState(initialForm);

  const programs = [
    {label: 'Sadaham Sithuwili', value: 'Sadaham Sithuwili'},
    {
      label: 'Thought for the Day - Sr. Selinta',
      value: 'Thought for the Day - Sr. Selinta',
    },
    {label: 'Dewa Dayawa', value: 'Dewa Dayawa'},
    {label: 'Nowina', value: 'Nowina'},
    {label: 'Catholic Spiritual Program', value: 'Catholic Spiritual Program'},
    {label: 'Emmaus', value: 'Emmaus'},
    {label: 'Holy Mass', value: 'Holy Mass'},
    {label: 'Divine Mercy Prayer', value: 'Divine Mercy Prayer'},
  ];

  const selectedProgram = programs.find(item => item.value === form.program);

  const validateForm = () => {
    if (!form.name.trim()) {
      alert('Please enter your name.');
      return false;
    }

    if (!form.contactNo.trim()) {
      alert('Please enter your contact number.');
      return false;
    }

    if (!form.email.trim()) {
      alert('Please enter your email.');
      return false;
    }
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(form.email.trim())) {
      alert('Please enter a valid email address.');
      return false;
    }
    if (!date) {
      alert('Please select a program date.');
      return false;
    }
    if (!selectedProgram) {
      alert('Please select a program.');
      return false;
    }

    return true;
  };

  const handleContinue = async () => {
    if (!validateForm()) return;

    try {
      await firestore().collection('programContributions').add({
        name: form.name.trim(),
        contactNo: form.contactNo.trim(),
        email: form.email.trim().toLowerCase(),
        program: form.program,
        prayerMessage: form.message.trim(),
        programDate: date,

        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      alert(
        'Thank you for your contribution request. We will contact you shortly.',
      );

      setForm(initialForm);
    } catch (error) {
      console.log(error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? DarkTheme.cardBackground
            : LightTheme.cardBackground,
        },
      ]}
      showsVerticalScrollIndicator={false}>
      {/* Header Card */}
      <View
        style={[
          styles.sectionCard,
          {
            backgroundColor: isDarkMode
              ? DarkTheme.background
              : LightTheme.cardBackground,
          },
        ]}>
        <Text
          style={[
            styles.title,
            {
              color: isDarkMode
                ? DarkTheme.primaryText
                : LightTheme.primaryText,
            },
          ]}>
          PROGRAM CONTRIBUTION
        </Text>

        <Text
          style={[
            styles.subtitle,
            {
              color: isDarkMode
                ? DarkTheme.secondaryText
                : LightTheme.secondaryText,
            },
          ]}>
          Complete the below details to continue for one-time catholic program
          contribution.
        </Text>

        {/* Form Card */}

        <View style={styles.card}>
          <Text style={[styles.sectionTitle]}>Contribution Information</Text>

          <Text style={styles.label}>Name</Text>

          <TextInput
            placeholder="Enter your name"
            placeholderTextColor={LightTheme.secondaryText}
            inputMode="text"
            style={styles.input}
            value={form.name}
            onChangeText={text => setForm({...form, name: text})}
          />

          <Text style={styles.label}>Contact Number</Text>

          <TextInput
            placeholder="Enter your contact number"
            placeholderTextColor={LightTheme.secondaryText}
            keyboardType="phone-pad"
            inputMode="tel"
            style={styles.input}
            value={form.contactNo}
            onChangeText={text => setForm({...form, contactNo: text})}
          />
          <Text style={styles.label}>Email Address</Text>

          <TextInput
            placeholder="Enter your Email address"
            placeholderTextColor={LightTheme.secondaryText}
            keyboardType="email-address"
            inputMode="email"
            style={styles.input}
            value={form.email}
            onChangeText={text => setForm({...form, email: text})}
          />

          <Text style={styles.label}>Select Program</Text>

          <Dropdown
            style={styles.dropdown}
            data={programs}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Choose a program' : '...'}
            placeholderStyle={{
              color: LightTheme.secondaryText,
            }}
            selectedTextStyle={{
              color: LightTheme.primaryText,
            }}
            itemTextStyle={{
              color: LightTheme.primaryText,
            }}
            value={form.program}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setForm({...form, program: item.value});
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              <MaterialCommunityIcons
                name="format-list-bulleted"
                size={20}
                color="orange"
                style={{paddingRight: 10}}
              />
            )}
          />
          <Text style={styles.label}>Select Program Date</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setIsDateFocus(true);
              setOpen(true);
            }}>
            <View
              style={[
                styles.dateInput,
                {
                  borderColor: isDateFocus ? LightTheme.highlight : '#CFCFCF',
                },
              ]}>
              <MaterialCommunityIcons
                name="calendar-month-outline"
                size={22}
                color="orange"
              />

              <Text
                style={[
                  styles.dateText,
                  {
                    color: selectedDate
                      ? LightTheme.primaryText
                      : LightTheme.secondaryText,
                  },
                ]}>
                {selectedDate
                  ? date.toLocaleDateString('en-GB')
                  : 'Select Date'}
              </Text>
            </View>
          </TouchableOpacity>

          <DatePicker
            modal
            mode="date"
            open={open}
            date={date}
            onConfirm={selected => {
              setOpen(false);
              setDate(selected);
              setSelectedDate(true);
              setIsDateFocus(false);
            }}
            onCancel={() => {
              setOpen(false);
              setIsDateFocus(false);
            }}
          />

          <Text style={styles.label}>Special Prayer Message</Text>

          <TextInput
            placeholder="Enter your prayer intention"
            placeholderTextColor={LightTheme.secondaryText}
            style={[styles.input, {height: 90}]}
            multiline
            textAlignVertical="top"
            value={form.message}
            onChangeText={text => {
              const words = text.trim().split(/\s+/).filter(Boolean);

              if (words.length <= 60) {
                setForm({...form, message: text});
              }
            }}
          />

          <TouchableOpacity
            style={[
              styles.payButton,
              !selectedProgram && styles.payButtonDisabled,
            ]}
            disabled={!selectedProgram}
            onPress={handleContinue}>
            <Text style={styles.payText}>Continue</Text>
          </TouchableOpacity>
        </View>
        {Platform.OS === 'ios' ? (
          ' '
        ) : (
          <View style={styles.bankCard}>
            <Text style={styles.bankDetails}>Bank Details</Text>
            <Text style={styles.donationInfo}>
              Name - The Friend Media Network (Pvt) Ltd
            </Text>
            <Text style={styles.donationInfo}>
              Account Number - 034 100 112 463 690
            </Text>
            <Text style={styles.donationInfo}>Bank Name - Peoples Bank</Text>
            <Text style={styles.donationInfo}>Branch - Negombo</Text>
          </View>
        )}

        <SocialMedia />
        <Footer />
      </View>
    </ScrollView>
  );
};

export default ProgramContribution;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#F4F6F8',
    marginHorizontal: 5,
  },

  headerCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 22,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
  },
  sectionCard: {
    paddingHorizontal: 5,
  },
  title: {
    fontSize: Typography.fontSize.xl,
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 25,
    color: '#222',
  },

  subtitle: {
    textAlign: 'center',
    paddingVertical: 20,
    color: '#666',
    lineHeight: 22,
    fontSize: 15,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    elevation: 3,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '700',
    marginBottom: 18,
    color: '#222',
  },

  label: {
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
    marginTop: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 50,
    backgroundColor: '#FAFAFA',
    color: 'black',
  },

  dropdown: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 50,
    backgroundColor: '#FAFAFA',
  },

  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    elevation: 3,
    marginBottom: 20,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },

  summaryLabel: {
    color: '#666',
    fontSize: 15,
  },

  summaryValue: {
    color: '#222',
    fontWeight: '600',
  },

  amount: {
    color: 'orange',
    fontWeight: Typography.fontWeight.medium,
    fontSize: Typography.fontSize.sm,
  },

  payButton: {
    backgroundColor: 'orange',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 1,
    marginVertical: 10,
    borderRadius: 6,
  },

  payText: {
    color: '#fff',
    fontWeight: Typography.fontWeight.semiBold,
    fontSize: Typography.fontSize.md,
  },

  bankCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    elevation: 3,
  },

  bankDetails: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#222',
  },

  donationInfo: {
    fontSize: 14,
    lineHeight: 22,
    color: '#222',
  },
  dateInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#CFCFCF',
    borderRadius: 10,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  dateText: {
    fontSize: 16,
    color: '#333',
    paddingLeft: 15,
  },
});
