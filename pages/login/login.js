// pages/login/login.js
import { RequestModel } from "../../utils/requestList.js"
let requestList = new RequestModel();
let app = getApp();
import { hexMD5 } from "../../utils/md5.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    passwordType:'password'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //展示密码
  seePassword:function(){
    if(this.data.passwordType==='password'){
      this.setData({
        passwordType:'text'
      })
    }else{
      this.setData({
        passwordType:'password'
      })
    }
  },
  //登录
  toLogin: function(e){
    let data = e.detail.value;
    if(data.phone===''||data.pass===''){
      wx.showToast({
        title: '请输入手机号或密码！',
        icon:'none'
      })
    }else if(!app.globalData.phoneReg.test(data.phone)){
      wx.showToast({
        title: '请输入正确的手机号码！',
        icon:'none'
      })
    }else{
      let md5 = hexMD5(data.pass + app.globalData.md5);
      requestList.toLogin(md5,data.phone).then(res=>{
        let data = res.data.merchantLoginResp;
        data.todayPrice1 = (data.todayPrice*0.01).toFixed(2);
        app.globalData.userInfo = data;
        wx.setStorageSync('userInfo', JSON.stringify(data));
        wx.showToast({
          title: '登录成功！',
          icon:'success',
          duration:1000
        })
        setTimeout(function(){
          wx.reLaunch({
            url:'/pages/index/index'
          })
        },1000)
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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