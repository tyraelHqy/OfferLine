const db = wx.cloud.database(); // 初始化数据库
var util = require('../utils/utils.js');
Page({
  data: {
    index:'',
    currentYear:1900,
    currentMonth:1,
    currentDay:1,
    priority: 3,
    stepsActiveIndex: -1,
    priority_array: ['P0', 'P1', 'P2', 'P3'],
    status_array: ['递交简历','笔试','群面', '一轮面试', '二轮面试', '三轮面试', '四轮面试','五轮面试', 'hr面', 'Offer Get!','流程终止'],
    newestDate:'',
    date: '2021-09-01',
    company: '腾讯',
    position: '后台开发',
    status: '二面',
    newestStatus:'',
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
    steplist:[],
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

  compareDate1:function (d1, d2) {
    let date1 = new Date(Date.parse(d1))
    let date2 = new Date(Date.parse(d2))
    return date1 < date2
  },

  editOfferInformation: function (e){
    var $data = this.data;
    var steplist = JSON.stringify($data.steplist);
    wx.redirectTo({
      url: '../editOffer/editOffer?company='+$data.company+'&position='+$data.position+'&status='+$data.status+'&date_time='+$data.date_time+'&message='+$data.message+'&_id='+$data._id+'&steplist='+steplist+'&newestStatus='+$data.newestStatus+'&priority='+$data.priority+'&newestDate='+$data.newestDate
      // url: '../editOffer/editOffer'
    })
    console.log('../editOffer/editOffer?company='+$data.company+'&position='+$data.position+'&status='+$data.status+'&date_time='+$data.date_time+'&message='+$data.message+'&_id='+$data._id+'&steplist='+steplist+'&newestStatus='+$data.newestStatus)
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
  onHomeButtom: function (){
    wx.switchTab({
      url: '../base/base',
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
    console.log(options.steplist)
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
      steplist: steplist,
      priority: options.priority,
    })
    var newestStatus = steplist[steplist.length-1].text;
    var newestDate = steplist[steplist.length-1].desc;
    this.setData({
      newestStatus:newestStatus,
      newestDate:newestDate
    })
    var currentDay = myDate.getDate();
    var currentMonth = myDate.getMonth()+1;
    var currentYear = myDate.getFullYear();
    var currentDate = currentYear+"/"+currentMonth+"/"+currentDay;
    console.log("currentday:"+currentDate);

    for(var i = 0 ; i < steplist.length;i++){
      if(new Date(Date.parse(steplist[i].desc.replace(/-/g,'/'))) < new Date(Date.parse(currentDate))){
        console.log('set stepsActiveIndex:',i)
        this.setData({
          stepsActiveIndex:i,
        })
      }
    };
  },
});