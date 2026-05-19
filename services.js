import TrackPlayer, {Event} from 'react-native-track-player';

export const PlaybackService = async function () {
  // ▶️ PLAY → always restart from beginning
  TrackPlayer.addEventListener(Event.RemotePlay, async () => {
    await TrackPlayer.seekTo(0); // go to start
    await TrackPlayer.play();
  });

  // ⏸ PAUSE → stop instead of pause
  TrackPlayer.addEventListener(Event.RemotePause, async () => {
    await TrackPlayer.stop();
  });

  // ⏹ STOP → normal stop
  TrackPlayer.addEventListener(Event.RemoteStop, async () => {
    await TrackPlayer.stop();
  });
};
