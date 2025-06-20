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
          {
            'Your Family Radio Channel \nSeth FM - 103.1 Mhz\nThe Friend Media Network Pvt Ltd \n'
          }
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  content: {
    flexDirection: 'row',
    alignContent: 'center',
    paddingLeft: 10,
  },
  img: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  tagText: {
    paddingLeft: 10,
    color: '#333333',
    fontSize: Typography.fontSize.md,
    lineHeight: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
});
