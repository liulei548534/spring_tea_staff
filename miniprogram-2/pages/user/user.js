// pages/user/user.js
var myDate = new Date();
var status = true;
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false,
        currenH: '',
        currenTime: '',
        status: status　　　　　　　　　　　　 //data里面的属性可以传递到视图
    },
    //触发toast
    toastShow: function (e) {
        if(app.globalData.num<500){
            console.log("触发点击事件，弹出toast")
            status = false
        }else{
            console.log("距离太远，打卡失败")
            status = true
        }
        this.setData({ status: status })　　　　 //setData方法可以建立新的data属性，从而起到跟视图实时同步的效果
    },
    toastHide: function (e) {
        console.log("触发bindchange，隐藏toast")
        status = true
        this.setData({ status: status })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
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
        this.setData({
            currenH: year + "/" + month + '/' + day,
            currenTime: hours +":"+ minute,
            show: true
        })
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
        console.log("刷新")
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