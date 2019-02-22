//logs.js
var util = require('../../utils/util.js')
var app = getApp();
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
const options = {
  duration: 10000,
  sampleRate: 16000,
  numberOfChannels: 1,
  encodeBitRate: 64000,
  format: 'mp3',
  frameSize: 50
}
Page({
  data: {
    logs: [],
    voice:''
  },
  onLoad: function () {
   
  },
  speechStart:function(e, that) {
   
 
    //开始录音
    recorderManager.start(options);
    recorderManager.onStart(() => {
      console.log('recorder start')
    });
    //错误回调
    recorderManager.onError((res) => {
      console.log(res);
    })
  },
  play: function () {
    innerAudioContext.autoplay = true
    innerAudioContext.src = this.tempFilePath,
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
  /** 语音识别 */
  speechRecognition:function(that, res) {
    recorderManager.stop();
    recorderManager.onStop((res) => {
      this.tempFilePath = res.tempFilePath;
      console.log('停止录音', res.tempFilePath)
      const { tempFilePath } = res
    })
    // console.log("语音识别");
    // wx.uploadFile({
    //   url: app.api_url + 'upload/silkToWav.php',
    //   filePath: res.tempFilePath,
    //   name: 'file',
    //   formData: {
    //     'user': 'test'
    //   },
    //   success: function (res) {
    //     console.log(res); console.log(res.data);
    //   },
    //   fail: function () {
    //     console.log("语音识别失败");
    //   }
    // })
    
  } 
})
