Page({
    data: {
        status: ""
    },
    connect() {
        var myThis = this;
        wx.connectSocket({
            url: 'ws://10.0.100.3:9090/websocket/24'
        })
        wx.onSocketOpen(function (res) {
            myThis.setData({
                status: "websocket连接服务器成功"
            })
        })
    },
    close() {
        var myThis = this;
        wx.closeSocket()
        wx.onSocketClose(function (res) {
            myThis.setData({
                status: "websocket服务器已经断开"
            })
        })
    },
    send() {
        var myThis = this;
        wx.sendSocketMessage({
            data: myThis.data.status,
            success: function (res) {
                console.log("发送信息")
                console.log(myThis.data.status)
                wx.showToast({
                    title: '已发送',
                    icon: 'success',
                    duration: 1000
                })
            },
            fail: function (res) {
                myThis.setData({
                    status: "请连接服务器"
                })
            }
        })
    },
    input: function (e) {
        this.inputValue = e.detail.value
    },
    onLoad: function (options) {
        var myThis = this;
        wx.onSocketMessage(function (res) {
            myThis.setData({
                message: res.data
            })
            wx.showToast({
                title: '你收到来自服务器的消息',
                icon: 'none',
                duration: 2000
            })
        })
    },
})
