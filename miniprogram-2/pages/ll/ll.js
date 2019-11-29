const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // indexs用来 存放传入过来的索引值
        indexs: [-4],
        details: [],
        iscart: false,
        hidden: null,
        num: '',
        totalMoney: 0,
        isAllSelect: false,
    },
    /*获取传入购物车的商品*/
    getPorduct() {
        var details = app.globalData.index
        console.log(details)
        if (details.length > 0) {
            this.setData({
                details,
                hidden: false,
                iscart: true,
            })
        } else {
            this.setData({
                hidden: true,
                iscart: false,
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.connect()
    },
    connect() {
        var myThis = this;
        wx.connectSocket({
            url: 'ws://localhost:9090/websocket/12'
        })
        wx.onSocketOpen(function (res) {
            console.log("连接服务器成功")
        })
    },
    close() {
        var myThis = this;
        wx.closeSocket()
        wx.onSocketClose(function (res) {
            myThis.setData({
                status: "websocket服务器已经断开"
            })
        })
    },
    send() {
        var myThis = this;
        console.log(this.data.details)
        var date = JSON.stringify(this.data.details)
        console.log(date)
        wx.sendSocketMessage({
            data: date,
            success: function (res) {
                console.log("发送信息")
                wx.showToast({
                    title: '已发送',
                    icon: 'success',
                    duration: 1000
                })
            },
            fail: function (res) {
                console.log("请连接服务器")
            }
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
        this.getPorduct();
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

    },
    //增加商品数量
    addClick: function (event) {
        let index = event.currentTarget.dataset;
        var num = this.data.details[index.index].num;
        // 总数量-1  
        if (num < 50) {
            this.data.details[index.index].num++;
        }
        var up = "details[" + index.index + "].num";
        // 将数值与状态写回  
        this.setData({
            [up]: this.data.details[index.index].num++
        });
    },
    //减少商品数量
    delClick: function (event) {
        let index = event.currentTarget.dataset;
        var num = this.data.details[index.index].num;
        // 商品总数量-1
        if (num > 0) {
            this.data.details[index.index].num--;
        }
        // 将数值与状态写回  
        //拼接
        var up = "details[" + index.index + "].num";
        this.setData({
            [up]: this.data.details[index.index].num--
        });
    },
    //勾选事件处理函数  
    switchSelect: function (e) {
        // 获取item项的id，和数组的下标值  
        var Allprice = 0, i = 0;
        let id = e.target.dataset.id,
            index = parseInt(e.target.dataset.index);
        console.log(index)
        this.data.details[index].isSelect = !this.data.details[index].isSelect;
        //价钱统计
        if (this.data.details[index].isSelect) {
            this.data.totalMoney = this.data.totalMoney + (this.data.details[index].price * this.data.details[index].num);
        } else {
            this.data.totalMoney = this.data.totalMoney - (this.data.details[index].price * this.data.details[index].num);
        }
        //是否全选判断
        for (i = 0; i < this.data.details.length; i++) {
            Allprice = Allprice + (this.data.details[i].price * this.data.details[i].num);
        }
        console.log(Allprice)
        if (Allprice == this.data.totalMoney) {
            this.data.isAllSelect = true;
        } else {
            this.data.isAllSelect = false;
        }
        this.setData({
            details: this.data.details,
            totalMoney: this.data.totalMoney,
            isAllSelect: this.data.isAllSelect
        })
    },
    //全选
    allSelect: function (e) {
        //处理全选逻辑
        // var details = this.data.details
        // var isAllSelect = this.data.isAllSelect

        // if(isAllSelect==false){
        //   details.forEach((v,i)=>true?(v.isSelect=true)&(isAllSelect=true):"")
        // }else{
        //   details.forEach((v,i)=>true?(v.isSelect=false)&(isAllSelect=false):"")
        //   this.data.totalMoney = 0;
        // }

        let i = 0;
        if (!this.data.isAllSelect) {
            this.data.totalMoney = 0;
            for (i = 0; i < this.data.details.length; i++) {
                this.data.details[i].isSelect = true;
                this.data.totalMoney = this.data.totalMoney + (this.data.details[i].price * this.data.details[i].num);
                console.log(this.data.totalMoney)
            }
        } else {
            for (i = 0; i < this.data.details.length; i++) {
                this.data.details[i].isSelect = false;
            }
            this.data.totalMoney = 0;
        }
        this.setData({
            details: this.data.details,
            isAllSelect: !this.data.isAllSelect,
            totalMoney: this.data.totalMoney,
        })
    },
    // 去结算
    toBuy() {
        wx.showToast({
            title: '去结算',
            icon: 'success',
            duration: 1500
        });
        this.setData({
            showDialog: !this.data.showDialog
        });
    },
    delimg(e) {
        var num = e.currentTarget.dataset.index;
        var nums = num;
        var details = this.data.details;
        console.log("num:" + num)
        var leng = details.length
        for (var i = 0; i < leng; i++) {
            console.log("leng:" + leng)
            if (i === num) {
                // 利用该方法来删除数组中元素（根据数据下标进行删除，1参数为删除几个）
                details.splice(i, 1)
                num = -1;
                console.log(num)
            }
        }

        //  details.forEach((v,i)=>i===num?details.splice(num):"")
        // details.splice(num)
        var indexs = this.data.indexs;
        // indexs.forEach((v,i)=>i===num+1?indexs.splice(num+1):"")
        for (var i = 0; i < indexs.length; i++) {
            if (i === nums + 1) {
                indexs.splice(nums + 1, 1)
                nums = -1;
            }
        }
        // indexs.splice(num+1)
        this.setData({
            details,
            indexs
        })
        if (details.length <= 0) {
            this.setData({
                hidden: true,
                iscart: false,
            })
        }
    },

})