const db = wx.cloud.database(); // 初始化数据库
var util = require('../utils/utils.js');
Page({
  data: {
    statusname: '',
    hiddenmodalput: true,
    statusdate: '请选择日期',
    currentYear: 1900,
    currentMonth: 1,
    currentDay: 1,
    priority: 3,
    stepsActiveIndex: -1,
    newestDate: '',
    priority_array: ['P0', 'P1', 'P2', 'P3'],
    status_array: ['递交简历', '笔试', '群面', '一轮面试', '二轮面试', '三轮面试', '四轮面试', '五轮面试', 'hr面', 'Offer Get!', '流程终止'],
    date: '2021-09-01',
    company: '腾讯',
    position: '后台开发',
    status: '二面',
    date_time: '2012-08-21',
    message: '嘻嘻嘻嘻嘻嘻嘻嘻嘻想',
    bishi_id: 0,
    yimian_id: 1,
    ermian_id: 2,
    sanmian_id: 3,
    simian_id: 4,
    hrmian_id: 5,
    OfferGet_id: 6,
    bishi_date: '2011-05-23',
    yimian_date: '2011-05-27',
    ermian_date: '2011-06-02',
    sanmian_date: '2011-06-15',
    simian_date: '2011-06-23',
    hrmian_date: '2011-06-25',
    OfferGet_date: '2011-06-25',
    status_index: '-1',
    _id: '',
    steplist: [{
      text: '笔试',
      desc: '2021-06-19'
    }, {
      text: '面试1',
      desc: '2021-06-20'
    }],
  },
  showModal: function (e) {
    this.setData({
      hiddenmodalput: false,
    })
  },
  cancelM: function (e) {
    this.setData({
      hiddenmodalput: true,
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      priority: e.detail.value
    })
    console.log('priority发送选择改变，携带值为', this.data.priority)
  },
  bindStatusPickerChange: function (e) {
    this.setData({
      status_index: e.detail.value
    })
    console.log('status_index发送选择改变，携带值为', this.data.status_index)
  },
  insert: function () {
    var steplist = this.data.steplist;
    steplist.push({
      text: this.data.status_array[this.data.status_index],
      desc: this.data.statusdate
    });
    this.setData({
      steplist: steplist,
      hiddenmodalput: true,
    });
    console.log(this.data.steplist);
  },

  delBind: function () {
    var steplist = this.data.steplist;
    console.log(steplist);
    steplist.pop(this.data.steplist.length);
    this.setData({
      steplist: steplist
    });
    console.log(steplist);
  },

  onStepListStatusChange: function (e) {
    this.setData({
      statusname: e.detail
    })
    console.log('statusname发送选择改变，携带值为', this.data.statusname)
  },

  bindDateChange: function (e) {
    console.log('date发送选择改变，携带值为', e.detail.value)
    this.setData({
      statusdate: e.detail.value
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
    this.data.company = event.detail.value;
    console.log(this.data.company);
  },

  onPositionChange(event) {
    // event.detail 为当前输入的值
    console.log(event);
    this.data.position = event.detail.value;
    console.log(this.data.position);
  },

  onMessageChange(event) {
    // event.detail 为当前输入的值
    console.log(event);
    this.data.message = event.detail.value;
    console.log(this.data.message);
  },
  onHomeButtom: function () {
    wx.switchTab({
      url: '../base/base',
    })
  },
  saveOfferInformation: function () {
    var steplist = this.data.steplist;

    var newestStatus = steplist[steplist.length - 1].text;

    var newestDate = steplist[steplist.length - 1].desc;

    console.log('newestStatus:', newestStatus)
    console.log('newestDate:', newestDate)
    db.collection('offerinformations')
      .doc(this.data._id)
      .update({
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
          status_index: this.data.status_index,
          stepsActiveIndex: this.data.stepsActiveIndex,
          steplist: this.data.steplist,
          newestStatus: newestStatus,
          priority: this.data.priority,
          newestDate: newestDate,
        }
      }).then(res => {
        console.log(res);
        var $data = this.data;
        var steplist = JSON.stringify($data.steplist);
        wx.showModal({
          content: '已保存 ^.^',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')

              // wx.redirectTo({
              //   url: '../showOffer/showOffer?company=' + $data.company + '&position=' + $data.position + '&status=' + $data.status + '&date_time=' + $data.date_time + '&message=' + $data.message + '&_id=' + $data._id + '&steplist=' + steplist + '&newestStatus=' + $data.newestStatus + '&priority=' + $data.priority + '&newestDate=' + $data.newestDate
              // })
              wx.switchTab({
                url: '../base/base',
              })
            }
          }
        })
      }).catch(err => {
        console.log(err);
      })
  },

  deleteOfferInformationConfirm: function () {
    wx.showModal({
      content: '确认删除吗？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.cloud.callFunction({
            name: 'batchDelete',
            data: {
              company: this.data.company,
              position: this.data.position,
              status: this.data.status,
              date_time: this.data.date_time,
              message: this.data.message
            }
          }).then(res => {
            console.log(res)
          }).catch(err => {
            console.error(err);
          });
          wx.switchTab({
            url: '../base/base',
          })
        }
      }
    })
  },

  deleteOfferInformation: function () {
    wx.showModal({
      content: '确认删除吗？',
      success: (res) => {
        if (res.confirm) {
          console.log('用户点击确定')
          db.collection('offerinformations')
            .doc(this.data._id)
            .remove().then(res => {
              console.log(res)
              wx.showModal({
                content: '已删除 ^.^',
                showCancel: false,
                success(res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    wx.switchTab({
                      url: '../base/base',
                    })
                  }
                }
              })
            }).catch(err => {
              console.error(err);
            });
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { //数据在options对象身上
    console.log(options)
    var myDate = new Date();
    var steplist = JSON.parse(options.steplist)
    this.setData({
      company: options.company,
      position: options.position,
      status: options.status,
      date_time: options.date_time,
      message: options.message,
      bishi_date: options.bishi_date,
      yimian_date: options.yimian_date,
      ermian_date: options.ermian_date,
      sanmian_date: options.sanmian_date,
      simian_date: options.simian_date,
      hrmian_date: options.hrmian_date,
      priority: options.priority,
      OfferGet_date: options.OfferGet_date,
      steplist: steplist,
      _id: options._id,
      'steps[0].desc': options.bishi_date,
      'steps[1].desc': options.yimian_date,
      'steps[2].desc': options.ermian_date,
      'steps[3].desc': options.sanmian_date,
      'steps[4].desc': options.simian_date,
      'steps[5].desc': options.hrmian_date,
      'steps[6].desc': options.OfferGet_date,
      currentYear: myDate.getFullYear(),
      currentMonth: myDate.getMonth() + 1,
      currentDay: myDate.getDate(),
    })
    var newestStatus = steplist[steplist.length - 1].text;
    var newestDate = steplist[steplist.length - 1].desc;
    this.setData({
      newestStatus: newestStatus,
      newestDate: newestDate
    })
    var currentDay = this.data.currentDay;
    var currentMonth = this.data.currentMonth;
    var currentYear = this.data.currentYear;
    var currentDate = currentYear + "/" + currentMonth + "/" + currentDay;
    console.log("currentday:" + currentMonth, currentYear, currentDay);

    for (var i = 0; i < steplist.length; i++) {
      if (new Date(Date.parse(steplist[i].desc.replace(/-/g,'/'))) < new Date(Date.parse(currentDate))) {
        console.log('set stepsActiveIndex:', i)
        this.setData({
          stepsActiveIndex: i,
        })
      }
    };
  },

});