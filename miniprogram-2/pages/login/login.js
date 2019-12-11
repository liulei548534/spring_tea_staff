// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel: '',
    pwd: '',
    telinput: false,
    pwdinput: false,
    disabled: false
  },
  //手机号密码输入完成按钮
  telinput: function(e) {
    this.setData({
      no: e.detail.value
    });
    this.setData({
      telinput: true
    });
    if (this.data.telinput == true && this.data.pwdinput == true) {
      this.setData({
        disabled: false
      });
    }
  },
  pwdinput: function(e) {
    this.setData({
      pwd: e.detail.value
    });
    this.setData({
      pwdinput: true
    });
    if (this.data.telinput == true && this.data.pwdinput == true) {
      this.setData({
        disabled: false
      });
    }
  },
  formSubmit: function(e) {
    console.log(e)
    var tel = e.detail.value.tel
    var pwd = e.detail.value.pwd
    console.log("点击按钮" + "获取到用户名：" +tel  + "获取到密码：" + pwd);
    wx.request({
      url: 'http://localhost:8080/login',
      data: {
        tel:tel,
        pwd:pwd,
      },
      // method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        // 'content-type': 'application/json'
        "content": "application/x-www-from-urlencoded"
      }, // 设置请求的 header
      success: function(res) {
        console.log("回调函数：" + res.data)
        if (res.data == true) {
          wx.showToast({
            title: "登录成功",
            icon: 'success',
            duration: 2000,
          })
          setTimeout(function() {
            wx.switchTab({
              url: '../user/user',
            })
          }, 2000)
        } else {
          wx.showToast({
            title: '登录失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {//手机号密码输入完成按钮
    if (this.data.tel == '' || this.data.pwd == '') {
      this.setData({
        disabled: true
      });
    } else {
      this.setData({
        disabled: false
      });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})