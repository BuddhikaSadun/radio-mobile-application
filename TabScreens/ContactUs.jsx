import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Linking,
  ScrollView,
  useColorScheme,
  Image,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Typography from '../constants/Typography';

import {LightTheme, DarkTheme} from '../constants/theme';
import Footer from '../TabScreens/Footer';
import SocialMedia from './SocialMedia';

export default function ContactUs() {
  const isDarkMode = useColorScheme() === 'dark';

  const makeCall = async phone => {
    const url = `tel:${phone}`;
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      Linking.openURL(url);
    } else {
      console.warn('Phone call not supported');
    }
  };

  return (
    <ScrollView
      style={{
        backgroundColor: isDarkMode
          ? DarkTheme.background
          : LightTheme.background,
      }}>
      <Text
        style={[
          styles.headerText,
          {
            color: isDarkMode ? DarkTheme.primaryText : LightTheme.primaryText,
          },
        ]}>
        CONTACT US
      </Text>

      {/*Contact Information*/}
      <View
        style={[
          styles.sectionCard,
          {
            backgroundColor: isDarkMode
              ? DarkTheme.cardBackground
              : LightTheme.cardBackground,
          },
        ]}>
        <View style={styles.InfoTitleView}>
          {/*<MaterialCommunityIcons name="contacts" color={'black'} size={30} />*/}
          <Text
            style={[
              styles.contactTitleText,
              {
                color: isDarkMode
                  ? DarkTheme.primaryText
                  : LightTheme.primaryText,
              },
            ]}>
            Contact Information
          </Text>
        </View>

        <Pressable
          android_ripple={{color: '#ccc'}}
          onPress={async () => {
            const url = 'mailto:sethfm02@gmail.com';
            const supported = await Linking.canOpenURL(url);
            if (supported) {
              Linking.openURL(url);
            } else {
              console.warn("Can't open email client");
            }
          }}
          style={({pressed}) => [
            styles.infoSection,
            pressed && {opacity: 0.6}, // works on iOS & Android
          ]}>
          <View
            style={[
              styles.iconStyle,
              {
                backgroundColor: isDarkMode
                  ? DarkTheme.iconBG
                  : LightTheme.iconBG,
              },
            ]}>
            <FontAwesome5
              name="envelope"
              size={22}
              color={isDarkMode ? DarkTheme.iconMain : LightTheme.iconMain}
            />
          </View>

          <View style={styles.textContainer}>
            <Text
              style={[
                styles.primaryText,
                {
                  color: isDarkMode
                    ? DarkTheme.primaryText
                    : LightTheme.primaryText,
                },
              ]}>
              Email
            </Text>
            <Text
              selectable={true}
              style={[
                styles.secondaryText,
                {
                  color: isDarkMode
                    ? DarkTheme.primaryText
                    : LightTheme.primaryText,
                },
              ]}>
              sethfm02@gmail.com
            </Text>
          </View>
        </Pressable>
        <Pressable
          android_ripple={{color: '#ccc'}}
          onPress={() => makeCall('+94312228181')}
          style={styles.infoSection}>
          <View
            style={[
              styles.iconStyle,
              {
                backgroundColor: isDarkMode
                  ? DarkTheme.iconBG
                  : LightTheme.iconBG,
              },
            ]}>
            <Entypo
              name="landline"
              size={20}
              style={{transform: [{scaleX: -1}]}}
              color={isDarkMode ? DarkTheme.iconMain : LightTheme.iconMain}
            />
          </View>

          <View style={styles.textContainer}>
            <Text
              style={[
                styles.primaryText,
                {
                  color: isDarkMode
                    ? DarkTheme.primaryText
                    : LightTheme.primaryText,
                },
              ]}>
              Office
            </Text>
            <Text
              style={[
                styles.secondaryText,
                {
                  color: isDarkMode
                    ? DarkTheme.primaryText
                    : LightTheme.primaryText,
                },
              ]}>
              +94 31 222 8181
            </Text>
          </View>
        </Pressable>
        <Pressable
          android_ripple={{color: '#ccc'}}
          onPress={() =>
            Linking.openURL(
              'https://www.google.com/maps/search/?api=1&query=St+Mary’s+Church+Jubilee+Hall,+Grand+St,+Negombo+11500',
            )
          }
          style={styles.infoSection}>
          <View
            style={[
              styles.iconStyle,
              {
                backgroundColor: isDarkMode
                  ? DarkTheme.iconBG
                  : LightTheme.iconBG,
              },
            ]}>
            <FontAwesome5
              name="map-marker-alt"
              size={22}
              color={isDarkMode ? DarkTheme.iconMain : LightTheme.iconMain}
            />
          </View>

          <View style={styles.textContainer}>
            <Text
              style={[
                styles.primaryText,
                {
                  color: isDarkMode
                    ? DarkTheme.primaryText
                    : LightTheme.primaryText,
                },
              ]}>
              Location
            </Text>
            <Text
              style={[
                styles.secondaryText,
                {
                  color: isDarkMode
                    ? DarkTheme.primaryText
                    : LightTheme.primaryText,
                },
              ]}>
              St Mary’s Church Jubilee Hall{'\n'}
              Grand St, Negombo 11500
            </Text>
          </View>
        </Pressable>
      </View>

      {/* Song Requests Card */}
      <View
        style={[
          styles.sectionCard,
          {
            backgroundColor: isDarkMode
              ? DarkTheme.cardBackground
              : LightTheme.cardBackground,
          },
        ]}>
        <View style={styles.sectionHeader}>
          <Text
            style={[
              styles.contactSubtitleText,
              {
                color: isDarkMode
                  ? DarkTheme.primaryText
                  : LightTheme.primaryText,
              },
            ]}>
            Song Requests
          </Text>
        </View>
        {/* Landline */}
        <Pressable
          android_ripple={{color: '#ccc'}}
          onPress={() => Linking.openURL('tel:+94312228181')}
          style={styles.infoSection}>
          <View
            style={[
              styles.iconStyle,
              {
                backgroundColor: isDarkMode
                  ? DarkTheme.iconBG
                  : LightTheme.iconBG,
              },
            ]}>
            <Entypo
              name="landline"
              size={20}
              style={{transform: [{scaleX: -1}]}}
              color={isDarkMode ? DarkTheme.iconMain : LightTheme.iconMain}
            />
          </View>

          <View style={styles.textContainer}>
            <Text
              style={[
                styles.primaryText,
                {
                  color: isDarkMode
                    ? DarkTheme.primaryText
                    : LightTheme.primaryText,
                },
              ]}>
              Office
            </Text>
            <Text
              style={[
                styles.secondaryText,
                {
                  color: isDarkMode
                    ? DarkTheme.primaryText
                    : LightTheme.primaryText,
                },
              ]}>
              +94 31 222 8181
            </Text>
          </View>
        </Pressable>

        {/* Mobile */}
        <Pressable
          android_ripple={{color: '#ccc'}}
          onPress={() => Linking.openURL('tel:+94718758181')}
          style={styles.infoSection}>
          <View
            style={[
              styles.iconStyle,
              {
                backgroundColor: isDarkMode
                  ? DarkTheme.iconBG
                  : LightTheme.iconBG,
              },
            ]}>
            <FontAwesome5
              name="mobile-alt"
              size={20}
              color={isDarkMode ? DarkTheme.iconMain : LightTheme.iconMain}
            />
          </View>

          <View style={styles.textContainer}>
            <Text
              style={[
                styles.primaryText,
                {
                  color: isDarkMode
                    ? DarkTheme.primaryText
                    : LightTheme.primaryText,
                },
              ]}>
              Mobile
            </Text>
            <Text
              style={[
                styles.secondaryText,
                {
                  color: isDarkMode
                    ? DarkTheme.primaryText
                    : LightTheme.primaryText,
                },
              ]}>
              +94 71 875 8181
            </Text>
          </View>
        </Pressable>
      </View>

      {/* Marketing Card */}
      <View
        style={[
          styles.sectionCard,
          {
            backgroundColor: isDarkMode
              ? DarkTheme.cardBackground
              : LightTheme.cardBackground,
          },
        ]}>
        <View style={styles.sectionHeader}>
          <Text
            style={[
              styles.contactSubtitleText,
              {
                color: isDarkMode
                  ? DarkTheme.primaryText
                  : LightTheme.primaryText,
                marginBottom: 0,
              },
            ]}>
            Sales and Marketing
          </Text>
        </View>

        {/* Marketing Contact */}

        <Pressable
          android_ripple={{color: '#ccc'}}
          onPress={() => Linking.openURL('https://wa.me/94757104487')}
          style={styles.infoSection}>
          <View
            style={[
              styles.iconStyle,
              {
                backgroundColor: isDarkMode
                  ? DarkTheme.iconBG
                  : LightTheme.iconBG,
              },
            ]}>
            <FontAwesome5
              name="mobile-alt"
              size={20}
              color={isDarkMode ? DarkTheme.iconMain : LightTheme.iconMain}
            />
          </View>

          <View style={styles.textContainer}>
            <Text
              style={[
                styles.primaryText,
                {
                  color: isDarkMode
                    ? DarkTheme.primaryText
                    : LightTheme.primaryText,
                },
              ]}>
              Supun
            </Text>
            <Text
              style={[
                styles.secondaryText,
                {
                  color: isDarkMode
                    ? DarkTheme.primaryText
                    : LightTheme.primaryText,
                },
              ]}>
              +94 76 317 5778
            </Text>
          </View>
        </Pressable>

        {/* WhatsApp */}
        <Pressable
          android_ripple={{color: '#ccc'}}
          onPress={() => Linking.openURL('https://wa.me/94757104487')}
          style={styles.infoSection}>
          <View
            style={[
              styles.iconStyle,
              {
                backgroundColor: isDarkMode
                  ? DarkTheme.iconBG
                  : LightTheme.iconBG,
              },
            ]}>
            <FontAwesome5
              name="whatsapp"
              size={20}
              color={isDarkMode ? DarkTheme.iconMain : LightTheme.iconMain}
            />
          </View>

          <View style={styles.textContainer}>
            <Text
              style={[
                styles.primaryText,
                {
                  color: isDarkMode
                    ? DarkTheme.primaryText
                    : LightTheme.primaryText,
                },
              ]}>
              Supun
            </Text>
            <Text
              style={[
                styles.secondaryText,
                {
                  color: isDarkMode
                    ? DarkTheme.primaryText
                    : LightTheme.primaryText,
                },
              ]}>
              +94 75 710 4487
            </Text>
          </View>
        </Pressable>
        <Pressable
          android_ripple={{color: '#ccc'}}
          onPress={() => Linking.openURL('tel:+94758640555')}
          style={styles.infoSection}>
          <View
            style={[
              styles.iconStyle,
              {
                backgroundColor: isDarkMode
                  ? DarkTheme.iconBG
                  : LightTheme.iconBG,
              },
            ]}>
            <FontAwesome5
              name="phone"
              size={20}
              style={{transform: [{scaleX: -1}]}}
              color={isDarkMode ? DarkTheme.iconMain : LightTheme.iconMain}
            />
          </View>

          <View style={styles.textContainer}>
            <Text
              style={[
                styles.primaryText,
                {
                  color: isDarkMode
                    ? DarkTheme.primaryText
                    : LightTheme.primaryText,
                },
              ]}>
              Geethal
            </Text>
            <Text
              style={[
                styles.secondaryText,
                {
                  color: isDarkMode
                    ? DarkTheme.primaryText
                    : LightTheme.primaryText,
                },
              ]}>
              +94 75 864 0555
            </Text>
          </View>
        </Pressable>
      </View>
      <SocialMedia />
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerText: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semiBold,
  },

  contactTitleText: {
    textAlign: 'left',
    fontSize: Typography.fontSize.lg,
    fontWeight: 'bold',
    marginBottom: 35,
  },

  contactSubtitleText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: 'bold',
    paddingBottom: 10,
  },

  InfoTitleView: {
    flexDirection: 'column',
  },
  primaryText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },
  secondaryText: {
    fontSize: Typography.fontSize.sx,
    opacity: 0.8,
  },
  sectionCard: {
    padding: 10,
    margin: 15,
    borderRadius: 10,
    elevation: 2,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  phoneIcon: {
    marginRight: 12,
    transform: [{scaleX: -1}],
  },
  textContainer: {
    flexDirection: 'column',
  },

  infoSection: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: 'orange',
    alignItems: 'center',
    marginBottom: 16,
    padding: 14,
    borderRadius: 10,
  },

  iconStyle: {
    width: 35, // 👈 fixed width for alignment
    alignItems: 'center',
    marginRight: 15,
    borderRadius: 10,
    padding: 7,
  },
});
