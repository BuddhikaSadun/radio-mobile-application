import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  Button,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {WebView} from 'react-native-webview';

const API_BASE_URL = '10.0.2.2:3000';

const Membership = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [approveUrl, setApproveUrl] = useState(null);

  const plans = [
    {
      id: 'basic',
      title: 'Basic Membership',
      amount: '$6 / month',
      benefits: '2 Catholic program dedications each month',
    },
  ];

  const startSubscription = async plan => {
    try {
      const response = await axios.post(
        `http://${API_BASE_URL}/api/paypal/create-subscription`,
        {
          plan: plan.id,
        },
      );

      const url = response.data.approvalUrl;

      console.log('PayPal URL:', url);

      setApproveUrl(url);
      setModalVisible(true);
    } catch (error) {
      console.log(error.response?.data || error.message);

      Alert.alert('Error', 'Unable to start subscription');
    }
  };

  const handleNavStateChange = navState => {
    const {url} = navState;

    console.log('WebView URL:', url);

    // PayPal approved
    if (url.includes('paypal-success')) {
      setModalVisible(false);

      Alert.alert('Success', 'Subscription approved');

      // Here call your backend to verify subscription
    }

    // PayPal cancelled
    if (url.includes('paypal-cancel')) {
      setModalVisible(false);

      Alert.alert('Cancelled', 'Subscription cancelled');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Seth FM Catholic Contribution Membership
      </Text>

      {plans.map(plan => (
        <View key={plan.id} style={styles.card}>
          <Text style={styles.title}>{plan.title}</Text>

          <Text style={styles.amount}>{plan.amount}</Text>

          <Text style={styles.benefit}>{plan.benefits}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => startSubscription(plan)}>
            <Text style={styles.buttonText}>Continue with PayPal</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Modal visible={modalVisible} animationType="slide">
        <View style={{flex: 1}}>
          {approveUrl && (
            <WebView
              source={{
                uri: approveUrl,
              }}
              onNavigationStateChange={handleNavStateChange}
              startInLoadingState
              renderLoading={() => (
                <ActivityIndicator
                  size="large"
                  style={{
                    flex: 1,
                  }}
                />
              )}
            />
          )}

          <Button
            title="Close"
            onPress={() => {
              setModalVisible(false);
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default Membership;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  card: {
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  amount: {
    fontSize: 22,
    marginVertical: 10,
  },

  benefit: {
    marginBottom: 15,
  },

  button: {
    backgroundColor: '#003087',
    padding: 12,
    borderRadius: 8,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
