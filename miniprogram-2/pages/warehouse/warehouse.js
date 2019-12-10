// pages/warehouse/warehouse.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isSelect: false,
        tablist: [{
            id: "1",
            name: '→商品←',
            t: '绿茶',
            y: '25',
            u: '112',
            isSelect: true
        },
            {
                id: "2",
                name: '→小吃←',
                t: '瓜子',
                y: '22',
                u: '11',
                isSelect: false
            },
        ],
        bechoice: 1,
        content: '',
    },
    /**
     * item点击事件
     */
    choiceType: function (event) {
        console.log(event);
        var id = event.currentTarget.dataset.item.id;
        var curIndex = 0;
        for (var i = 0; i < this.data.tablist.length; i++) {
            if (id == this.data.tablist[i].id) {
                this.data.tablist[i].isSelect = true;
                curIndex = i;
            } else {
                this.data.tablist[i].isSelect = false;
            }
        }

        this.setData({
            content: this.data.tablist[curIndex].t,
            money: this.data.tablist[curIndex].y,
            nuber: this.data.tablist[curIndex].u,
            tablist: this.data.tablist,
        });
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