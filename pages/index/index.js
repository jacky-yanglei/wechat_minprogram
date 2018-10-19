//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: app.globalData.userInfo,
    imgUrls: [
      "http://112.74.49.74:3000/img03.jpg",
      "http://112.74.49.74:3000/img04.jpg"
    ],
    screenWidth: 0,
    screenHeight:0,
    cardList: [
      {
        // src: "https://fakeimg.pl/250x100/",
        src: "http://112.74.49.74:3000/img01.jpg",
        title: "土豪牌耗牛干 (五香味)",
        dec: "土豪牌耗牛干，源自海拔3800米以上高原，和雪水，吃虫草根；肉质鲜美，真正的纯天然食品，欢迎品味藏民秘制风干耗牛肉。"
      },
      {
        // src: "https://fakeimg.pl/250x100/",
        src: "http://112.74.49.74:3000/img01.jpg",
        title: "土豪牌耗牛干 (麻辣味)",
        dec: "土豪牌耗牛干，源自海拔3800米以上高原，和雪水，吃虫草根；肉质鲜美，真正的纯天然食品，欢迎品味藏民秘制风干耗牛肉。"
      }
    ],
    current: 'mine'
  },
  onLoad() {
    this.handleChange({detail:{key: 'mine'}});
    this.init();
  },
  init() {
    wx.getSystemInfo({
      success: res => {
        this.setData({
          screenWidth: res.screenWidth,
          screenHeight: res.screenHeight
        })
      },
    })
  },
  handleChange({ detail }) {
    if ( detail.key === 'mine' ) {
      if (!this.data.userinfo) {
        wx.getUserInfo({
          success: res => {
            this.setData({
              userInfo: res.userInfo
            })
            console.log(res);
            app.globalData.userInfo = res.userInfo;
          }
        })
      }
    }
    this.setData({
      current: detail.key
    });
  }
})
