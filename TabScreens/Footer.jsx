import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import logo from '../assets/SethFMLogo.png';
import Typography from '../constants/Typography';

export default function Footer() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={logo} style={styles.img} />
        <Text style={styles.tagText}>
          {'Seth FM - 103.1 Mhz\nThe Friend Media Network Pvt Ltd'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: 'auto',
    padding: 5,
    backgroundColor: '#ffffff',
    borderTopColor: '#e0e0e0',
  },

  // 🔥 ADD THIS
  content: {
    flexDirection: 'row', // row layout here
    alignItems: 'center', // vertical alignment
    justifyContent: 'center', // center horizontally
  },

  img: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },

  tagText: {
    marginLeft: 10,
    color: '#333333',
    fontSize: Typography.fontSize.sm,
    lineHeight: 20,
    fontWeight: '500',
    textAlign: 'left', // 🔥 IMPORTANT: align text next to logo
  },
});
