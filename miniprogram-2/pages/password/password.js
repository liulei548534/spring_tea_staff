// pages/password/password.js
Page({

    /**
     * 页面的初始数据
     */
    data: {},
    cal: function (e) {
        this.setData({
            flag: e.detail.value.input11,
        })


        var in11 = parseFloat(this.data.flag);

        var m2 = this.dd();//计算所得税，比较麻烦。
        this.setData({
            incomeTax: m2
        })
    },
    dd: function () {
        return 5;
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