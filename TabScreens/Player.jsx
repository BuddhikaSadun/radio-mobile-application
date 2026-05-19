import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import TrackPlayer, {
  Capability,
  AppKilledPlaybackBehavior,
  usePlaybackState,
  State,
} from 'react-native-track-player';
import logo from '../assets/SethFMLogo.png';

const STREAM_URL = 'https://listen.radioking.com/radio/384487/stream/435781';

const Player = () => {
  const [isLoading, setIsLoading] = useState(true);
  const playbackState = usePlaybackState(); // Automatically updates on state changes
  const isPlaying =
    playbackState?.state === State.Playing ||
    playbackState?.state === State.Buffering;

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

  return (
    <LinearGradient
      colors={['#F8A72C', '#FED392', '#F8A72C']}
      locations={[0, 0.6, 1]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.playerContainer}>
      <View
        style={[styles.liveTag, {backgroundColor: isPlaying ? 'red' : 'gray'}]}>
        <Text style={styles.liveTagText}>LIVE</Text>
      </View>

      <Image source={logo} style={styles.img} resizeMode="contain" />

      <TouchableOpacity
        onPress={togglePlayback}
        style={styles.button}
        activeOpacity={0.8}>
        {isLoading ? (
          <ActivityIndicator size={60} color="black" />
        ) : (
          <MaterialIcons
            name={isPlaying ? 'pause-circle-outline' : 'play-circle-outline'}
            size={60}
            color="black"
          />
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Player;

const styles = StyleSheet.create({
  playerContainer: {
    margin: 20,
    borderRadius: 15,
    elevation: 4,
  },
  liveTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 10,
  },
  liveTagText: {
    color: 'white',
    fontWeight: 'bold',
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
});
