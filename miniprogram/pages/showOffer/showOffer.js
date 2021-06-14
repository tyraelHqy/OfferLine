const db = wx.cloud.database(); // 初始化数据库
var util = require('../utils/utils.js');
Page({
  data: {
    index:'',
    currentYear:1900,
    currentMonth:1,
    currentDay:1,
    stepsActiveIndex:0,
    status_array: ['笔试', '一面', '二面', '三面', '四面', 'hr面', 'Offer Get!'],
    date: '2021-09-01',
    company: '腾讯',
    position: '后台开发',
    status: '二面',
    date_time: '2012-08-21',
    message: '嘻嘻嘻嘻嘻嘻嘻嘻嘻想',
    bishi_id:0,
    yimian_id:1,
    ermian_id:2,
    sanmian_id:3,
    simian_id:4,
    hrmian_id:5,
    OfferGet_id:6,
    bishi_date:'2011-05-23',
    yimian_date:'2011-05-27',
    ermian_date:'2011-06-02',
    sanmian_date:'2011-06-15',
    simian_date:'2011-06-23',
    hrmian_date:'2011-06-25',
    OfferGet_date:'2011-06-25',
    status_index:0,
    _id: '',
    steps: [{
        text: '笔试',
        desc: '2021-05-23',
      },
      {
        text: '一面',
        desc: '2021-05-27',
      },
      {
        text: '二面',
        desc: '2021-06-02',
      },
      {
        text: '三面',
        desc: '2021-06-15',
      },
      {
        text: '四面',
        desc: '2021-06-23',
      },
      {
        text: 'hr面',
        desc: '2021-06-25',
      },
      {
        text: 'Offer Get！',
        desc: '2021-06-25',
      },
    ],
  },

  editOfferInformation: function (e){
    var $data = this.data;
    console.log($data);
    wx.navigateTo({
      url: '../editOffer/editOffer?company='+$data.company+'&position='+$data.position+'&status='+$data.status+'&date_time='+$data.date_time+'&message='+$data.message+'&_id='+$data._id+'&bishi_date='+$data.bishi_date+'&yimian_date='+$data.yimian_date+'&ermian_date='+$data.ermian_date+'&sanmian_date='+$data.sanmian_date+'&simian_date='+$data.simian_date+'&hrmian_date='+$data.hrmian_date+'&OfferGet_date='+$data.OfferGet_date
      // url: '../editOffer/editOffer'
    })
    console.log('../editOffer/editOffer?company='+$data.company+'&position='+$data.position+'&status='+$data.status+'&date_time='+$data.date_time+'&message='+$data.message+'&_id='+$data._id)
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
    }else if(util.compareDate(this.data.bishi_date,currentDate)){
      this.setData({
        stepsActiveIndex:0,
        status_index:0,
      })
    }else {
      this.setData({
        stepsActiveIndex:-1,
        status_index:0,
      })
    }
    console.log(this.data._id)
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
          status_index:this.data.status_index,
        }
      }).then(res => {
        console.log(res);
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
      OfferGet_date: options.OfferGet_date,
      _id: options._id,
      'steps[0].desc':options.bishi_date,
      'steps[1].desc':options.yimian_date,
      'steps[2].desc':options.ermian_date,
      'steps[3].desc':options.sanmian_date,
      'steps[4].desc':options.simian_date,
      'steps[5].desc':options.hrmian_date,
      'steps[6].desc':options.OfferGet_date,
      currentYear:myDate.getFullYear(),
      currentMonth:myDate.getMonth()+1,
      currentDay:myDate.getDate(),
      stepsActiveIndex: options.stepsActiveIndex,
    })
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
    }else if(util.compareDate(this.data.bishi_date,currentDate)){
      this.setData({
        stepsActiveIndex:0,
        status_index:0,
      })
    }else {
      this.setData({
        stepsActiveIndex:-1,
        status_index:0,
      })
    }
  },
});