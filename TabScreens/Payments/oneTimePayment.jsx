import {Alert} from 'react-native';
import PayHere from '@payhere/payhere-mobilesdk-reactnative';

const paymentObject = {
  sandbox: true, // true if using Sandbox Merchant ID
  merchant_id: '1211149', // Replace your Merchant ID
  notify_url: 'http://sample.com/notify',
  order_id: 'ItemNo12345',
  items: 'Hello from React Native!',
  amount: '50.00',
  currency: 'LKR',
  first_name: 'Saman',
  last_name: 'Perera',
  email: 'samanp@gmail.com',
  phone: '0771234567',
  address: 'No.1, Galle Road',
  city: 'Colombo',
  country: 'Sri Lanka',
  delivery_address: 'No. 46, Galle road, Kalutara South',
  delivery_city: 'Kalutara',
  delivery_country: 'Sri Lanka',
  custom_1: '',
  custom_2: '',
};

PayHere.startPayment(
  paymentObject,
  paymentId => {
    console.log('Payment Completed', paymentId);
  },
  errorData => {
    Alert.alert('PayHere Error', errorData);
  },
  () => {
    console.log('Payment Dismissed');
  },
);
