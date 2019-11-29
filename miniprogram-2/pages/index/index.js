//index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //每点击不显示
        showModal: false,
        isFinish: "正在进行",
        order: [{
            id: 0,
            name: "正在进行",
            funName: "on_ing",
            isSelect: false
            // }, {
            //     id: 1,
            //     name: "空闲",
            //     funName: "on_ed",
            //     isSelect: false
        }],
        index: "",
        isWho: "",
        // 显示价格栏信息
        info: [],
        // 显示数量
        count: 3,
        // 包间名
        num: "",
        // 总价
        price: "",
        bussness: [{
            functionName: "showAll"
        }],
        index_five: [{
            id: 0,
            status: "正在进行",
            list: [{
                id: 0,
                image: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2582106591,114612560&fm=26&gp=0.jpg",
                name: "111",
                price: 45,
                data: "11:11"
            }, {
                id: 1,
                image: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2582106591,114612560&fm=26&gp=0.jpg",
                name: "222",
                price: 55,
                data: "12:11"
            },
            ]
        },],
        // yes_y: true,
    },
    shanchuTap: function (e) {
        // var that = this;
        // var groupIndex = e.target.dataset.groupindex; // 拿到老师的index
        // var index = e.target.dataset.index; // 拿到当前课程 的index
        wx.showModal({
            content: '确认账单？',
            success(e) {
                if (e.confirm) {
                    // var list2 = that.data.data[groupIndex].data;
                    // list2.splice(index, 1);
                    // var dataStatus = 'data[' + groupIndex + '].data';
                    // that.setData({
                    //     [dataStatus]: list2
                    // });
                } else if (e.cancel) {
                    console.log('取消')
                }
            }
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        var info = this.data.info
        for (var i = 0; i < this.data.index_five.length; i++) {
            for (var j = 0; j < this.data.index_five[i].list.length; j++) {
            }
            info.push({})
            console.log(info[i])
        }

        var isWho = "";
        if (this.data.index_five[0].list.length == 0) {
            isWho = "one"
        } else {
            isWho = "else"
        }
        var up = "order[0].isSelect";
        this.setData({
            info,
            isWho: isWho,
            [up]: true,
            index: 0
        })
    },

    on_ing: function (e) {
        var index = e.currentTarget.dataset.index;
        let list = this.data.order;
        list.forEach((v,i)=>i===index?v.isSelect = true:v.isSelect = false)
        this.setData({
            isFinish: "正在进行",
            order: list,
            index: 0
        })
    },
})