// pages/collection/collection.js
import { RequestModel } from "../../utils/requestList.js"
let requestList = new RequestModel();
let app = getApp();
import { hexMD5 } from "../../utils/md5.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let info = JSON.parse(options.info);
    info.xiaoqinCard1 = (info.xiaoqinCard*0.01).toFixed(2);
    this.setData({
      orderInfo:info
    })
  },
  //创建订单
  createOrder: function(e){
    let reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/;
    if(!reg.test(Number(e.detail.value.price))){
      wx.showToast({
        title:'最多保留2位小数！',
        icon:'none'
      })
      return false;
    }
    let price = (Number(e.detail.value.price)*100).toFixed(0);
    let md5 = hexMD5(app.globalData.userInfo.id+''+price+''+this.data.orderInfo.userId);
    if(price<0){
      wx.showToast({
        title: '请输入收款金额！',
        icon:'none'
      })
    }else if(price>this.data.orderInfo.xiaoqinCard){
      wx.showToast({
        title: '余额不足！',
        icon:'none'
      })
    }else{
      let that = this;
      wx.showModal({
        title: '提示',
        content: '确定向'+that.data.orderInfo.userName+'扣款 '+(price*0.01).toFixed(2)+' 元?',
        confirmColor:'#4666B0',
        cancelColor:'#C0C4CC',
        success (res) {
          if (res.confirm) {
            requestList.createOrder({
              merchantBranchId:app.globalData.userInfo.id,
              price:price,
              sign:md5,
              userId:that.data.orderInfo.userId
            }).then(res=>{
              wx.showToast({
                title: '扣款成功！',
                icon:'success',
                duration:1000
              })
              setTimeout(function(){
                wx.redirectTo({
                  url:"/pages/detail/detail?id="+JSON.stringify(res.data.id)
                })
              },1000)
            })
          } else if (res.cancel) {
            
          }
        }
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