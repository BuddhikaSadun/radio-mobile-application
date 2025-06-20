import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
  useColorScheme,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import LinearGradient from 'react-native-linear-gradient';
import logo from '../assets/SethFMLogo.png';
import programSchedule from '../constants/programSchedule';
import Typography from '../constants/Typography';

import Google from '../assets/logos/icons8-google-240.png';
import Instagram from '../assets/logos/icons8-instagram-240.png';
import TikTok from '../assets/logos/icons8-tiktok-240.png';
import Facebook from '../assets/logos/icons8-facebook-240.png';
import Youtube from '../assets/logos/icons8-youtube-240.png';

import theme, {LightTheme, DarkTheme} from '../constants/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import TrackPlayer, {
  Capability,
  AppKilledPlaybackBehavior,
  usePlaybackState,
  State,
} from 'react-native-track-player';
import Footer from './Footer';

const STREAM_URL = 'https://listen.radioking.com/radio/384487/stream/435781';

const LiveRadio = () => {
  const [currentProgram, setCurrentProgram] = useState(null);
  const [upcomingPrograms, setUpcomingPrograms] = useState([]);

  const playbackState = usePlaybackState(); // Automatically updates on state changes
  const isPlaying =
    playbackState?.state === State.Playing ||
    playbackState?.state === State.Buffering;
  const [isLoading, setIsLoading] = useState(true);

  // Helper to convert "10:00 AM" → minutes since midnight
  const parseTime = timeStr => {
    const [time, modifier] = timeStr.trim().split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  // Fetch Programs based on the current day and time
  const fetchPrograms = () => {
    const now = new Date();
    const currentDay = now.getDay();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    let todaySchedule = [];

    if (currentDay === 0) {
      todaySchedule = programSchedule.Sunday;
    } else if (currentDay === 6) {
      todaySchedule = programSchedule.Saturday;
    } else {
      todaySchedule = programSchedule.WeekDay;
    }

    if (!Array.isArray(todaySchedule)) {
      console.error('todaySchedule is not an array:', todaySchedule);
      return;
    }

    let foundIndex = -1;
    const match = todaySchedule.find((program, index) => {
      const [start, end] = program.time.split(' - ').map(parseTime);
      const isCurrent = currentTime >= start && currentTime <= end;
      if (isCurrent) foundIndex = index;
      return isCurrent;
    });

    setCurrentProgram(match || null);
    if (foundIndex >= 0) {
      setUpcomingPrograms(todaySchedule.slice(foundIndex + 1));
    } else {
      setUpcomingPrograms([]);
    }
  };

  useEffect(() => {
    const setupPlayer = async () => {
      try {
        setIsLoading(true);

        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
          stopWithApp: true,
          capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
          compactCapabilities: [Capability.Play, Capability.Pause],
          android: {
            appKilledPlaybackBehavior:
              AppKilledPlaybackBehavior.ContinuePlayback,
          },
        });

        await TrackPlayer.reset();

        await TrackPlayer.add({
          id: 'live-radio',
          url: STREAM_URL,
          title: 'Live Radio',
          artist: 'Seth FM',
          artwork: logo,
        });
        await TrackPlayer.setPlayWhenReady(true);
      } catch (err) {
        console.error('Player setup error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    setupPlayer();

    const handleStateChange = async state => {
      if (state === State.Ended) {
        console.log('Stream ended. Restarting...');
        try {
          await TrackPlayer.reset();
          await TrackPlayer.add({
            id: 'live-radio',
            url: STREAM_URL,
            title: 'Live Radio',
            artist: 'Seth FM',
            artwork: logo,
          });
          await TrackPlayer.play();
        } catch (err) {
          console.error('Error restarting stream:', err);
        }
      }
    };

    const listener = TrackPlayer.addEventListener('playback-state', event => {
      handleStateChange(event.state);
    });

    return () => {
      listener.remove(); // Clean up listener
    };
  }, []);

  // Toggle play/pause
  const togglePlayback = async () => {
    try {
      const state = await TrackPlayer.getState();

      if (
        state === State.Playing ||
        state === State.Buffering ||
        state === State.Paused
      ) {
        await TrackPlayer.stop();
        await TrackPlayer.reset();
      } else if (
        state === State.Stopped ||
        state === State.Ready ||
        state === State.None
      ) {
        setIsLoading(true);

        await TrackPlayer.add({
          id: 'live-radio',
          url: STREAM_URL,
          title: 'Live Radio',
          artist: 'Seth FM',
          artwork: logo,
        });
        await TrackPlayer.setPlayWhenReady(true); // safer for live stream

        setIsLoading(false); // ✅ move this outside conditional
      }
    } catch (err) {
      console.error('Toggle error:', err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('Raw playbackState:', playbackState);
    console.log('isPlaying:', isPlaying);
  }, [playbackState]);

  useEffect(() => {
    fetchPrograms();
    const interval = setInterval(fetchPrograms, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const isDarkMode = useColorScheme() === 'dark';
  return (
    <ScrollView>
      <Text
        style={[
          styles.headerText,
          {color: isDarkMode ? DarkTheme.primaryText : LightTheme.primaryText},
        ]}>
        LIVE RADIO
      </Text>

      <LinearGradient
        colors={['#F8A72C', '#FED392', '#F8A72C']}
        locations={[0, 0.6, 1]}
        useAngle={true}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.playerContainer}>
        <View
          style={[
            styles.liveTag,
            {backgroundColor: isPlaying ? 'red' : 'gray'},
          ]}>
          <Text style={styles.liveTagText}>LIVE</Text>
        </View>
        <Image source={logo} style={styles.img} resizeMode="contain" />

        <TouchableOpacity onPress={togglePlayback} style={styles.button}>
          {isLoading ? (
            <ActivityIndicator size={60} color="black" />
          ) : (
            <MaterialIcons
              name={isPlaying ? 'pause-circle-outline' : 'play-circle-fill'}
              size={60}
              color={isDarkMode ? 'white' : 'black'}
            />
          )}
        </TouchableOpacity>
      </LinearGradient>

      {currentProgram ? (
        <>
          <Text
            style={[
              styles.title,
              {
                color: isDarkMode
                  ? DarkTheme.primaryText
                  : LightTheme.primaryText,
              },
            ]}>
            {currentProgram.title}
          </Text>
          <Text style={styles.category}>{currentProgram.category}</Text>
        </>
      ) : (
        <Text style={{color: 'gray', fontStyle: 'italic'}}>
          No current program
        </Text>
      )}

      <View>
        <Text
          style={[
            styles.upcomingText,
            {
              color: isDarkMode
                ? DarkTheme.primaryText
                : LightTheme.primaryText,
            },
          ]}>
          UPCOMING PROGRAMS
        </Text>
        <FlatList
          data={upcomingPrograms}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={[
                styles.programItem,
                isDarkMode
                  ? DarkTheme.lightContainer
                  : LightTheme.lightContainer,
              ]}>
              <Text
                style={[
                  styles.title,
                  {
                    color: isDarkMode
                      ? DarkTheme.primaryText
                      : LightTheme.primaryText,
                  },
                ]}>
                {item.title}
              </Text>
              <Text
                style={[
                  styles.time,
                  {
                    color: isDarkMode
                      ? DarkTheme.secondaryText
                      : LightTheme.secondaryText,
                  },
                ]}>
                {item.time}
              </Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={{color: 'gray'}}>No more programs today.</Text>
          }
          scrollEnabled={false}
        />
      </View>

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
      <Footer />
    </ScrollView>
  );
};

export default LiveRadio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: LightTheme.primaryText,
    marginTop: 20,
    textAlign: 'center',
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semiBold,
  },

  playerContainer: {
    margin: 20,
    borderRadius: 15,
    elevation: 8,
  },
  liveTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  liveTagText: {
    fontSize: Typography.fontSize.md,
    color: 'white',
    fontWeight: Typography.fontWeight.semiBold,
  },
  img: {
    width: 300,
    height: 350,
    alignSelf: 'center',
  },

  button: {
    alignSelf: 'center',
    paddingBottom: 20,
  },
  companyTag: {
    marginTop: 40,
    alignItems: 'center',
    borderColor: 'black',
    width: '100%',
  },
  upcomingText: {
    textAlign: 'center',
    margin: 10,
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semiBold,
    paddingTop: 50,
  },
  title: {
    textAlign: 'center',
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.medium,
  },
  category: {
    textAlign: 'center',
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.small,
    color: 'grey',
  },
  time: {
    textAlign: 'center',
    fontSize: Typography.fontSize.sm,
    color: 'grey',
  },
  programItem: {
    paddingVertical: 10,
    borderBottomWidth: 4,
    borderBottomColor: LightTheme.highlight,
    marginVertical: 12,
    width: '85%',
    alignSelf: 'center',
    borderRadius: 10,
  },
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
