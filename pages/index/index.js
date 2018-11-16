//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userInfo: null,
    imgUrls: [
      app.globalData.staticUrl + "/img03.jpg",
      app.globalData.staticUrl + "/img04.jpg"
    ],
    screenWidth: 0,
    screenHeight:0,
    cardList: [
      {
        id: '1111',
        // src: "https://fakeimg.pl/250x100/",
        src: app.globalData.staticUrl + "/img01.jpg",
        title: "土豪牌耗牛干 (五香味)",
        dec: "土豪牌耗牛干，源自海拔3800米以上高原，和雪水，吃虫草根；肉质鲜美，真正的纯天然食品，欢迎品味藏民秘制风干耗牛肉。"
      },
      {
        id: '2222',
        // src: "https://fakeimg.pl/250x100/",
        src: app.globalData.staticUrl + "/img01.jpg",
        title: "土豪牌耗牛干 (麻辣味)",
        dec: "土豪牌耗牛干，源自海拔3800米以上高原，和雪水，吃虫草根；肉质鲜美，真正的纯天然食品，欢迎品味藏民秘制风干耗牛肉。"
      }
    ],
    current: 'home',
    shoppingCartData: app.globalData.shoppingData,
    shoppingCount: 0
  },
  onLoad() {
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
    this.getUserInfo();
    this.getShoppingCart();
  },
  getUserInfo: function() {
    if (!this.data.userInfo) {
      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo
        })
      } else {
        setTimeout(() =>{
          this.getUserInfo()
        },100);
      }
    }
  },
  getShoppingCart: function() {
    if (app.globalData.shoppingData) {
      this.setData({
        shoppingCount: app.globalData.shoppingData.length
      })
    }else {
      setTimeout(() => {
        this.getShoppingCart()
      }, 100);
    }
  },
  addShoppingCart: function(evet) {
    let id = evet.target.id;
    let init = false;
    for (let i = 0; i < app.globalData.shoppingData.length; i++) {
      if (app.globalData.shoppingData[i].id === id) {
        init = true;
        app.globalData.shoppingData[i].count++
      }
    }
    this.setData({
      shoppingCartData: app.globalData.shoppingData
    })
    if(!init){
      app.globalData.shoppingData.push({
        id: id,
        count: 1
      });
    }
    this.getShoppingCart();
    wx.request({
      url: app.globalData.apiUrl + '/add/shopping_cart',
      method: 'POST',
      data: {
        userId: app.globalData.userId,
        shoppingData: app.globalData.shoppingData
      },
      success: res => {
        if(res.code === 200){
          console.log('添加购物车成功');
        }
      }
    })
  },
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  }
})
