// pages/history/history.js
var app = getApp()
Page({
    data: {
      // 显示数量
      count: 100,
      index_five:[]
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
  }
})