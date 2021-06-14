const db = wx.cloud.database(); // 初始化数据库
var util = require('../utils/utils.js');
Page({
  data: {
    index: '',
    currentYear: 1900,
    currentMonth: 1,
    currentDay: 1,
    stepsActiveIndex: 0,
    status_array: ['笔试', '一面', '二面', '三面', '四面', 'hr面', 'Offer Get!'],
    date: '',
    company: '',
    position: '',
    status: '',
    date_time: '',
    message: '',
    bishi_id: 0,
    yimian_id: 1,
    ermian_id: 2,
    sanmian_id: 3,
    simian_id: 4,
    hrmian_id: 5,
    OfferGet_id: 6,
    bishi_date: '2022-01-01',
    yimian_date: '2022-01-01',
    ermian_date: '2022-01-01',
    sanmian_date: '2022-01-01',
    simian_date: '2022-01-01',
    hrmian_date: '2022-01-01',
    OfferGet_date: '2022-01-01',
    status_index: 0,
    _id: '',
  },

  bindStatusPickerChange: function (e) {
    console.log('status发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },


  bindDateChange: function (e) {
    console.log('date发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  bindBiShiDateChange: function (e) {
    console.log('笔试date发送选择改变，携带值为', e.detail.value)
    this.setData({
      bishi_date: e.detail.value
    })
  },

  bindYiMianDateChange: function (e) {
    console.log('一面date发送选择改变，携带值为', e.detail.value)
    this.setData({
      yimian_date: e.detail.value
    })
  },

  bindErMianDateChange: function (e) {
    console.log('二面date发送选择改变，携带值为', e.detail.value)
    this.setData({
      ermian_date: e.detail.value
    })
  },

  bindSanMianDateChange: function (e) {
    console.log('三面date发送选择改变，携带值为', e.detail.value)
    this.setData({
      sanmian_date: e.detail.value
    })
  },

  bindSiMianDateChange: function (e) {
    console.log('四面date发送选择改变，携带值为', e.detail.value)
    this.setData({
      simian_date: e.detail.value
    })
  },

  bindHrMianDateChange: function (e) {
    console.log('hr面试date发送选择改变，携带值为', e.detail.value)
    this.setData({
      hrmian_date: e.detail.value
    })
  },

  bindOfferGetDateChange: function (e) {
    console.log('OfferGetdate发送选择改变，携带值为', e.detail.value)
    this.setData({
      OfferGet_date: e.detail.value
    })
  },

  onCompanyChange(event) {
    // event.detail 为当前输入的值
    console.log(event);
    this.data.company = event.detail;
    console.log(this.data.company);
  },

  onPositionChange(event) {
    // event.detail 为当前输入的值
    console.log(event);
    this.data.position = event.detail;
    console.log(this.data.position);
  },

  onStatusChange(event) {
    // event.detail 为当前输入的值
    console.log(event);
    this.data.status = event.detail;
    console.log(this.data.status);
  },

  onDateTimeChange(event) {
    // event.detail 为当前输入的值
    console.log(event);
    this.data.date_time = event.detail;
    console.log(this.data.date_time);
  },

  onMessageChange(event) {
    // event.detail 为当前输入的值
    console.log(event);
    this.data.message = event.detail;
    console.log(this.data.company);
  },

  saveOfferInformation: function () {
    var currentDay = this.data.currentDay;
    var currentMonth = this.data.currentMonth;
    var currentYear = this.data.currentYear;
    var currentDate = currentYear+"-"+currentMonth+"-"+currentDay;
    console.log("currentday:"+currentDate);

    if(util.compareDate(this.data.OfferGet_date,currentDate)){
      console.log("OfferGet_date——"+OfferGet_date+" 的日期小于 "+ currentDate);
      this.setData({
        stepsActiveIndex:6,
        status_index:6,
      })
    }
    else if(util.compareDate(this.data.hrmian_date,currentDate)){
      this.setData({
        stepsActiveIndex:5,
        status_index:5,
      })
    }else if(util.compareDate(this.data.simian_date,currentDate)){
      this.setData({
        stepsActiveIndex:4,
        status_index:4,
      })
    }else if(util.compareDate(this.data.sanmian_date,currentDate)){
      this.setData({
        stepsActiveIndex:3,
        status_index:3,
      })
    }else if(util.compareDate(this.data.ermian_date,currentDate)){
      this.setData({
        stepsActiveIndex:2,
        status_index:2,
      })
    }else if(util.compareDate(this.data.yimian_date,currentDate)){
      this.setData({
        stepsActiveIndex:1,
        status_index:1,
      })
    }else{
      this.setData({
        stepsActiveIndex:0,
        status_index:0,
      })
    }
    db.collection('offerinformations').add({
      data: {
        company: this.data.company,
        position: this.data.position,
        status: this.data.status,
        date_time: this.data.date_time,
        message: this.data.message,
        yimian_date: this.data.yimian_date,
        ermian_date: this.data.ermian_date,
        sanmian_date: this.data.sanmian_date,
        simian_date: this.data.simian_date,
        bishi_date: this.data.bishi_date,
        hrmian_date: this.data.hrmian_date,
        OfferGet_date: this.data.OfferGet_date,
        status_index:this.data.status_index,
      }
    }).then(res => {
      console.log(res);
      this.data.company = '';
      this.data.status = '';
      this.data.position = '';
      this.data.date_time = '';
      this.data.message = '';
      wx.showModal({
        content: '已保存 ^.^',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.switchTab({
              url: '../base/base',
            })
          }
        },
      })
    }).catch(err => {
      console.log(err);
    })
  },

  onShow: function (options) { //数据在options对象身上
    this.setData({
      company: this.data.company,
      position: this.data.position,
      status: this.data.status,
      date_time: this.data.date_time,
      message: this.data.message
    })
    console.log(this.data.company)
  },
});