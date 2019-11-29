var id;
Page({
    data: {
        selects: [
            {name: '已上', isSelect: false},
            {name: '催单', isSelect: false},
            {name: '退单', isSelect: false}
        ],
        //每点击不显示
        showModal: false,
        isFinish: "正在进行",
        order: [{
            id: 0,
            name: "正在进行",
            funName: "on_ing",
            isSelect: false
        }, {
            id: 1,
            name: "已完成",
            funName: "on_ed",
            isSelect: false
        }],
        index: "",
        isWho: "",
        info: [],
        count: 3,
        num: "",
        price: "",
        bussness: [{
            functionName: "showAll"
        }],
        index_five: [{
            id: 0,
            status: "正在进行",
            list: [{
                id: 0,
                name: "红糖糍粑",
                price: 45,
                unm: 3
                // }, {
                //     id: 1,
                //     name: "222",
                //     price: 55,
                //     unm: 55
            },
            ]
        },],
        sec: [
            {isSelect: false}
        ]
    },
    chang: function (e) {
        var index = e.currentTarget.dataset.index
        var data = this.data.sec
        if (data[index].isSelect) {
            data.forEach((v, i) => i === index ? v.isSelect = true : ""
        )
        }
        this.setData({
            sec: data
        })
    },
    /**
     * 用户点击Button,字体变色.
     */
    changeColor: function (e) {
        var index = e.currentTarget.dataset.index
        var data = this.data.selects
        if (!data[index].isSelect) {
            data.forEach((v, i) => i === index ? v.isSelect = true : ""
        )
        } else {
            data.forEach((v, i) => i === index ? v.isSelect = false : ""
        )
        }
        // 设置数据
        this.setData({
            selects: data
        })
    },
    //弹框
    yes: function () {
        this.setData({
            showModal: true
        })
    },

    good: function () {
        this.setData({
            showModal: false
        })
    },

})