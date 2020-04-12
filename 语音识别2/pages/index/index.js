//index.js
//获取应用实例
const app = getApp()
var plugin = requirePlugin("QCloudAIVoice")
plugin.setQCloudSecret(1301761425, "AKIDaQ6tPKCLRJuFFNkvJRKxJPFjyyHKZbog", "jBLOBhwwidIhsrnSi9JDqCMEqFXXtymK", true)

const word1 = "这是测试页面，接下来将会根据指示进行操作和宣读具体内容"
const word2 = "识别成功，接下来将会是残酷的考验，请调整您的坐姿，准备进行地狱的考验吧!"
const word3 = "下面由我宣读一下内容："
const word4 = "请问您当前是不是正确的了解到该内容？"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    firstWord:"",
    goStart:true,
    talk:true,//控制最终页面
    viocelist:0,//控制读列表的哪一个
    vioceTime:0,
    wordRoll:[
      {
        id:0,
        title:"产品名称1",
        text:"超级旋风产品"
      },
      {
        id: 1,
        title:"产品场地1",
        text:"这是一个非常大非常大的一个堡垒，能够进行娱乐休闲和玩乐的地方，适合度假旅游和玩耍"
      },
      {
        id: 2,
        title: "产品名称2",
        text: "超级旋风产品"
      },
      {
        id: 3,
        title: "产品场地2",
        text: "这是一个非常大非常大的一个堡垒，能够进行娱乐休闲和玩乐的地方，适合度假旅游和玩耍"
      },
      {
        id: 4,
        title: "产品名称3",
        text: "超级旋风产品"
      },
      {
        id: 5,
        title: "产品场地3",
        text: "这是一个非常大非常大的一个堡垒，能够进行娱乐休闲和玩乐的地方，适合度假旅游和玩耍"
      }
    ],
    listWord:[],
    nowTime:0,
    lastTime:0,
    rollId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  getVioce(){
    let manager = plugin.getRecordRecognitionManager()
    manager.onStart((res) => {
      console.log('recorder start', res.msg)
    })
    manager.onStop((res) => {
      console.log('recorder stop', res.tempFilePath)
    })
    manager.onError((res) => {
      console.log('recorder error', res.errMsg)
    })
    manager.onRecognize((res) => {
      if (res.result) {
        console.log("current result", res.result)
      } else if (res.errMsg) {
        console.log("recognize error", res.errMsg)
      }
    })
    manager.start({ duration: 30000, engine_model_type: '16k_0' })
  },
  //自动播报语音内容
  showVioce(word){
    const innerAudioContext = wx.createInnerAudioContext()
    let go = new Promise((resolve,reject)=>{
      plugin.textToSpeech({
        content: word,
        speed: 0,
        volume: 0,
        voiceType: 1002,
        language: 1,
        projectId: 0,
        sampleRate: 16000,
        success: (data) => {
          let url = data.result.filePath;
          if (url && url.length > 0) {
            innerAudioContext.autoplay = true
            innerAudioContext.src = url
            innerAudioContext.onPlay(() => {
              console.log("开始了")
            })
            innerAudioContext.onEnded(() => {
                console.log("结束了")
                console.log(this.data.vioceTime)
                if (this.data.vioceTime === 1) {
                  this.callList()
                } else if(this.data.vioceTime === 2){
                  return
                }
                resolve()
            })
            innerAudioContext.onError((res) => {
              console.log(res.errMsg)
            })
          }
        },
        fail: function (error) {
          console.log(error);
        }
      })
    })
    return go
  },
  //开始测试按钮
  testStart(){
    this.setData({
      goStart:false
    })
    this.showVioce(this.data.firstWord).then(()=>{
      this.setData({
        firstWord: word2
      })
      return this.showVioce(this.data.firstWord)
    }).then(()=>{
      this.setData({
        firstWord:word3,
        talk:false
      })
      return this.showVioce(this.data.firstWord)
    }).then(()=>{
      this.setData({
        vioceTime:this.data.vioceTime + 1
      })
      return this.callList()
    }).catch((res)=>{
      console.log(res)
    })
  },
  //宣读列表
  callList(){
    if (this.data.viocelist === this.data.wordRoll.length) {
      this.setData({
        firstWord:word4,
        viocelist:this.data.viocelist + 1,
        vioceTime:this.data.vioceTime + 1
      })
      setTimeout(()=>{
        this.showVioce(this.data.firstWord)
      },1000)
      return
    }
    let num = this.data.viocelist
    this.showVioce(this.data.listWord[num])
    this.setData({
      viocelist:this.data.viocelist + 1,
      rollId: "rollId" + this.data.viocelist
    })
  },
  
  onReady: function () {
    let num = this.data.wordRoll.map((item,index)=>{
      return "" + item.title + "," + item.text
    })
    this.setData({
      firstWord: word1,
      listWord: num
    })
    //处理列表

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})