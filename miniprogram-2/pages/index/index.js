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
    var index = e.currentTarget.dataset.index
    // var groupIndex = e.target.dataset.groupindex; // 拿到老师的index
    // var index = e.target.dataset.index; // 拿到当前课程 的index
    wx.showModal({
      content: '确认账单？',
      success(e) {
        if (e.confirm) {
          var date = app.globalData.historyOrder
          date.push(app.globalData.ingOrder[index])
          app.globalData.ingOrder.splice(index,1)
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
     wx.connectSocket({
       url: 'ws://10.0.100.30:8090/websocket/24'
     })
     wx.onSocketOpen(function (res) {
       
     })  
    var myThis = this;
    wx.onSocketMessage(function (res) {
      var message = JSON.parse(res.data)
      app.globalData.ingOrder.push(message[0])
      message = app.globalData.ingOrder;
    // var index_five = [{
    //   status: "正在进行",
    //   list: 
    // }]
    console.log(message)
    if(message.length==0){
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
        title: '你收到来自服务器的消息',
        icon: 'none',
        duration: 2000
      })
    })
  },
  onShow:function(){
    //订单数据
    // var message = wx.getStorageSync("info");
    // // var index_five = [{
    // //   status: "正在进行",
    // //   list: 
    // // }]
    // console.log(message)
    // if(message==""){
    //     return
    // }
    // this.setData({
    //   index_five: JSON.parse(message)
    // })
    // var info = this.data.info
    // for (var i = 0; i < this.data.index_five.length; i++) {
    //   for (var j = 0; j < this.data.index_five[i].list.length; j++) { }
    //   info.push({})
    //   console.log(info[i])
    // }

    // var isWho = "";
    // if (this.data.index_five[0].list.length == 0) {
    //   isWho = "one"
    // } else {
    //   isWho = "else"
    // }
    // var up = "order[0].isSelect";
    // this.setData({
    //   info,
    //   isWho: isWho,
    //   [up]: true,
    //   index: 0
    // })
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