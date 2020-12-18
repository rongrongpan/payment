// pages/detail/detail.js
import { RequestModel } from "../../utils/requestList.js"
let requestList = new RequestModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderInfo:{},//订单信息
    orderId:null
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
  //账单详情
  getXq: function(){
    wx.showLoading({
      title:'加载中...'
    })
    requestList.getFillXq(this.data.orderId).then(res=>{
      let info = res.data.billDetail;
      let str = String((info.price*0.01).toFixed(2));
      info.price1 = {
        yuan:str.substr(0,str.length-2),
        fen:str.substr(str.length-2,str.length)
      }
      info.xiaoqinCard = (info.xiaoqinCard*0.01).toFixed(2);
      this.setData({
        orderInfo:info
      })
      wx.hideLoading()
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