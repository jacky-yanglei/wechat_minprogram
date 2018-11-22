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
    current: 'shoppingcart',
    shoppingCartData: app.globalData.shoppingData,
    shoppingCount: 0,
    shoppingBalance: 0,
    globalData: app.globalData
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
      this.setData({
        cardList:data.data
      })
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
      let num = 0;
      for (let i = 0; i < app.globalData.shoppingData.length; i++) {
        num += app.globalData.shoppingData[i].count * app.globalData.shoppingData[i].price
      }
      this.setData({
        shoppingCount: app.globalData.shoppingData.length,
        shoppingCartData: app.globalData.shoppingData,
        shoppingBalance: num
      });
    }else {
      setTimeout(() => {
        this.getShoppingCart()
      }, 100);
    }
  },
  addShoppingCart: function(evet) {
    let id = evet.target.id, price, goods_pic_url, name;
    for (let i = 0; i < this.data.cardList.length; i++) {
      if (this.data.cardList[i]._id === id){
        price = this.data.cardList[i].goods_price;
        goods_pic_url = this.data.cardList[i].goods_pic_url
        name = this.data.cardList[i].goods_name
      }
    }
    let init = false;
    console.log(app.globalData.shoppingData);
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
        count: 1,
        price: price,
        pic_url: goods_pic_url,
        name: name
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
        if(res.data.code === 200){
          console.log('添加购物车成功');
        }
      }
    })
  },
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
    if (detail.key === 'home') {
      wx.setNavigationBarTitle({title: "土豪牌"})
    } else if (detail.key === 'shoppingcart') {
      wx.setNavigationBarTitle({ title: "购物车" })
    } else if (detail.key === 'mine') {
      wx.setNavigationBarTitle({ title: "我的" })
    }
  }
})
