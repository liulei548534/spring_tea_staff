//index.js
var app = getApp()
var count = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //每点击不显示
    showModal: false,
    isFinish: "正在进行",
    order: [{
      id: 0,
      name: "正在进行",
      funName: "on_ing",
      isSelect: false
      // }, {
      //     id: 1,
      //     name: "空闲",
      //     funName: "on_ed",
      //     isSelect: false
    }],
    index: "",
    isWho: "",
    // 显示价格栏信息
    info: [],
    // 显示数量
    count: 3,
    // 包间名
    num: "",
    // 总价
    price: "",
    bussness: [{
      functionName: "showAll"
    }],
    index_five: [],
    // yes_y: true,
  },
  shanchuTap: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.value
    // var groupIndex = e.target.dataset.groupindex; // 拿到老师的index
    // var index = e.target.dataset.index; // 拿到当前课程 的index
    wx.showModal({
      content: '确认账单？',
      success(e) {
        if (e.confirm) {
          var date = app.globalData.historyOrder
          date.push(app.globalData.ingOrder[index])
          app.globalData.ingOrder.splice(index, 1)
          that.setData({
            index_five: app.globalData.ingOrder
          })
        } else if (e.cancel) {

        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var myThis = this;
    var flag = wx.getStorageSync("flag")
    if (flag == "") {
      wx.connectSocket({
        url: 'ws://10.0.100.30:8090/websocket/24'
      })
      wx.onSocketOpen(function(res) {
        console.log("链接服务器成功")
      })
      wx.setStorageSync("flag", true)
    }else{
      var array = []
      app.globalData.haveFinish = []
      for (var i = 0; i < app.globalData.ingOrder.length; i++) {
        for(var j=0;j<app.globalData.ingOrder[i].list.length;j++){
          array.push({
            finish: false
          })
        }
        app.globalData.haveFinish.push(array)
      }
      myThis.setData({
        index_five: app.globalData.ingOrder
      })
    }
    var myThis = this;
    wx.onSocketMessage(function(res) {
      var message = JSON.parse(res.data)
      app.globalData.ingOrder.push(message[0])
      var array = []
      for (var i = 0; i < message[0].list.length; i++) {
        array.push({
          finish: false
        })
      }
      app.globalData.haveFinish.push(array)
      message = app.globalData.ingOrder;
      if (message.length == 0) {
        return
      }
      myThis.setData({
        index_five: message
      })
      var info = myThis.data.info
      for (var i = 0; i < myThis.data.index_five.length; i++) {
        info.push({})
        console.log(info[i])
      }
      var isWho = "";
      console.log(myThis.data.index_five)
      if (myThis.data.index_five[0].list.length == 0) {
        isWho = "one"
      } else {
        isWho = "else"
      }
      var up = "order[0].isSelect";
      myThis.setData({
        info,
        isWho: isWho,
        [up]: true,
        index: 0
      })
      wx.showToast({
        title: '您有新的订单',
        icon: 'none',
        duration: 2000
      })
    })
  },
  onShow: function() {
    app.globalData.ingOrder.forEach((v, i) => v == undefined ? app.globalData.ingOrder.splice(i,1):"")
    console.log()
    this.setData({
      index_five: app.globalData.ingOrder
    })
  },
  on_ing: function(e) {
    var index = e.currentTarget.dataset.index;
    let list = this.data.order;
    list.forEach((v, i) => i === index ? v.isSelect = true : v.isSelect = false)
    this.setData({
      isFinish: "正在进行",
      order: list,
      index: 0
    })
  },
})