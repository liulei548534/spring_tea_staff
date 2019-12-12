// pages/history/history.js
var app = getApp()
Page({

  /**
     * 页面的初始数据
     */

    data: {
      // 显示数量
      count: 100,
      index_five:[]
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.request({
      url: 'http://10.0.100.30:8083/client/orderList/findAll',
      success:function(res){
        res.data.list.forEach((v,i)=>true?v.orderinfo=JSON.parse(v.orderinfo):"")
        wx.setStorageSync("historyOrder",res.data.list)
        that.setData({
          index_five:res.data.list
        })
      }
    })
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