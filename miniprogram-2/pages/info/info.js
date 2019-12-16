
Page({
  data: {
    send: false,
    alreadySend: false,
    second: 60,
    disabled: true,
    telephone: '',
    code: '',
    yzmInfo: '',
    otherNewInfo1:'',
    otherNewInfo2:''
  },
  //1. 手机号部分
  //验证手机号长度
  inputPhoneNum: function (e) {
    let phoneNum = e.detail.value
    if (phoneNum.length === 11) {
      let checkedNum = this.checkPhoneNum(phoneNum)
      if (checkedNum) {
        this.setData({
          telephone: phoneNum
        })
        this.showSendMsg()
        this.activeButton()
      }
    } else {
      this.setData({
        phoneNum: ''
      })
      this.hideSendMsg()
    }
  },
//2.手机号验证是否正确
  checkPhoneNum: function (phoneNum) {
    let str = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/
    if (str.test(phoneNum)) {
      return true
    } else {
      wx.showToast({
        title: '手机号不正确',
        image: '../../images/fail.png'
      })
      return false
    }
  },
  showSendMsg: function () {
    if (!this.data.alreadySend) {
      this.setData({
        send: true
      })
    }
  },
  hideSendMsg: function () {
    this.setData({
      send: false,
      disabled: true,
      buttonType: 'default'
    })
  },
  //3.发送验证码 手机获取短信验证码
  sendMsg: function () {
    var that = this
    var phoneNum =that.data.telephone;
    wx.request({
      url:'http://10.0.100.30:8095/staClient/getYzm',
      data: {
        telephone:phoneNum
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: 'POST',
      success: function (res) {
        if(res.data=='fail'){
          wx.showModal({
            title: '错误提示',
            content: '手机号不正确，请在1分钟后输入本人正确的手机号码',
          })
          that.data.yzmInfo = ''
          return;
        }else{
          console.log(res.data.dx_yzm)
          that.data.yzmInfo = res.data.dx_yzm
        }
      }
    })
    this.setData({
      alreadySend: true,
      send: false,
      
    })
    //执行定时器方法
    this.timer()
  },
  // 4.验证码
  addCode: function (e) {
    //验证码通过
    if (e.detail.value == this.data.yzmInfo & this.data.yzmInfo!=''){
      wx.showToast({
        title: 'success',
      })
      this.setData({
        code: e.detail.value
      })
      //验证码不通过
    } else if (e.detail.value != this.data.yzmInfo & this.data.yzmInfo != ''){
      wx.showModal({
        title: '验证码错误',
        content: '请重新输入验证码',
      })
      this.setData({
        code: ''
      })
    }
  },
  //5. 新密码部分
  addOtherInfo1: function (e) {
    this.setData({
      otherNewInfo1: e.detail.value
    })
  },
  addOtherInfo2: function (e) {
    this.setData({
      otherNewInfo2: e.detail.value
    })
    if (this.data.otherNewInfo1 != e.detail.value) {
      wx.showModal({
        title: '错误提示',
        content: '两次密码不一致，请重新输入',
      })
      this.setData({
        otherNewInfo1: '',
        otherNewInfo2: ''
      })
    }
  },

  //6.密码修改提交
  onSubmit: function () {
    var newPwd1 = this.data.otherNewInfo1
    var newPwd2 = this.data.otherNewInfo2
    var phone = this.data.telephone
    var code = this.data.code
    var yzm = this.data.yzmInfo
    if (newPwd1 == newPwd2&phone!=''&code==yzm){
        wx.request({
          url: 'http://10.0.100.30:8095/staClient/update_pwd',
          data:{
            telephone: phone,
            newPassword:newPwd2
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          method: 'POST',
          success: function (res) {
             if(res.data==true){
               wx.navigateTo({
                 url: '../login/login',
               })
             }else{
               wx.navigateTo({
                 url: '../info/info',
               })
             }
          }
        })  
     }else{
       wx.showModal({
         title: '提交提示',
         content: '更改信息错误，请重新操作',
       })
     }
  },



// 
  //定时器
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


// 按钮
activeButton: function () {
  let { phoneNum, code, otherNewInfo1, otherNewInfo2 } = this.data
  console.log(code)
  if (phoneNum && code && otherNewInfo1 && otherNewInfo2) {
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
}

})