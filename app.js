//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    wx.getSetting({
      success: res => { 
        console.log(res);
      }
    })
    // 获取用户信息
    wx.getUserInfo({
      withCredentials: true,
      success: res => {
        this.globalData.userInfo = res.userInfo;
      },
      fail: function () {
        //获取用户信息失败后。请跳转授权页面
        wx.showModal({
          title: '警告',
          content: '尚未进行授权，请点击确定跳转到授权页面进行授权。',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
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
    userInfo: null
  }
})