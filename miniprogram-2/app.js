//app.js
App({

    /**
     * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
     */
    onLaunch: function () {
        var myThis = this;
        wx.connectSocket({
          url: 'ws://10.0.100.30:8090/websocket/24'
        })
        wx.onSocketOpen(function (res) {
          console.log("websocket连接服务器成功")
        })
    },

    /**
     * 当小程序启动，或从后台进入前台显示，会触发 onShow
     */
    onShow: function (options) {
      var myThis = this;
      wx.onSocketMessage(function (res) {
        console.log(res.data)
        myThis.globalData.message = res.data
        // console.log(myThis.globalData.message)
        wx.showToast({
          title: '你收到来自服务器的消息',
          icon: 'none',
          duration: 2000
        })
      })
      // console.log(myThis.globalData.message)
    },

    /**
     * 当小程序从前台进入后台，会触发 onHide
     */
    onHide: function () {

    },

    /**
     * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
     */
    onError: function (msg) {

    },
    globalData: {
        num: '',
        message:''
    },
})
