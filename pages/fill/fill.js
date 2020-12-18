// pages/fill/fill.js
import { RequestModel } from "../../utils/requestList.js"
let requestList = new RequestModel();
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectMonth:'',//当月
    fillXq:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let date = new Date();
    let month = date.getMonth()+1;
    month>9?'':month='0'+month;
    this.setData({
      selectMonth:date.getFullYear()+'-'+month
    })
    this.getList();
  },
  //获取账单
  getList(){
    requestList.fillList(app.globalData.userInfo.id,this.data.selectMonth).then(res=>{
      let data = res.data.billOrderResp;
      let str = String((data.totalPrice*0.01).toFixed(2));
      data.totalPrice1 = {
        yuan:str.substr(0,str.length-2),
        fen:str.substr(str.length-2,str.length)
      }
      data.billTodayOrderList.forEach(function(ele){
        ele.price = (ele.price*0.01).toFixed(2);
        ele.billTodayUserOrderList.forEach(function(el){
          el.price = (el.price*0.01).toFixed(2);
        })
      })
      this.setData({
        fillXq:data
      })
    })
  },
  //日期
  bindDateChange: function(e){
    this.setData({
      selectMonth: e.detail.value
    })
    this.getList();
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