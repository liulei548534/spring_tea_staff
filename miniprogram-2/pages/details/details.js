// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //每点击不显示
    showModal: false,
    changeColor: [
      {
        name: "催上",
        isSelect: false
      }, {
        name: "已退",
        isSelect: false
      }
    ],
    isFinish: "订单",
    order: [{
      isSelect: false
    },],
    count: 3,
    num: "",
    price: "",
    id: 0,
    bussness: [{}],
    index_five: [{
      status: "订单",
      list: [{
        id: 0,
        name: "红糖糍粑",
        price: 45,
        unm: 3
      }, {
        id: 1,
        name: "222",
        price: 55,
        unm: 55
      }]
    }],
  },
  //点击 单个删除 
  shanchuTap: function (e) {
    wx.showModal({
      content: '确认菜品？',
      success(res) {
        if (res.confirm) {
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
  },
  changeColor: function (e) {
    var index = e.currentTarget.dataset.index
    var indexs = index.split("/")
    var date = this.data.index_five[0].list
    var that = this
    // date.forEach((v,i)=>i==indexs[1]?change(e):"")
    for (var i = 0; i < date.length; i++) {
      if (i == indexs[1]) {
        var data = that.data.changeColor
        if (!data[indexs[0]].isSelect) {

          data.forEach((v, i) => i == indexs[0] ? v.isSelect = true : ""
          )
        } else {
          data.forEach((v, i) => i == indexs[0] ? v.isSelect = false : ""
          )
        }
        // 设置数据
        that.setData({
          changeColor: data
        })
      } else {
        console.log("songmingjie")
      }
    }

    function change(e) {
      var data = that.data.changeColor
      if (!data[indexs[0]].isSelect) {

        data.forEach((v, i) => i == indexs[0] ? v.isSelect = true : ""
        )
      } else {
        data.forEach((v, i) => i == indexs[0] ? v.isSelect = false : ""
        )
      }
      // 设置数据
      that.setData({
        changeColor: data
      })
    }



  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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