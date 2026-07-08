// screens/TermsAndConditions.jsx

import React from 'react';
import {ScrollView, View, Text, StyleSheet, useColorScheme} from 'react-native';

import {termsAndConditions} from '../../constants/termsPoilcies';

const TermsAndConditions = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeStyles = isDarkMode ? darkStyles : lightStyles;

  return (
    <ScrollView
      style={[styles.container, themeStyles.background]}
      contentContainerStyle={styles.content}>
      <Text style={[styles.intro, themeStyles.body]}>
        {termsAndConditions.intro}
      </Text>

      {termsAndConditions.sections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={[styles.heading, themeStyles.heading]}>
            {section.title}
          </Text>

          {section.description && (
            <Text style={[styles.paragraph, themeStyles.body]}>
              {section.description}
            </Text>
          )}

          {section.bullets?.map((bullet, i) => (
            <View key={i} style={styles.bulletRow}>
              <Text style={[styles.bulletDot, themeStyles.bullet]}>
                {'\u2022'}
              </Text>

              <Text style={[styles.bulletText, themeStyles.body]}>
                {bullet}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  intro: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },
  section: {
    marginBottom: 22,
  },
  heading: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 8,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingRight: 4,
  },
  bulletDot: {
    fontSize: 22,
    lineHeight: 22,
    marginRight: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
  },
});

const lightStyles = StyleSheet.create({
  background: {
    backgroundColor: '#fff',
  },
  heading: {
    color: '#1a1a1a',
  },
  body: {
    color: '#3a3a3a',
  },
  bullet: {
    color: 'orange',
  },
});

const darkStyles = StyleSheet.create({
  background: {
    backgroundColor: '#111',
  },
  heading: {
    color: '#fff',
  },
  body: {
    color: '#ccc',
  },
  bullet: {
    color: 'orange',
  },
});

export default TermsAndConditions;
