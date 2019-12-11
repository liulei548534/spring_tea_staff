// pages/warehouse/warehouse.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isSelect: false,
        tablist:[],
        bechoice: 1,
        content: '',
        //商品信息
        shangpingInfo:[],
    },
    /**
     * item点击事件
     */
    choiceType: function (event) {
        console.log(event);
        var id = event.currentTarget.dataset.item.id;
        var curIndex = 0;
        for (var i = 0; i < this.data.tablist.length; i++) {
            if (id == this.data.tablist[i].id) {
                this.data.tablist[i].isSelect = true;
                curIndex = i;
            } else {
                this.data.tablist[i].isSelect = false;
            }
        }

        this.setData({
            content: this.data.tablist[curIndex].t,
            money: this.data.tablist[curIndex].y,
            nuber: this.data.tablist[curIndex].u,
            tablist: this.data.tablist,
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that = this
      //向后台请求商品数据，并保存在缓存
      wx.request({
        url: 'http://10.0.100.30:8083/customer/food/findAll',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          wx.setStorageSync("orderList", res.data)
          that.setData({
            shangpingInfo: res.data
          })
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
      var time = 5
      var inter = setInterval(function () {
        time = time - 1
        if (time === 0) {
        var that = this
      //向后台请求商品数据，并保存在缓存
      wx.request({
        url: 'http://10.0.100.30:8083/customer/food/findAll',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          wx.setStorageSync("orderList", res.data)
        }
         })
        }
      }, 1000)
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

    },
    //茶
    teaClick:function(){
      var shangpInfo = []
      var shang = wx.getStorageSync("orderList")
      for (var i = 0; i < shang.length; i++) {
        if (shang[i].type == "tea") {
          shangpInfo.push(shang[i])
        }
        this.setData({
          shangpingInfo: shangpInfo
        })
      }
    },
    //包间
  houseClick: function () {
    var houseInfo = []
    var shang = wx.getStorageSync("orderList")
    for (var i = 0; i < shang.length; i++) {
      if (shang[i].type == "house") {
        houseInfo.push(shang[i])
      }
      this.setData({
        shangpingInfo: houseInfo
      })
    }
  },
  //小吃
   snackClick: function () {
     var snackInfo = []
     var shang = wx.getStorageSync("orderList")
     for (var i = 0; i < shang.length; i++) {
       if (shang[i].type == "snack") {
         snackInfo.push(shang[i])
       }
       this.setData({
         shangpingInfo: snackInfo
       })
     }
  }

})