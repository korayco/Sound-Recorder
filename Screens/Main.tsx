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
    marginTop: '5%',
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
  recordSecs: number;
  recordTime: string;
  currentPositionSec: number;
  currentDurationSec: number;
  playTime: string;
  duration: string;
  recordBtn: boolean;
  stopBtn: boolean;
  playBtn: boolean;
  isShowPlayer: boolean;
}

class SoundRecorder extends Component<any, State> {
  private audioRecorderPlayer: AudioRecorderPlayer;

  constructor(props: any) {
    super(props);
    this.state = {
      recordBtn: false,
      stopBtn: false,
      playBtn: false,
      recordSecs: 0,
      recordTime: '00:00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
      isShowPlayer: false,
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
        <View style={{alignItems: 'center'}}>
          <Text style={styles.timeText}>{this.state.recordTime}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: '3%',
            }}>
            <TouchableOpacity
              onPress={() => {
                let isShowPlayer = false;
                if (this.state.recordBtn) {
                  this.onStopRecord();
                  isShowPlayer = true;
                } else {
                  this.onStartRecord();
                }
                this.setState({
                  recordBtn: !this.state.recordBtn,
                  isShowPlayer,
                });
              }}>
              <Image
                style={{width: 100, height: 100}}
                source={
                  this.state.recordBtn
                    ? require('../assets/image1_select.png')
                    : require('../assets/image2_select.png')
                }
              />
            </TouchableOpacity>
          </View>
          {this.state.isShowPlayer && <PlayerManager />}
        </View>
     
      </View>
    );
  }

  private onStartRecord = async () => {
    // Recording will be start as click on the play icon
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

        // Get permitions from the user 
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
  };

  private onStopRecord = async () => {
    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0,
    });
    console.log(result);
  };
}

export default SoundRecorder;
