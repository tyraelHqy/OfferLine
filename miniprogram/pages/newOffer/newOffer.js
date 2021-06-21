const db = wx.cloud.database(); // 初始化数据库
var util = require('../utils/utils.js');
Page({
  data: {
    index: '',
    currentYear: '',
    currentMonth: '',
    currentDay: '',
    priority: '',
    stepsActiveIndex: -1,
    priority_array: ['P0', 'P1', 'P2', 'P3'],
    status_index: '',
    status_array: ['递交简历', '笔试', '群面', '一轮面试', '二轮面试', '三轮面试', '四轮面试', '五轮面试', 'hr面', 'Offer Get!', '流程终止'],
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
    _id: '',
    steplist: [],
    newestStatus: '',
    statusname: '',
    statusdate: '',
  },
  bindPickerChange: function (e) {
    this.setData({
      priority: e.detail.value
    })
    console.log('picker发送选择改变，携带值为', this.data.priority)
  },
  bindStatusPickerChange: function (e) {
    this.setData({
      status_index: e.detail.value,
      newestStatus: this.data.status_array[e.detail.value]
    })
    console.log('status_index发送选择改变，携带值为', this.data.status_index)
  },
  insert: function () {
    var steplist = this.data.steplist;
    steplist.push({
      text: this.data.statusname,
      desc: this.data.statusdate
    });
    this.setData({
      steplist: steplist
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

  saveOfferInformation: function () {
    var currentDay = this.data.currentDay;
    var currentMonth = this.data.currentMonth;
    var currentYear = this.data.currentYear;
    var currentDate = currentYear + "/" + currentMonth + "/" + currentDay;
    var newestStatus = this.data.status_array[this.data.status_index];
    var steplist = this.data.steplist;

    steplist.push({
      text: this.data.newestStatus,
      desc: this.data.statusdate
    });
    this.setData({
      steplist: steplist
    });

    console.log(steplist);

    var newestStatus = steplist[steplist.length - 1].text;
    var newestDate = steplist[steplist.length - 1].desc;
    this.setData({
      newestStatus: newestStatus,
      newestDate: newestDate
    })

    for (var i = 0; i < steplist.length; i++) {
      if (new Date(Date.parse(steplist[i].desc.replace(/-/g,'/'))) < new Date(Date.parse(currentDate))) {
        console.log('set stepsActiveIndex:', i)
        this.setData({
          stepsActiveIndex: i,
        })
      }
    };

    console.log("newestStatus:" + newestStatus);
    db.collection('offerinformations').add({
      data: {
        company: this.data.company,
        position: this.data.position,
        status: this.data.status,
        date_time: this.data.date_time,
        message: this.data.message,
        status_index: this.data.status_index,
        stepsActiveIndex: this.data.stepsActiveIndex,
        steplist: this.data.steplist,
        newestStatus: this.data.newestStatus,
        newestDate: this.data.newestDate,
        priority: this.data.priority,
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
    var myDate = new Date();
    var currentDay = myDate.getFullYear();
    var currentMonth = myDate.getMonth() + 1;
    var currentYear = myDate.getDate();
    var currentDate = '请选择日期';
    this.setData({
      company: '',
      position: '',
      message: '',
      statusname: '',
      statusdate: currentDate,
      steplist: [],
      newestStatus: '请选择流程节点',
    })
    console.log(this.data)
  },
});