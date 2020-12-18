// pages/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let info = JSON.parse(options.info);
    info.orderInfoList.forEach(function(ele){
      ele.itemInfo = JSON.parse(ele.itemInfo);
      ele.price = (ele.price*0.01).toFixed(2);
    })
    info.xiaoqinCard1 = (info.xiaoqinCard*0.01).toFixed(2)
    this.setData({
      order:info
    })
  },
  //扫码收款
  getMoney: function(){
    wx.redirectTo({
      url: '/pages/collection/collection?info='+JSON.stringify(this.data.order),
    })
  },
  //跳转到核销页面
  navToNext: function(e){
    wx.redirectTo({
      url:'/pages/orderXq/orderXq?id='+e.currentTarget.dataset.id
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