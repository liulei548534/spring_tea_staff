// components/calendar/calendar.js
/**
 * 日历选择组件
 * 2018-03-04
 * mehaotian
 * github ：https://github.com/mehaotian
 */
Component({
  /**
   * 组件的属性列表
   * data [Date] 当前现实的月份
   * selected [Array] 所有被选择的天
   */
  properties: {
    date: {
      type: null,
      value: new Date()
    },
    selected: {
      type: Array,
      value: [],
      observer(newVal, oldVal) {
        this.getWeek(new Date())
      }
    },
    isOpen: {
      type: Boolean,
      value: false,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    allDate:"",
    ddd:"",
    calShow: true, // 日历组件是否打开
    dateShow: false, // 日期是否选择
    selectDay: '', // 当前选择日期
    canlender: {
      "weeks": []
    },
    isselect:[]
  },
  ready() {
    this.getWeek(new Date())
    if (this.data.isOpen) {
      this.setData({
        calShow: false,
        dateShow: true
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    dateSelection() {
      var that = this
      wx.request({
        url: 'http://10.0.100.30:8095/client/checkIn/selectByTelephone/',
        data:{
          username:wx.getStorageSync("username")
        },
        success:function(e){
          var allDate = e.data.checkIn
          console.log(allDate)
          var array = []
          allDate.forEach((v,i)=>true?array.push({
            year:v.checkInYear,
            month:v.checkInMonth,
            day:v.checkInDay.split(",")
          }):"")
          that.setData({
            allDate:array
          })
          if (array.length == 0){
          wx.showModal({
            title: '当前没有您的打卡信息',
            content: '',
          })
         }else{
           that.info(array)
         }
        }
      })
    },
    info:function(allData){
      var select_day = this.data.canlender.weeks
      var monthDate = this.data.selectDay.split("月")[0]
      var riqi = []
      allData[0].day.forEach((v, i) => true?riqi.push(parseInt(v)):"")
      if (monthDate === allData[0].month) {
        this.setData({
          isselect: riqi
        })
      }
      console.log(this.data.isselect)
      var ddd = this.data.ddd
      if (ddd == "") {
        var dateDate = new Date()
        ddd = dateDate.getFullYear() + "-" + (dateDate.getMonth() + 1) + "-" + dateDate.getDate()
      }
      this.getWeek(ddd)
      this.isSelect(ddd)
      // var new_array = 
      // console.log(new_array)

      if (this.data.isOpen) {
        return
      }
      let self = this;
      if (self.data.calShow) {
        self.setData({
          calShow: false
        }, () => {
          setTimeout(() => {
            self.setData({
              dateShow: true
            }, () => {
              self.triggerEvent('select', { ischeck: !self.data.calShow })
            })
          }, 100)
        })
      } else {
        self.setData({
          dateShow: false
        }, () => {
          setTimeout(() => {
            self.setData({
              calShow: true
            }, () => {
              self.triggerEvent('select', { ischeck: !self.data.calShow })
            })
          }, 300)
        })
      }
    },
    selectDay(e) {
      let index = e.currentTarget.dataset.index;
      let week = e.currentTarget.dataset.week;
      let ischeck = e.currentTarget.dataset.ischeck;
      let canlender = this.data.canlender;
      if (!ischeck) return false;
      let month = canlender.weeks[week][index].month < 10 ? "0" + canlender.weeks[week][index].month : canlender.weeks[week][index].month
      let date = canlender.weeks[week][index].date < 10 ? "0" + canlender.weeks[week][index].date : canlender.weeks[week][index].date
      this.getWeek(canlender.year + "-" + month + "-" + date);

    },
    packup() {
      let self = this;
      if (this.data.isOpen) {
        let year = self.data.canlender.year + "-" + self.data.canlender.month + "-" + self.data.canlender.date
       let  _date = self.getDate(year, 0); self
        self.getWeek(_date);
        return
      }
      self.setData({
        dateShow: false,
      }, () => {
        setTimeout(() => {
          self.setData({
            calShow: true
          }, () => {
            let year = self.data.canlender.year + "-" + self.data.canlender.month + "-" + self.data.canlender.date
            let _date = self.getDate(year, 0);
            self.getWeek(_date);
            self.triggerEvent('select', { ischeck: !self.data.calShow })
          })
        }, 300)
      })
    },
    // 返回今天
    backtoday() { this.getWeek(new Date()); },
    // 前一天|| 后一天
    dataBefor(e) {
      let num = 0;
      let types = e.currentTarget.dataset.type;

      if (e.currentTarget.dataset.id === "0") {
        num = -1;
      } else {
        num = 1
      }
      let year = this.data.canlender.year + "-" + this.data.canlender.month + "-" + this.data.canlender.date
      let _date = this.getDate(year, num, types === 'month' ? "month" : "day");
      console.log(_date)
      this.isSelect(_date)
      this.getWeek(_date);
      this.setData({
        ddd:_date
      })
    },
    // 获取日历内容
    getWeek(dateData) {
      let selected = this.data.selected
      let a = new Date()
      // console.log("im date ", a, typeof a === 'object')
      // 判断当前是 安卓还是ios ，传入不容的日期格式
      if (typeof dateData !== 'object') {
        dateData = dateData.replace(/-/g, "/")
      }
      let _date = new Date(dateData);
      let year = _date.getFullYear(); //年
      let month = _date.getMonth() + 1;  //月
      let date = _date.getDate();//日
      let day = _date.getDay();// 天
      let canlender = [];
      // console.log(selected)
      let dates = {
        firstDay: new Date(year, month - 1, 1).getDay(),
        lastMonthDays: [],// 上个月末尾几天
        currentMonthDys: [], // 本月天数
        nextMonthDays: [], // 下个月开始几天
        endDay: new Date(year, month, 0).getDay(),
        weeks: []
      }

      // 循环上个月末尾几天添加到数组
      for (let i = dates.firstDay; i > 0; i--) {
        dates.lastMonthDays.push({
          'date': new Date(year, month, -i).getDate() + '',
          'month': month - 1
        })
      }
      // 循环本月天数添加到数组
      for (let i = 1; i <= new Date(year, month, 0).getDate(); i++) {
        let have = false;
        let isSelect = false;
        for (let j = 0; j < selected.length; j++) {
          let selDate = selected[j].date.split('-');

          if (Number(year) === Number(selDate[0]) && Number(month) === Number(selDate[1]) && Number(i) === Number(selDate[2])) {
            have = true;
          }
        }
        for(let k = 0;k<this.data.isselect.length;k++){
          if (Number(i) === parseInt(this.data.isselect[k])){
            isSelect=true;
          }
        }
        dates.currentMonthDys.push({
          'date': i + "",
          'month': month,
          have,
          isSelect
        })
      }
      // 循环下个月开始几天 添加到数组
      for (let i = 1; i < 7 - dates.endDay; i++) {
        dates.nextMonthDays.push({
          'date': i + '',
          'month': month + 1
        })
      }

      canlender = canlender.concat(dates.lastMonthDays, dates.currentMonthDys, dates.nextMonthDays)
      // 拼接数组  上个月开始几天 + 本月天数+ 下个月开始几天
      for (let i = 0; i < canlender.length; i++) {
        if (i % 7 == 0) {
          dates.weeks[parseInt(i / 7)] = new Array(7);
        }
        dates.weeks[parseInt(i / 7)][i % 7] = canlender[i]
      }


      // 渲染数据
      this.setData({
        selectDay: month + "月" + date + "日",
        "canlender.weeks": dates.weeks,
        'canlender.month': month,
        'canlender.date': date,
        "canlender.day": day,
        'canlender.year': year,
      })
      month = month < 10 ? "0" + month : month
      date = date < 10 ? "0" + date : date
      this.triggerEvent('getdate', { year, month, date })
    },
    /**
     * 时间计算
     */
    getDate(date, AddDayCount, str = 'day') {
      if (typeof date !== 'object') {
        date = date.replace(/-/g, "/")
      }
      let dd = new Date(date)
      switch (str) {
        case 'day':
          dd.setDate(dd.getDate() + AddDayCount)// 获取AddDayCount天后的日期
          break;
        case 'month':
          dd.setMonth(dd.getMonth() + AddDayCount)// 获取AddDayCount天后的日期
          break;
        case 'year':
          dd.setFullYear(dd.getFullYear() + AddDayCount)// 获取AddDayCount天后的日期
          break;
      }
      let y = dd.getFullYear()
      let m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1)// 获取当前月份的日期，不足10补0
      let d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate()// 获取当前几号，不足10补0
      return y + '-' + m + '-' + d
    },
    isSelect: function (_date){
      console.log(this.data.isselect)
        var allDate = this.data.allDate
        console.log(allDate)
        var year = _date.split("-")[0]
        var month = _date.split("-")[1]
        var my_this = this
        var count=0
        console.log(allDate)
      allDate.forEach((v, i) => v.year == year ? (v.month == month ?my_this.setData({
          isselect:allDate[i].day
      })
      :count++):my_this.setData({
        isselect:[]
      }))
      if (count == allDate.length) {
          my_this.setData({
           isselect:[]
          })
      }
    }
   
  }
})
