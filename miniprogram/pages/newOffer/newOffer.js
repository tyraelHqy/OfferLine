const db = wx.cloud.database(); // 初始化数据库

Page({
  data: {
    company: '',
    position: '',
    status: '',
    date_time: '',
    message: '',
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
    db.collection('offerinformations').add({
      data: {
        company: this.data.company,
        position: this.data.position,
        status: this.data.status,
        date_time: this.data.date_time,
        message: this.data.message
      }
    }).then(res => {
      console.log(res);
      this.data.company='';
      this.data.status='';
      this.data.position='';
      this.data.date_time='';
      this.data.message='';
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