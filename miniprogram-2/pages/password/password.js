// pages/password/password.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    send: false,
    alreadySend: false,
    second: 60,
    buttonType: 'default',
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
    if (number.length === 11) {
      let numberCh = this.phoneNumber(number)
      if (numberCh) {
        this.setData({
          number: number
        })
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
  showSend: function() { //输完显示发送
    if (!this.data.alreadySend) {
      this.setData({
        send: true
      })
    }
  },

  hideSend: function() {
    this.setData({
      send: false,
      disabled: true,
      buttonType: 'default'
    })
  },
  // 验证码
  codeinput: function(e) {
    this.setData({
      code: e.detail.value
    })
    this.activeButton()
  },

  // 按钮
  activeButton: function() {
    let {
      number,
      code
    } = this.data
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
  //密码
  pwdinput: function(e) {
    this.setData({
      pwd:e.detail.value
    });
    this.setData({
      pwdinput:true
    })
    if(this.data.telinput==true&&this.data.send==true&&this.data.pwdinput==true){
      this.setData({
        disabled:false
      })
    }
  },

  //发送验证码
  send: function() {
    var number = this.data.number
    var sessionId = wx.getStorageSync('sessionId')
    wx.request({
      url: 'http://localhost:8080/sendSms',
      data: {
        tel: number
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": sessionId
      },
      // method: 'POST',
      success: function(res) {
      }
    })
    this.setData({
      alreadySend: true,
      send: false
    })
    this.timer()
  },
  //显示时间
  timer: function() {
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
        }, 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })
  },
  //验证码
  codeinput: function(e) {
    this.setData({
      code: e.detail.value
    })
    this.activeButton()
  },

  formSubmit:function(e){
    var tel=e.detail.value.tel
    var code = e.detail.value.code
    var pwd = e.detail.value.pwd
    var pwds = e.detail.value.pwds
    // var sessionId=this.data.sessionId;
    wx.request({
      url: 'http://localhost:8080/addTel',
      data: {
        tel: tel,
        code: code,
        pwd: pwd,
        pwds: pwds,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        // "Cookie": sessionId
      },
      // method: 'POST',
      success: function(res) {
        if((parseInt(res.statusCode)===200)&&res.data.massage==='pass'){
          wx.showToast({
            title: '验证成功',
            icon: 'success',
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../login/login',
            })
          }, 2000)
        }else{
          wx.showToast({
            title: "失败",
          })
        }
      },
      fail: function(res) {
      },
    })
  }
})