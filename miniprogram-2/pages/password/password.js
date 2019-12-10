// pages/password/password.js
Page({


  /**
   * 页面的初始数据
   */
  data: {
    send: false,
    alreadySend: false,
    second: 60,
    // buttonType: 'default',
    number: '',
    code: '',

    pwd: '',
    pwds: '',
    codeinput: false,
    pwdinput: false,
    pwdsinput: false,
    disabled: true
  },
  cal: function(e) {
    this.setData({
      flag: e.detail.value.input11,
    })
    var in11 = parseFloat(this.data.flag);

    var m2 = this.dd(); //计算所得税，比较麻烦。
    this.setData({
      incomeTax: m2
    })
  },
  dd: function() {
    return 5;
  },

  //手机号输入是否规范
  telinput: function(e) {
    var number = e.detail.value
    console.log(number)
    if (number.length === 11) {
      let numberCh = this.phoneNumber(number)
      console.log(numberCh)
      if (numberCh) {
        this.setData({
          number: number
        })
        console.log('number' + this.data.number)
        this.showSend()
        this.activeButton()
      }
    } else {
      this.setData({
        number: ''
      })
      this.hideSend()
    }
  },
  phoneNumber: function(number) {
    let str = /^1\d{10}$/
    if (str.test(number)) {
      return true
    } else {
      wx.showToast({
        title: '请规范输入',
        image: '../../icons/clock.png'
      })
      return false
    }
  },
  showSend: function () {//输完显示发送
    if (!this.data.alreadySend) {
      this.setData({
        send: true
      })
    }
  },

  hideSend: function () {
    this.setData({
      send: false,
      disabled: true,
      buttonType: 'default'
    })
  },
  // 验证码
  codeinput: function (e) {
    this.setData({
      code: e.detail.value
    })
    this.activeButton()
    console.log('code' + this.data.code)
  },

  // 按钮
  activeButton: function () {
    let { number, code } = this.data
    console.log(code)
    if (number && code) {
      this.setData({
        disabled: false,
        buttonType: 'primary'
      })
    } else {
      this.setData({
        disabled: true,
        buttonType: 'default'
      })
    }
  },
  //发送验证码
  send: function() {
    var number = this.data.number
    var sessionId = wx.getStorageSync('sessionId')
    console.log(number);
    wx.request({
      url: 'http://localhost:8080/sendSms',
      data: {
        number: number
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": sessionId
      },
      // method: 'POST',
      success: function(res) {
        console.log(res)
      }
    })
    this.setData({
      alreadySend: true,
      send: false
    })
    this.timer()
  },
  //显示时间
  timer: function () {
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
        () => {
          this.setData({
            second: this.data.second - 1
          })
          if (this.data.second <= 0) {
            this.setData({
              second: 60,
              alreadySend: false,
              send: true
            })
            resolve(setTimer)
          }
        }
        , 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
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
  onShow: function() {

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