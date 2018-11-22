//app.js
const utils = require('utils/util.js');

const configData = require('utils/config.js');
App({
  onLaunch: function () {
    let init = 0;
    wx.showLoading({
      title: '初始化中...',
      mask: true
    });
    wx.login({
        success:(res) => {
          wx.request({
            url: this.globalData.apiUrl + '/login',
            method: 'POST',
            data: {
              code: res.code
            },
            success: res => {
              if(res.data.code === 200){
                this.globalData.userId = res.data.data.userID;
                utils.getShoppingCartDetails({ id: res.data.data.userID }, res => {
                  if (res.data.shoppingData) {
                    this.globalData.shoppingData = res.data.shoppingData;
                  } else {
                    this.globalData.shoppingData = [];
                  }
                  init++;
                  if (init === 2) {
                    wx.hideLoading();
                  }
                })
              }
            },
            fail: () => {

            }
          })
        },
        fail: () => {

        }
      });
    // 获取用户信息
    wx.getUserInfo({
      withCredentials: true,
      success: res => {
        this.globalData.userInfo = res.userInfo;
        init++;
        if (init === 2) {
          wx.hideLoading();
        }
      },
      fail: function () {
        //获取用户信息失败后。请跳转授权页面
        wx.showModal({
          title: '警告',
          content: '尚未进行授权，请点击确定跳转到授权页面进行授权。',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../login/login',
              })
            }
          }
        })
      }
    })
  },
  globalData: {
    userId: null,
    userInfo: null,
    shoppingData: null,
    // apiUrl: 'https://www.yanglei.online/wechat/mini',
    // staticUrl: 'https://www.yanglei.online/wechatmini'
    apiUrl: configData.apiUrl,
    staticUrl: configData.staticUrl
  }
})