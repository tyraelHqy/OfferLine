const db = wx.cloud.database(); // 初始化数据库

Page({
  data: {
    company: '未定义',
    position: '未定义',
    status: '未定义',
    date_time: '未定义',
    message: '未定义',
    _id: ''
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
    console.log(this.data._id)
    db.collection('offerinformations')
      .doc(this.data._id)
      .update({
        data: {
          company: this.data.company,
          position: this.data.position,
          status: this.data.status,
          date_time: this.data.date_time,
          message: this.data.message
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
    this.setData({
      company: options.company,
      position: options.position,
      status: options.status,
      date_time: options.date_time,
      message: options.message,
      _id: options._id
    })
  },
});