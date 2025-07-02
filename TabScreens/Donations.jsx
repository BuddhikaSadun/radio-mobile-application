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
import SocialMedia from './SocialMedia';

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
            Donate
          </Text>
          <Image
            source={donateImg}
            style={styles.donationImage}
            resizeMode="contain"
          />
          <Text
            style={[styles.bankDetails, {color: isDark ? 'black' : 'black'}]}>
            Bank Details
          </Text>
          <Text
            style={[styles.donationInfo, {color: isDark ? 'black' : 'black'}]}>
            Name - The Friend Media Network (Pvt) Ltd
          </Text>
          <Text
            style={[styles.donationInfo, {color: isDark ? 'black' : 'black'}]}>
            Number - 034 100 112 463 690
          </Text>
          <Text
            style={[styles.donationInfo, {color: isDark ? 'black' : 'black'}]}>
            Bank - Peoples Bank
          </Text>
          <Text
            style={[styles.donationInfo, {color: isDark ? 'black' : 'black'}]}>
            Branch - Negombo
          </Text>
          {/*<Text
            style={[styles.donationInfo, {color: isDark ? 'black' : 'black'}]}>
            Whatsapp - 075 710 4487
          </Text>*/}
        </View>
        <SocialMedia />
        <Footer />
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
    marginBottom: 10,
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
  bankDetails: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.medium,
    marginBottom: 10,
    paddingBottom: 20,
    textAlign: 'center',
  },
  donationInfo: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.small,
    padding: 2,
  },
});
