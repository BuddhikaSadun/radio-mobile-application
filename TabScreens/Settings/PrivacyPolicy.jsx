import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {privacyPolicy} from '../../constants/termsPoilcies';
const PrivacyPolicy = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeStyles = isDarkMode ? darkStyles : lightStyles;
  return (
    <ScrollView
      style={[styles.container, themeStyles.background]}
      contentContainerStyle={styles.content}>
      <Text style={[styles.intro, themeStyles.body]}>
        {privacyPolicy.intro}
      </Text>

      {privacyPolicy.sections.map((section, index) => (
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

          {section.title === 'Contact Us' && (
            <View style={styles.contactBlock}>
              <Text
                style={[
                  styles.contactLine,
                  styles.contactBold,
                  themeStyles.heading,
                ]}>
                {privacyPolicy.contact.company}
              </Text>

              <Text style={[styles.contactLine, themeStyles.body]}>
                {privacyPolicy.contact.address}
              </Text>

              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(`mailto:${privacyPolicy.contact.email}`)
                }>
                <Text>
                  Email:{' '}
                  <Text
                    style={[
                      styles.contactLine,
                      styles.contactLink,
                      themeStyles.link,
                    ]}>
                    {privacyPolicy.contact.email}
                  </Text>
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => Linking.openURL(privacyPolicy.contact.website)}>
                <Text>
                  Website:{' '}
                  <Text
                    style={[
                      styles.contactLine,
                      styles.contactLink,
                      themeStyles.link,
                    ]}>
                    {privacyPolicy.contact.website.replace('https://', '')}
                  </Text>
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(`tel:${privacyPolicy.contact.phone}`)
                }>
                <Text>
                  Telephone:{' '}
                  <Text
                    style={[
                      styles.contactLine,
                      styles.contactLink,
                      themeStyles.link,
                    ]}>
                    {privacyPolicy.contact.phone}
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          )}
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
    marginBottom: 6,
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
  contactBlock: {
    marginTop: 10,
  },
  contactLine: {
    fontSize: 14,
    lineHeight: 22,
  },
  contactBold: {
    fontWeight: '700',
    marginBottom: 2,
  },
  contactLink: {
    textDecorationLine: 'underline',
    marginTop: 2,
  },
});

const lightStyles = StyleSheet.create({
  background: {backgroundColor: '#ffffff'},
  heading: {color: '#1a1a1a'},
  body: {color: '#3a3a3a'},
  bullet: {color: 'orange'},
  link: {color: 'orange'},
});

const darkStyles = StyleSheet.create({
  background: {backgroundColor: '#111111'},
  heading: {color: '#ffffff'},
  body: {color: '#cccccc'},
  bullet: {color: 'orange'},
  link: {color: 'orange'},
});

export default PrivacyPolicy;
