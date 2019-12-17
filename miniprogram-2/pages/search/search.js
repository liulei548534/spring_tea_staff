// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: [],
    quxiao: "",
    info: ""
  },
  time: -1,
  handInput: function (e) {
    var date = e.detail.value
    if (!date.trim()) {
      return
    }
    var that = this
    this.time = setTimeout(function () {
      wx.request({
        url: 'http://10.0.100.30:8083/customer/food/search/' + date,
        data: {
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: (result) => {
          var date = result.data
          var info = "songmingjie"
          if (date.length === 0) {
            info = "抱歉亲，本店还没有该商品"

            that.setData({
              info
            })
          } else {
            info = "songmingjie"
            that.setData({
              index: date,
              info
            })
          }
        },
        fail: () => { },
        complete: () => { }
      });
    }, 1000)
  },
  quxiao() {
    this.setData({
      quxiao: "",
      index: []
    })
  }
})