import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {Component} from 'react';
import {ratio, screenWidth} from '../utils/Styles';

import Button from '../Components/Button';
import PlayerManager from '../Components/PlayerManager';
const styles: any = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
    height: '100%',
  },
  timeText: {
    fontSize: 70,
    textAlign: 'center',
    marginTop: '30%',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#DDDDDD',
    paddingTop: 10,
  },
  headerText: {
    fontWeight: 'bold',
    color: '#878787',
  },
  headerText1: {
    fontWeight: 'bold',
    color: 'black',
  },
  headerBtn: {
    paddingLeft: '16%',
    paddingRight: '16%',
    paddingBottom: '5%',
    paddingTop: '5%',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    // elevation: 10
  },
  headerBtn1: {
    paddingLeft: '16%',
    paddingRight: '16%',
    paddingBottom: '5%',
    paddingTop: '5%',
    // borderBottomColor: 'black',
    // borderBottomWidth: 2
    // elevation: 10
  },
  titleTxt: {
    marginTop: 100 * ratio,
    color: 'white',
    fontSize: 28 * ratio,
  },
  viewRecorder: {
    marginTop: 40 * ratio,
    width: '100%',
    alignItems: 'center',
  },
  recordBtnWrapper: {
    flexDirection: 'row',
  },
  viewPlayer: {
    marginTop: 60 * ratio,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  viewBarWrapper: {
    marginTop: 28 * ratio,
    marginHorizontal: 28 * ratio,
    alignSelf: 'stretch',
    paddingVertical: 10,
  },
  viewBar: {
    backgroundColor: '#ccc',
    height: 4 * ratio,
    alignSelf: 'stretch',
  },
  viewBarPlay: {
    backgroundColor: 'white',
    height: 4 * ratio,
    width: 0,
  },
  playStatusTxt: {
    marginTop: 8 * ratio,
    color: '#ccc',
  },
  playBtnWrapper: {
    flexDirection: 'row',
    marginTop: 40 * ratio,
  },
  btn: {
    borderColor: 'white',
    borderWidth: 1 * ratio,
  },
  txt: {
    color: 'white',
    fontSize: 14 * ratio,
    marginHorizontal: 8 * ratio,
    marginVertical: 4 * ratio,
  },
  txtRecordCounter: {
    marginTop: 32 * ratio,
    color: 'white',
    fontSize: 20 * ratio,
    textAlignVertical: 'center',
    fontWeight: '200',
    fontFamily: 'Helvetica Neue',
    letterSpacing: 3,
  },
  txtCounter: {
    marginTop: 12 * ratio,
    color: 'white',
    fontSize: 20 * ratio,
    textAlignVertical: 'center',
    fontWeight: '200',
    fontFamily: 'Helvetica Neue',
    letterSpacing: 3,
  },
});

interface State {
  isLoggingIn: boolean;
  recordSecs: number;
  recordTime: string;
  currentPositionSec: number;
  currentDurationSec: number;
  playTime: string;
  duration: string;
  recordBtn: boolean;
  stopBtn: boolean;
  playBtn: boolean;
  tabs: number;
}

const audioList = [
  {
    text: '2020_03_25_14_00_02.mp3',
    time: '24 March 2020, 7:00',
    size: '2.2 MB',
  },
  {
    text: '2020_03_25_14_00_02.mp3',
    time: '24 March 2020, 7:00',
    size: '2.3 MB',
  },
  {
    text: '2020_03_25_14_00_02.mp3',
    time: '24 March 2020, 7:00',
    size: '2.22 MB',
  },
  {
    text: '2020_03_25_14_00_02.mp3',
    time: '24 March 2020, 7:00',
    size: '2.4 MB',
  },
  {
    text: '2020_03_25_14_00_02.mp3',
    time: '24 March 2020, 7:00',
    size: '2.9 MB',
  },
  {
    text: '2020_03_25_14_00_02.mp3',
    time: '24 March 2020, 7:00',
    size: '2.9 MB',
  },
];

class Page extends Component<any, State> {
  private audioRecorderPlayer: AudioRecorderPlayer;

  constructor(props: any) {
    super(props);
    this.state = {
      recordBtn: false,
      stopBtn: false,
      playBtn: false,
      tabs: 0,
      isLoggingIn: false,
      recordSecs: 0,
      recordTime: '00:00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
    };

    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1
  }

