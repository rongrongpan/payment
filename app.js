//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    phoneReg:/^1[3-9][0-9]\d{8}$/,
    md5:'...sadHJD34jijfjI_/}',//加密字符串
    codemd5:'hjhdf423retSDJH32sdf',//验证码加密串
  }
})