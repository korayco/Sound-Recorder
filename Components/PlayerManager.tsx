import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TrackPlayer, {usePlaybackState} from 'react-native-track-player';

import Player from './Player';

export default function PlayerManager() {
  const playbackState = usePlaybackState();

  useEffect(() => {
    setup();
  }, []);

  async function setup() {
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP,
      ],
      notificationCapabilities: [],
    });
  }

  async function togglePlayback() {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    let rec = {
      id: 'local-track',
      url: 'file:///sdcard/recording.mp4',
      title: 'Recording',
      artist: 'Koray Cosar',
    };
    if (currentTrack == null) {
      await TrackPlayer.reset();
      await TrackPlayer.add(rec);
      await TrackPlayer.play();
    } else {
      if (playbackState === TrackPlayer.STATE_PAUSED) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }

      if (playbackState === TrackPlayer.STATE_STOPPED) {
        await TrackPlayer.reset();
        await TrackPlayer.add(rec);
        await TrackPlayer.play();
      }
    }
  }

  return (
    <View style={{width: '80%'}}>
      <Player style={styles.player} onTogglePlayback={togglePlayback} />
    </View>
  );
}

PlayerManager.navigationOptions = {
  title: 'Playlist',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  description: {
    width: '80%',
    marginTop: 20,
    textAlign: 'center',
  },
  player: {},
  state: {
    marginTop: 20,
  },
});
