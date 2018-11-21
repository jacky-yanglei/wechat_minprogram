//index.js
//获取应用实例
const app = getApp()
const utils = require('../../utils/util.js');

Page({
  data: {
    userInfo: null,
    imgUrls: [
      app.globalData.staticUrl + "/wechatmini/img03.jpg",
      app.globalData.staticUrl + "/wechatmini/img04.jpg"
    ],
    screenWidth: 0,
    screenHeight:0,
    cardList: [],
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
    this.getGoodsInfo();
  },
  getGoodsInfo: function() {
    utils.getGoodsList((data) => {
      for (let i = 0; i < data.data.length; i++) {
        data.data[i].goods_pic_url = app.globalData.staticUrl + data.data[i].goods_pic_url
      }
      this.setData({
        cardList:data.data
      })
      console.log(data)
    })
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
