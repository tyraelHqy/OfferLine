const db = wx.cloud.database();  // 初始化数据库

Page({
  data: {
    company: '腾讯',
    position: '后台开发',
    status: '二面',
    date_time: '2021-05-21',
    message: 'xixixixixixixi',
  },

  onCompanyChange(event) {
    // event.detail 为当前输入的值
    console.log(event);
    this.data.company=event.detail;
    console.log(this.data.company);
  },

  onPositionChange(event) {
    // event.detail 为当前输入的值
    console.log(event);
    this.data.position=event.detail;
    console.log(this.data.position);
  },

  onStatusChange(event) {
    // event.detail 为当前输入的值
    console.log(event);
    this.data.status=event.detail;
    console.log(this.data.status);
  },

  onDateTimeChange(event) {
    // event.detail 为当前输入的值
    console.log(event);
    this.data.date_time=event.detail;
    console.log(this.data.date_time);
  },

  onMessageChange(event) {
    // event.detail 为当前输入的值
    console.log(event);
    this.data.message=event.detail;
    console.log(this.data.company);
  },

  saveOfferInformation: function(){
    db.collection('offerinformations').add({
      data:{
        company:this.data.company,
        position:this.data.position,
        status:this.data.status,
        date_time:this.data.date_time,
        message:this.data.message
      }
    }).then(res => {
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  },
  deleteOfferInformation: function(){
    wx.cloud.callFunction({
      name:'batchDelete',
      data:{
        company:this.data.company,
        position:this.data.position,
        status:this.data.status,
        date_time:this.data.date_time,
        message:this.data.message
      }
    }).then(res => {
      console.log(res)
    }).catch(err=> {
      console.error(err);
    });
  },

 /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {//数据在options对象身上
    this.setData({
        company: options.company,
        position: options.position,
        status: options.status,
        date_time: options.date_time,
        message: options.message
      })
    },
});