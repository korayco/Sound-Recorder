# Sound Recorder

## Tools

* Vs Code
* Android Studio
* Node (15.14.0)
* Git
* Yarn or npm (package manager)

## 🚀 Setup
`
git clone https://github.com/korayco/Sound-Recorder.git
cd Sound-Recorder

yarn install
or
npm install
`

## Project Specifications:

### Versions:

* react-native version (0.64)
* react (17.0.1)
* Typescript template

### Permission:

* RECORD_AUDIO
* WRITE_EXTERNAL_STORAGE

### Screens:

* Main Screen:
    Main screen is responsible for handling for sound recording and player of recorded sound

  * onStartRecord
      When sound record (play) button is clicked then the onStartRecord function fired which initially check the permissions after that its create an instance of       audio recorder and an event listener is attached with it, as recording proceeds it update the recording time of the current state. It saves the recording         on the device storage
  * onStopRecord
      When stop button clicked the control is passed to the onStopRecord function, it takes the recorder instance and stop the recording.

### Components

* Player Manager
  * Player manager is mounted on the main screen after recording stoped
    and it takes the recording from the storage and use player
    component to play the audio.
* Player Component
  * It get the duration of the playing video from `TrackPlayer hook`and map it to progress, it handle the controls of the player
