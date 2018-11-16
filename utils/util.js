const configData = require('/config.js');

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 获取购物车信息
const getShoppingCartDetails = (params,callback) => {
  wx.request({
    url: configData.apiUrl + '/search/shopping_cart',
    method: 'GET',
    data: params,
    success: (res) => {
      callback(res.data);
    }
  })
}
// 加入购物车
const addShoppingCart = (params,callback) => {
  wx.request({
    url: configData.apiUrl + '/add/shopping_cart',
    method: 'post',
    data: params,
    success: (res) => {
      callback(res.data);
    }
  })
}

module.exports = {
  formatTime: formatTime,
  getShoppingCartDetails: getShoppingCartDetails
}
