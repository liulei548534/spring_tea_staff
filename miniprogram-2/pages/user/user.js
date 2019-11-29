// pages/user/user.js
var myDate = new Date();
var status = true;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false,
        currenH: myDate.getFullYear() + '/' + (myDate.getMonth() + 1) + '/' + myDate.getDate(),
        currenTime: myDate.getHours() + ':' + myDate.getMinutes(),
        status: status　　　　　　　　　　　　 //data里面的属性可以传递到视图
    },
    //触发toast
    toastShow: function(e) {
        console.log("触发点击事件，弹出toast")
        status = false
        this.setData({ status: status })　　　　 //setData方法可以建立新的data属性，从而起到跟视图实时同步的效果
    },
    toastHide: function(e) {
        console.log("触发bindchange，隐藏toast")
        status = true
        this.setData({ status: status })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function() {
        this.setData({
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
        console.log("刷新")
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