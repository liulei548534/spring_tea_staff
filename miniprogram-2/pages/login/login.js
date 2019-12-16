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
    var that = this
    var tel = e.detail.value.tel
    var pwd = e.detail.value.pwd
    wx.request({
      url: 'http://10.0.100.30:8095/staClient/login',
      data: {
        tel:tel,
        pwd:pwd,
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        if (res.data == true) {
          wx.clearStorage("flag")
          wx.setStorageSync("username",tel)
          wx.switchTab({
            url: '../user/user',
          })
        } else {
          wx.showToast({
            title: '登录失败',
            icon: 'none',
            duration: 2000
          })
          that.setData({
            pwd: '',
          })
        }
      }
    })
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
  }
})