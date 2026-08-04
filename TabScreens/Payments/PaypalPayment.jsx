// PayPalPayment.js
import React, {useState} from 'react';
import {
  View,
  Modal,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Button,
} from 'react-native';
import {WebView} from 'react-native-webview';
import axios from 'axios';

const API_BASE_URL = 'http://10.0.2.2:3000'; // your Express server

export default function PayPalPayment({onSuccess, onCancel}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [approveUrl, setApproveUrl] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  const startPayment = async () => {
    try {
      setLoading(true);
      const {data} = await axios.post(`${API_BASE_URL}/api/orders`);

      if (!data.approveLink) {
        throw new Error('No approval link returned from server');
      }

      setOrderId(data.id);
      setApproveUrl(data.approveLink);
      setModalVisible(true);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Could not start PayPal checkout');
    } finally {
      setLoading(false);
    }
  };

  const captureOrder = async id => {
    try {
      setLoading(true);
      const {data} = await axios.post(
        `${API_BASE_URL}/api/orders/${id}/capture`,
      );
      setModalVisible(false);
      onSuccess?.(data);
    } catch (err) {
      console.error(err);
      Alert.alert('Payment Error', 'Failed to capture payment');
      setModalVisible(false);
      onCancel?.();
    } finally {
      setLoading(false);
    }
  };

  const handleNavStateChange = navState => {
    const {url} = navState;

    // Success redirect
    if (url.includes('paypal-return')) {
      setModalVisible(false);
      captureOrder(orderId);
      return;
    }

    // Cancel redirect
    if (url.includes('paypal-cancel')) {
      setModalVisible(false);
      onCancel?.();
    }
  };

  return (
    <View>
      <Button
        title="Pay with PayPal"
        onPress={startPayment}
        disabled={loading}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.container}>
          {approveUrl && (
            <WebView
              source={{uri: approveUrl}}
              onNavigationStateChange={handleNavStateChange}
              startInLoadingState
              renderLoading={() => (
                <ActivityIndicator size="large" style={styles.loader} />
              )}
            />
          )}
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>

      {loading && <ActivityIndicator size="large" style={styles.loader} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, marginTop: 40},
  loader: {position: 'absolute', top: '50%', left: '50%'},
});
