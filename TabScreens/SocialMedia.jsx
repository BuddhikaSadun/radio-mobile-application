import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import Google from '../assets/logos/icons8-google-240.png';
import Instagram from '../assets/logos/icons8-instagram-240.png';
import TikTok from '../assets/logos/icons8-tiktok-240.png';
import Facebook from '../assets/logos/icons8-facebook-240.png';
import Youtube from '../assets/logos/icons8-youtube-240.png';

import Typography from '../constants/Typography';
export default function SocialMedia() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.socialIconWrapper}>
      <Text
        style={[styles.connectText, {color: isDarkMode ? 'white' : 'black'}]}>
        Get Connected
      </Text>
      <View style={styles.socialIcons}>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://www.youtube.com/@sethfm-f1n')
          }>
          <View style={styles.iconWrapper}>
            <Image source={Youtube} style={styles.iconImage} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://www.sethfm.lk')}>
          <View style={styles.iconWrapper}>
            <Image source={Google} style={styles.iconImage} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://www.facebook.com/sethfm103.1/')
          }>
          <View style={styles.iconWrapper}>
            <Image source={Facebook} style={styles.iconImage} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://www.instagram.com/sethfmlk/?hl=en')
          }>
          <View style={styles.iconWrapper}>
            <Image source={Instagram} style={styles.iconImage} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://www.tiktok.com/@sethfm103.1')
          }>
          <View style={styles.iconWrapper}>
            <Image source={TikTok} style={styles.iconImage} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  connectText: {
    paddingTop: 30,
    textAlign: 'center',
    fontSize: Typography.fontSize.lg,
    fontWeight: 'bold',
  },
  socialIcons: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  iconImage: {width: 40, height: 40, marginHorizontal: 8},
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    elevation: 1,
  },
  socialIconWrapper: {
    marginHorizontal: 30,
    marginBottom: 40,
  },
});
