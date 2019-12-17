// pages/vacation/vacation.js
Page({
    properties: {
        innerText: {
            type: String,
            value: 'dafault value',
        }
    },
    /**
     * 页面的初始数据
     */
    data: {
        ter: "",
        work: [
            {"jr": "元旦", "sj": "1-1", "ts": "1"},
            {"jr": "清明", "sj": "4-4", "ts": "3"},
            {"jr": "劳动", "sj": "5-1", "ts": "3"},
            {"jr": "端午", "sj": "7-1", "ts": "3"},
            {"jr": "国庆", "sj": "10-1", "ts": "5"}
        ],
        someData: {}
    },
    methods: {
        customMethod: function () {
        }
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
      //向缓存获取数据，找到需要的假期天数
      var userinfo = wx.getStorageSync("uIfo")
       var that = this
       that.setData({
         ter:userinfo.yearDay
       })
    }
})