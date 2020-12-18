// pages/orderXq/orderXq.js
import { RequestModel } from "../../utils/requestList.js"
let requestList = new RequestModel();
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:null,
    orderInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId:options.id
    })
    this.getXq();
  },
  //获取详情
  getXq: function(){
    wx.showLoading({
      title:'加载中...'
    });
    requestList.getOrderXq(this.data.orderId).then(res=>{
      let data = res.data.order;
      data.itemInfo = JSON.parse(data.itemInfo);
      data.xiaoqinCard = (data.xiaoqinCard*0.01).toFixed(2);
      data.itemInfo.forEach(function(el){
        el.price = (el.price*0.01).toFixed(2);
      })
      this.setData({
        orderInfo:data
      })
      wx.hideLoading()
    })
  },
  //复制
  getCopy: function(e){
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success (res) {
        wx.showToast({
          title: '复制成功！',
          icon:'none'
        })
      }
    })
  },
  //核销订单
  clearOrder: function(){
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定核销该订单?',
      confirmColor:'#4666B0',
      cancelColor:'#C0C4CC',
      success (res) {
        if (res.confirm) {
          requestList.clearOrder(that.data.orderId).then(res=>{
            wx.showToast({
              title: '核销成功！',
              icon:'success',
              duration:1000
            })
            setTimeout(function(){
              requestList.getCodeInfo(res.data.url,app.globalData.userInfo.id).then(data=>{
                let info = data.data.qrCode;
                wx.redirectTo({
                  url: '/pages/order/order?info='+JSON.stringify(info)
                })
              })
            },1000)
          })
        } else if (res.cancel) {
          
        }
      }
    })  
    
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