import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Image,
  ScrollView,
} from 'react-native';
import Typography from '../constants/Typography';
import Footer from '../TabScreens/Footer';
import donateImg from '../assets/donate_1.png';

import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : 'ca-app-pub-3373184600332761/8310373850';

export default function DonationForm() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text
            style={[styles.headerText, {color: isDark ? 'white' : 'black'}]}>
            DONATIONS
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={[styles.title, {color: isDark ? 'black' : 'black'}]}>
            Donate For Us
          </Text>
          <Image
            source={donateImg}
            style={styles.donationImage}
            resizeMode="contain"
          />

          <Text
            style={[styles.donationInfo, {color: isDark ? 'black' : 'black'}]}>
            Seth Fm Account Name - The Friend Media Network (Pvt) Ltd
          </Text>
          <Text
            style={[styles.donationInfo, {color: isDark ? 'black' : 'black'}]}>
            Account Number - 034 100 112 463 690
          </Text>
          <Text
            style={[styles.donationInfo, {color: isDark ? 'black' : 'black'}]}>
            Bank - Peoples Bank Negombo
          </Text>
          <Text
            style={[styles.donationInfo, {color: isDark ? 'black' : 'black'}]}>
            Whatsapp - 075 710 4487
          </Text>
        </View>

        <Footer />
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 10,
    alignItems: 'center',
  },
  headerText: {
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center',
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semiBold,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontSize: Typography.fontSize.xl,
  },
  formContainer: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 30,
    margin: 10,
  },
  donationImage: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
  donationInfo: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.small,
    padding: 2,
  },
});
