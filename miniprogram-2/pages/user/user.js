// pages/user/user.js
var myDate = new Date();
var status = true;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count:0,
    show: false,
    currenH: '',
    currenTime: '',
    status: status,
    　　　　　　　　　　　　 //data里面的属性可以传递到视图
    info: "",
    num: 0
  },
  //触发toast
  toastShow: function(e) {
    var that = this
    wx.getLocation({
      type: 'gcj02',
      asnc:false,
      altitude: false,
      success: (result) => {
        const latitude1 = result.latitude
        const longitude1 = result.longitude
        console.log(longitude1 + "-----" + latitude1)
        const latitude2 = 30.61859;
        const longitude2 = 104.06776;
        var EARTH_RADIUS = 6378.137; //地球半径
        var num = getDistance(longitude1, latitude1, longitude2, latitude2)

        function rad(d) {
          return d * Math.PI / 180.0;
        }

        function getDistance(lng1, lat1, lng2, lat2) {
          var radLat1 = rad(lat1);
          var radLat2 = rad(lat2);
          var a = radLat1 - radLat2;
          var b = rad(lng1) - rad(lng2);
          var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) * Math.cos(radLat2) *
            Math.pow(Math.sin(b / 2), 2)));
          s = s * EARTH_RADIUS;
          s = Math.round(s * 10000) / 10000;
          return s;
        }
        console.log(num * 2000)
        num = num * 2000
        that.setData({
          num:num
        })
      },
      fail: () => {},
      complete: () => {
        var count = that.data.count
        if (count>0){
          info = "您已经打过卡了"
        }else if (this.data.num < 10000000) {
          count=0
          count = count + 1
          var info = "打卡成功"
          var date = new Date()
          wx.request({
            url: 'http://10.0.100.30:8095/client/checkIn/check/',
            data:{
              time: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() + 1),
              username:wx.getStorageSync("username")
            },
            success:function(e){
              console.log("打卡成功")
            },
            fail:function(e){
              console.log("打卡失败")
            }
          })
        } else {
          count = 0
          var info = "距离太远，打卡失败"
        }
        that.setData({
          status: false,
          info,
          count
        })　　　　 //setData方法可以建立新的data属性，从而起到跟视图实时同步的效果
      }
    });
  },
  toastHide: function(e) {
    console.log(this.data.status + "===" + this.data.info + "==" + this.data.num)
    console.log("触发bindchange，隐藏toast")
    status = true
    this.setData({
      status: status
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var year = myDate.getFullYear()
    var month = (myDate.getMonth() + 1)
    var day = myDate.getDate()
    if (month < 10) {
      month = '0' + month
    }
    if (day < 10) {
      day = '0' + day
    }
    var hours = myDate.getHours()
    var minute = myDate.getMinutes()
    if (hours < 10) {
      hours = "0" + hours
    }
    if (minute < 10) {
      minute = '0' + minute
    }
    //向后台请求员工信息，并保存在缓存
    wx.request({
      url: 'http://10.0.100.30:8095/staClient/selectInfo',

    data:{
       name:'liulei',
       telephone:'13458552184'   
    },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.userInfo)
        wx.setStorageSync("uIfo", res.data.userInfo)
      }
    })
    this.setData({
      currenH: year + "/" + month + '/' + day,
      currenTime: hours + ":" + minute,
      show: true
    })
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

  },
  //库存查询跳转
  kucunClick:function(){
    wx.navigateTo({
      url: '../warehouse/warehouse',
    })
  },
  //密码修改跳转
  updateClick: function () {
    wx.navigateTo({
      url: '../info/info',
    })
  },
   //假期查询跳转
  dayClick: function () {
    wx.navigateTo({
      url: '../vacation/vacation',
    })
  },
   //工资查询跳转
  moneyClick: function () {
    wx.navigateTo({
      url: '../wages/wages',
    })
  },

})