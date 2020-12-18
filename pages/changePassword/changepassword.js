// pages/changePassword/changepassword.js
import { RequestModel } from "../../utils/requestList.js"
let requestList = new RequestModel();
let app = getApp();
import { hexMD5 } from "../../utils/md5.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    endTime:60,//重新获取倒计时
    phone:'',//手机号
    changePhone:false,//修改密码页面
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //获取验证码
  getCode: function(e){
    if(this.data.phone==='' || !app.globalData.phoneReg.test(this.data.phone)){
      wx.showToast({
        title: '请输入正确的手机号码！',
        icon:'none'
      })
    }else{
      let md5 = hexMD5(this.data.phone + app.globalData.codemd5);
      requestList.getCode(this.data.phone,md5).then(res=>{
        this.theTime();
        wx.showToast({
          title: '短信发送成功',
          icon:'none'
        })
      })
    }
  },
  //手机号输入
  phoneChange: function(e){
    this.setData({
      phone:e.detail.value
    })
  },
  //倒计时
  theTime: function(){
    let that = this;
    let timer = setInterval(function(){
      if(that.data.endTime===0){
        that.setData({
          endTime:60
        })
        clearInterval(timer)
      }else{
        that.setData({
          endTime:that.data.endTime-1
        })
      }
    },1000)
  },
  //提交
  getSubmit: function(e){
    let data = e.detail.value;
    requestList.testCode(data.code,data.phone).then(res=>{
      this.setData({
        changePhone:true
      })
    })
  },
  //更新密码
  changePass: function(e){
    let data = e.detail.value;
    if(data.pass===''||data.pass1===''){
      wx.showToast({
        title: '请输入密码！',
        icon:'none'
      })
    }else if(data.pass!==data.pass1){
      wx.showToast({
        title: '两次密码不一致！',
        icon:'none'
      })
    }else{
      let md5 = hexMD5(data.pass + app.globalData.md5);
      requestList.changePass(this.data.phone,md5).then(res=>{
        wx.showToast({
          title: '修改成功！',
          success(){
            wx.reLaunch({
              url: '/pages/login/login',
            })
          }
        })
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