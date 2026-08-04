import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useRoute} from '@react-navigation/native';

const PaymentSummary = () => {
  const route = useRoute();
  const {form, selectedProgram} = route.params;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 30}}
      showsVerticalScrollIndicator={false}>
      {/* Payment Summary */}

      <View style={styles.summaryCard}>
        <Text style={styles.sectionTitle}>Payment Summary</Text>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Name</Text>
          <Text style={styles.summaryValue}>{form.name}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Contact Number</Text>
          <Text style={styles.summaryValue}>{form.contactNo}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Program</Text>
          <Text style={styles.summaryValue}>{selectedProgram.label}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Payment Type</Text>
          <Text style={styles.summaryValue}>One-Time</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Amount</Text>
          <Text style={styles.amount}>USD {selectedProgram.amount}</Text>
        </View>
      </View>

      {/* Button */}

      <TouchableOpacity style={styles.payButton}>
        <MaterialCommunityIcons
          name="credit-card-outline"
          color="#fff"
          size={22}
        />
        <Text style={styles.payText}> Continue to Payment</Text>
      </TouchableOpacity>

      {/* Bank Details */}
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
    </ScrollView>
  );
};

export default PaymentSummary;

const PRIMARY = '#1565C0';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    padding: 18,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 18,
    color: '#222',
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
    color: PRIMARY,
    fontSize: 20,
    fontWeight: '700',
  },

  payButton: {
    backgroundColor: PRIMARY,
    borderRadius: 14,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 4,
  },

  payText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 17,
  },

  bankCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    elevation: 3,
    marginTop: 20,
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
});