  public render() {
    let playWidth =
      (this.state.currentPositionSec / this.state.currentDurationSec) *
      (screenWidth - 56 * ratio);
    if (!playWidth) playWidth = 0;

    return (
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: '#DDDDDD',
            elevation: 5,
            padding: '5%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            style={{width: 50, height: 50}}
            source={require('../assets/mike.png')}
          />
          <Text style={{fontSize: 22, marginLeft: 10}}>Sound Recorder</Text>
        </View>
        <View style={styles.topHeader}>
          <TouchableOpacity
            onPress={() => this.setState({tabs: 0})}
            style={
              this.state.tabs === 1 ? styles.headerBtn1 : styles.headerBtn
            }>
            <Text
              style={
                this.state.tabs === 1 ? styles.headerText : styles.headerText1
              }>
              RECORD
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({tabs: 1})}
            style={
              this.state.tabs === 1 ? styles.headerBtn : styles.headerBtn1
            }>
            <Text
              style={
                this.state.tabs === 1 ? styles.headerText1 : styles.headerText
              }>
              RECORDINGS
            </Text>
          </TouchableOpacity>
        </View>
        {this.state.tabs === 0 ? (
          <>
            <Text style={styles.timeText}>00:00:00</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: '10%',
              }}>
              {this.state.stopBtn ? (
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      stopBtn: !this.state.stopBtn,
                      recordBtn: false,
                      playBtn: false,
                    })
                  }>
                  <Image
                    style={{width: 100, height: 100}}
                    source={require('../assets/image3_select.png')}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      stopBtn: !this.state.stopBtn,
                      recordBtn: false,
                      playBtn: false,
                    })
                  }>
                  <Image
                    style={{width: 100, height: 100}}
                    source={require('../assets/image3.png')}
                  />
                </TouchableOpacity>
              )}
              {this.state.recordBtn ? (
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      recordBtn: !this.state.recordBtn,
                      stopBtn: false,
                      playBtn: false,
                    })
                  }>
                  <Image
                    style={{width: 100, height: 100}}
                    source={require('../assets/image1.png')}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      recordBtn: !this.state.recordBtn,
                      stopBtn: false,
                      playBtn: false,
                    })
                  }>
                  <Image
                    style={{width: 100, height: 100}}
                    source={require('../assets/image1_select.png')}
                  />
                </TouchableOpacity>
              )}
              {this.state.playBtn ? (
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      playBtn: !this.state.playBtn,
                      recordBtn: false,
                      stopBtn: false,
                    })
                  }>
                  <Image
                    style={{width: 100, height: 100}}
                    source={require('../assets/image2_select.png')}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      playBtn: !this.state.playBtn,
                      recordBtn: false,
                      stopBtn: false,
                    })
                  }>
                  <Image
                    style={{width: 100, height: 100}}
                    source={require('../assets/image2.png')}
                  />
                </TouchableOpacity>
              )}
            </View>
          </>
        ) : (
          <>
            <View style={{backgroundColor: '#424242', flex: 1}}>
              {audioList.map(res => {
                return (
                  <TouchableOpacity
                    onPress={() => this.setState({tabs: 0, playBtn: true})}
                    style={{
                      paddingLeft: '5%',
                      paddingRight: '5%',
                      paddingTop: '5%',
                    }}>
                    <Text style={{fontSize: 18, color: 'white'}}>
                      {res.text}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{fontSize: 12, color: 'white'}}>
                        {res.time}
                      </Text>
                      <Text style={{fontSize: 12, color: 'white'}}>
                        {res.size}
                      </Text>
                    </View>
                    <View
                      style={{
                        borderBottomColor: 'white',
                        borderBottomWidth: 1,
                        marginTop: '4%',
                      }}></View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}

        {/* <PlayerManager /> */}
        {/* <Text style={styles.titleTxt}>{'Sound Recorder'}</Text>
        <Text style={styles.txtRecordCounter}>{this.state.recordTime}</Text>
        <View style={styles.viewRecorder}>
          <View style={styles.recordBtnWrapper}>
            <Button
              style={styles.btn}
              onPress={this.onStartRecord}
              textStyle={styles.txt}>
              {' Record'}
            </Button>
            <Button
              style={[
                styles.btn,
                {
                  marginLeft: 12 * ratio,
                },
              ]}
              onPress={this.onStopRecord}
              textStyle={styles.txt}>
              {'Stop'}
            </Button>
          </View>
        </View>
        <View style={styles.viewPlayer}>
          <TouchableOpacity
            style={styles.viewBarWrapper}
            onPress={this.onStatusPress}>
            <View style={styles.viewBar}>
              <View style={[styles.viewBarPlay, {width: playWidth}]} />
            </View>
          </TouchableOpacity>
          <Text style={styles.txtCounter}>
            {this.state.playTime} / {this.state.duration}
          </Text>
          <View style={styles.playBtnWrapper}>
            <Button
              style={styles.btn}
              onPress={this.onStartPlay}
              textStyle={styles.txt}>
              {'Play'}
            </Button>
            <Button
              style={[
                styles.btn,
                {
                  marginLeft: 12 * ratio,
                },
              ]}
              onPress={this.onPausePlay}
              textStyle={styles.txt}>
              {'Pause'}
            </Button>
            <Button
              style={[
                styles.btn,
                {
                  marginLeft: 12 * ratio,
                },
              ]}
              onPress={this.onStopPlay}
              textStyle={styles.txt}>
              {'Stop'}
            </Button>
          </View>
        </View> */}
      </View>
    );
  }

  private onStatusPress = (e: any) => {
    const touchX = e.nativeEvent.locationX;
    console.log(`touchX: ${touchX}`);
    const playWidth =
      (this.state.currentPositionSec / this.state.currentDurationSec) *
      (screenWidth - 56 * ratio);
    console.log(`currentPlayWidth: ${playWidth}`);

    const currentPosition = Math.round(this.state.currentPositionSec);
    console.log(`currentPosition: ${currentPosition}`);

    if (playWidth && playWidth < touchX) {
      const addSecs = Math.round(currentPosition + 1000);
      this.audioRecorderPlayer
        .seekToPlayer(addSecs)
        .catch(err => console.log(err.message));
      console.log(`addSecs: ${addSecs}`);
    } else {
      const subSecs = Math.round(currentPosition - 1000);
      this.audioRecorderPlayer
        .seekToPlayer(subSecs)
        .catch(err => console.log(err.message));
      console.log(`subSecs: ${subSecs}`);
    }
  };

  private onStartRecord = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Permissions for write access',
            message: 'Give permission to your storage to write a file',
            buttonPositive: 'ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the storage');
        } else {
          console.log('permission denied');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Permissions for write access',
            message: 'Give permission to your storage to write a file',
            buttonPositive: 'ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
        } else {
          console.log('permission denied');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
    const path = Platform.select({
      ios: 'recording.m4a',
      android: 'sdcard/recording.mp4',
    });
    const audioSet: AudioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    console.log('audioSet', audioSet);
    const uri = await this.audioRecorderPlayer.startRecorder(path, audioSet);
    this.audioRecorderPlayer.addRecordBackListener((e: any) => {
      this.setState({
        recordSecs: e.current_position,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.current_position),
        ),
      });
    });
    console.log(`uri: ${uri}`);
  };

  private onStopRecord = async () => {
    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0,
    });
    console.log(result);
  };

  private onStartPlay = async () => {
    console.log('onStartPlay');
    const path = Platform.select({
      ios: 'recording.m4a',
      android: 'sdcard/recording.mp4',
    });
    const msg = await this.audioRecorderPlayer.startPlayer(path);
    this.audioRecorderPlayer.setVolume(1.0);
    console.log(msg);
    this.audioRecorderPlayer.addPlayBackListener((e: any) => {
      if (e.current_position === e.duration) {
        console.log('finished');
        this.audioRecorderPlayer.stopPlayer();
      }
      this.setState({
        currentPositionSec: e.current_position,
        currentDurationSec: e.duration,
        playTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.current_position),
        ),
        duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
    });
  };

  private onPausePlay = async () => {
    await this.audioRecorderPlayer.pausePlayer();
  };

  private onStopPlay = async () => {
    console.log('onStopPlay');
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
  };
}

export default Page;
