import React from 'react';
import {Modal, View, Text, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const MembershipModal = ({visible, onClose, ...modalProps}) => {
  const navigation = useNavigation();

  return (
    <Modal
      visible={visible}
      transparent
      onRequestClose={onClose}
      {...modalProps}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Seth FM Catholic Contribution Membership Program
          </Text>

          <Text style={styles.description}>
            You are warmly invited to join the Seth FM Catholic Contribution
            Community and support the continuation of our Catholic radio
            programs.
          </Text>

          <Pressable
            style={styles.button}
            onPress={() => {
              onClose();
              navigation.navigate('Memberships');
            }}>
            <Text style={styles.buttonText}>Join with us</Text>
          </Pressable>

          <Pressable onPress={onClose}>
            <Text style={styles.close}>Maybe Later</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#f7941d',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  close: {
    textAlign: 'center',
    color: 'gray',
  },
});

export default MembershipModal;
