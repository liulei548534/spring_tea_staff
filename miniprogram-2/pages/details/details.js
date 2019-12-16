// pages/details/details.js
var app= getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    haveFinish:[],
    bussness: [{}],
    index_five: [],
    num:'',
    count:0
  },
  shanchuTap:function(e){
    var count = this.data.count;
    var my_this = this
    wx.showModal({
      content: '确认菜品？',
      success(res){
        if(res.confirm){
          var index = e.currentTarget.dataset.index
          var date = my_this.data.haveFinish
          if (date[index].finish) {
            date[index].finish = false
          } else {
            date[index].finish = true
          }
          my_this.setData({
            haveFinish: date
          })
          count++
          my_this.setData({
            count
          })
          if (count == my_this.data.index_five.list.length){
              wx.showModal({
                content: '菜品已上完，是否删除该订单',
                success(res){
                  if(res.confirm){
                    app.globalData.ingOrder.splice(my_this.data.num,1)
                    app.globalData.haveFinish.splice(my_this.data.num,1)
                    my_this.setData({
                      index_five:[],
                      num:""
                    })
                  }
                }
              })
          }
        }
      }
    })
  },
  changeColor: function (e) {
    var index = e.currentTarget.dataset.index
    var indexs = index.split("/")
    var date = this.data.index_five.list
    var that = this
    if (date[indexs[0]].isSelect) {
      date[indexs[0]].isSelect = false
    } else {
      date[indexs[0]].isSelect = true
    }
    var conne = that.data.index_five
    conne.list = date
    that.setData({
      index_five: conne
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var num = options.index
    var message = app.globalData.ingOrder[options.index]
    var haveFinish = app.globalData.haveFinish[options.index]
    this.setData({
      index_five:message,
      haveFinish,
      num
    })
  }
})