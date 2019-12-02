//app.js
App({

    /**
     * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
     */
    onLaunch: function () {
        // var that = this
        // wx.getLocation({
        //     type: 'gcj02',
        //     altitude: false,
        //     success: (result) => {
        //         const latitude1 = result.latitude
        //         const longitude1 = result.longitude
        //         console.log(longitude1 + "-----" + latitude1)
        //         const latitude2 = 30.61859;
        //         const longitude2 = 104.06776;
        //         var EARTH_RADIUS = 6378.137; //地球半径

        //         var num = getDistance(longitude1, latitude1, longitude2, latitude2)

        //         function rad(d) {
        //             return d * Math.PI / 180.0;
        //         }
        //         function getDistance(lng1, lat1, lng2, lat2) {
        //             var radLat1 = rad(lat1);
        //             var radLat2 = rad(lat2);
        //             var a = radLat1 - radLat2;
        //             var b = rad(lng1) - rad(lng2);
        //             var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)
        //                 + Math.cos(radLat1) * Math.cos(radLat2)
        //                 * Math.pow(Math.sin(b / 2), 2)));
        //             s = s * EARTH_RADIUS;
        //             s = Math.round(s * 10000) / 10000;
        //             return s;
        //         }
        //         console.log(num * 2000)
        //         that.globalData.num=num*2000
        //         // wx.openLocation({
        //         //     latitude:latitude1,
        //         //     longitude:longitude1,
        //         //     scale: 18
        //         //   })
        //         // wx.chooseLocation({
        //         //     latitude: latitude1,
        //         //     longitude: longitude1,
        //         //     scale: 18,
        //         //     success: (result) => {
        //         //         console.log(result)
        //         //     }
        //         // })
        //     },
        //     fail: () => { },
        //     complete: () => { }
        // });
    },

    /**
     * 当小程序启动，或从后台进入前台显示，会触发 onShow
     */
    onShow: function (options) {

    },

    /**
     * 当小程序从前台进入后台，会触发 onHide
     */
    onHide: function () {

    },

    /**
     * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
     */
    onError: function (msg) {

    },
    globalData: {
        num: ''
    },
})
