// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    nameinput: false,
    pwdinput: false,
    disabled: false
  },
  nameinput: function (e) {
    this.setData({
      username: e.detail.value
    });
    // this.setData({
    //   nameinput: true
    // });
    // if(this.data.nameinput ==true && this.data.pwdinput ==true){
    //   this.setData({
    //     disabled: false
    //   })
    // }
  },
  pwdinput: function (e) {
    this.setData({
      password: e.detail.value
    });
    // this.setData({
    //   pwdinput: true
    // });
    // if(this.data.nameinput ==true && this.data.pwdinput ==true){
    //   this.setData({
    //     disabled: false
    //   })
    // }
  },
  submit_button: function () {
    console.log("点击按钮" + "获取到用户名：" + this.setData.username + "获取到密码：" + this.setData.password);
    wx.request({
      url: 'https://localhost:8080/login',
      data: {
        username: this.data.nameinput,
        password: this.data.pwdinput,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "context": "application/x-www-from-urlencoded"
      }, // 设置请求的 header
      success: function (res) {
        success
        console.log("回调函数：" + res.data)
        var resData = res.data;
        if (resData == true) {
          wx.showToast({//显示消息提示框
            title: "登录成功！",
            duration: 2000 //显示时限
          })
        } else {
          wx.showToast({
            title: "登录失败！",
            duration: 2000
          })
        }
      },
      fail: function (res) {
        // fail
        console.log("fail",res)
      },
      complete: function () {
        // complete
        console.log("complete",res)
      }
    })
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
  if (this.data.username == '' || this.data.password == '') {
    this.setData({ disabled: true });
  } else {
    this.setData({ disabled: false });
  }
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