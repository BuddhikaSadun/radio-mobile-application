import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  useColorScheme,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import programSchedule from '../constants/programSchedule';
import Typography from '../constants/Typography';

import SocialMedia from './SocialMedia';
import theme, {LightTheme, DarkTheme} from '../constants/theme';

import Footer from './Footer';
import Player from './Player';

const LiveRadio = () => {
  const [currentProgram, setCurrentProgram] = useState(null);
  const [upcomingPrograms, setUpcomingPrograms] = useState([]);

  const parseTime = timeStr => {
    const [time, modifier] = timeStr.trim().split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

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

      let isCurrent = false;

      if (start <= end) {
        // Normal time range (e.g., 08:00 AM - 10:00 AM)
        isCurrent = currentTime >= start && currentTime < end;
      } else {
        // Overnight range (e.g., 11:00 PM - 12:00 AM)
        isCurrent = currentTime >= start || currentTime < end;
      }

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

      <Player />
      {currentProgram ? (
        <>
          <Text
            style={[
              styles.currentProgramTitle,
              {
                color: isDarkMode
                  ? DarkTheme.primaryText
                  : LightTheme.primaryText,
              },
            ]}>
            {currentProgram.title}
          </Text>
          {/*<Text style={styles.category}>{currentProgram.category}</Text>*/}
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
      <SocialMedia />
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
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semiBold,
    paddingTop: 50,
  },
  currentProgramTitle: {
    textAlign: 'center',
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.medium,
  },
  title: {
    textAlign: 'center',
    fontSize: Typography.fontSize.md,
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
