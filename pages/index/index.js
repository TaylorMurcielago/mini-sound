//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        motto: 'Hello World',
        record_tmpfile: '', // 最近一次录音的临时文件路径;
        record_ms: '', // 录音的毫秒数
        uploaded_url: '', // 已上传文件的路径;
        userInfo: {},
        img_l: '',
        show:false,
      upload: false
    }, 
  gotoImg:function(e){ 
    wx.navigateTo({
      url: "/pages/playImg/playImg"
    }) 
      
  },
    // 录音功能: 
    handleRecordStart: function(e) {
        const that = this
        const timeStart = Date.now(); 
        wx.startRecord({
            success: function(res) {
                console.log('record success res: ', res.tempFilePath);
                // uploaded_url = res.tempFilePath;
                that.setData({
                    uploaded_url: res.tempFilePath
                })
                var tempFilePath = res.tempFilePath
                that.setData({
                    record_tmpfile: tempFilePath,
                    record_ms: Date.now() - timeStart,
                });
              that.handleUploadVoice();
             


            },
            fail: function(res) {
                //录音失败
                console.log('record fail res: ', res);
                wx.stopRecord();
                if (res.errMsg.indexOf('auth') >= 0) {
                    wx.showModal({
                        title: '无法录音',
                        content: '您已经拒绝访问麦克风，无法使用录音功能，如需使用，请删除此小程序，并重新搜索打开',
                        showCancel: false,
                    });
                } else {
                    wx.showToast({
                        title: '未知错误',
                    })
                }

            }
        })
        setTimeout(function() {
            //结束录音  
            wx.stopRecord()
        }, 60000);
    },

    // 停止录音: 
    handleRecordEnd: function(e) {
        wx.stopRecord()
    },

    // 播放录音: 
    handlePlayVoice: function() {
        console.log('start play voice');
        wx.playVoice({
            filePath: this.data.record_tmpfile,
        })
    },
fenxi:function(){
  
},
    handleUploadVoice: function() {
        const { record_tmpfile, record_ms } = this.data;
        wx.showLoading({ title: '计算中！' });
        
        const that = this;
     var timestamp=new Date();
      timestamp = timestamp.getTime();
        wx.uploadFile({
          url: app.api_url + 'silk-v3-decoder/silkToWav.php',
            filePath: record_tmpfile,
            name: 'file',
            formData: {
                audio_ms: record_ms,
                timestamp: timestamp 
            },
            success: function(res) {
              setTimeout(function () {
                wx.showToast({ title: '计算成功！' });
                that.setData({
                  show: true
                })
                // that.setData({
                //   upload: true
                // })
                ;
              }, 500);
              setTimeout(function () { 
                that.gotoImg();
              }, 1000);
            
                wx.hideLoading();
                var data = res.data
                console.log('upload_res: ', res);
                const data2 = JSON.parse(res.data);
                console.log('upload res data2: ', data2);
                //do something
                let toastTitle = '计算成功';
                if (data2.c != 0) {
                    toastTitle = data2.m;
                } else {
                    that.setData({ uploaded_url: data2.d });
                }
                setTimeout(function() {
                    wx.showToast({ title: toastTitle });
                }, 500);
            },
            fail: function(res) {
                wx.hideLoading();

            }
        })
    }
})