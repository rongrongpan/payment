//index.js
//获取应用实例
const app = getApp()
import { RequestModel } from "../../utils/requestList.js"
let requestList = new RequestModel();
Page({
  data: {
    userInfo:{},//用户信息
    loadding:false,//正在识别二维码
    todayPrice:0,//今日收益
  },
  onShow: function(){
    if(app.globalData.userInfo.id){
      this.getFill();
    }
  },
  getFill: function(){
    requestList.todayFill(app.globalData.userInfo.id).then(res=>{
      this.setData({
        todayPrice:(res.data.value*0.01).toFixed(2)
      })
    })
  },
  onLoad: function () {
    let info = wx.getStorageSync('userInfo');
    if(info){
      app.globalData.userInfo = JSON.parse(info);
      this.setData({
        userInfo:JSON.parse(info),
        todayPrice:JSON.parse(info).todayPrice1
      })
    }else{
      wx.reLaunch({
        url: '/pages/login/login',
      })
    }
  },
  //扫描二维码
  openCode: function(){
    let that = this;
    this.setData({
      loadding:true
    })
    wx.scanCode({
      success (res){
        requestList.getCodeInfo(res.result,app.globalData.userInfo.id).then(data=>{
          that.setData({
            loadding:false
          })
          let info = data.data.qrCode;
          if(info.orderInfoList.length){
            wx.navigateTo({
              url: '/pages/order/order?info='+JSON.stringify(info)
            })
          }else{
            wx.navigateTo({
              url: '/pages/collection/collection?info='+JSON.stringify(info)
            })
          }
        })
      },
      fail(data){
        that.setData({
          loadding:false
        })
      }
    })
  }
})
