const db = wx.cloud.database({});
const _ = db.command
const cont = db.collection('offerinformations');
const updateManager = wx.getUpdateManager()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    NumberProcess: 13,
    OfferNumber: 1,
    markColor: ['red', 'orange', 'yello', 'grey'],
    markColorIndex: 0,
    marklateIndex: 0,
    BeingNumber: 0,
    steplist: [],
    priority_array: ['P0', 'P1', 'P2', 'P3'],
    status_array: ['递交简历', '笔试', '群面', '一轮面试', '二轮面试', '三轮面试', '四轮面试', '五轮面试', 'hr面', 'Offer Get!', '流程结束'],
    stepsActiveIndex: 6,
    steplistlength: 0,
    OfferInformation: [],
  },

  clickstep: function (e) {
    console.log(e)
  },
  editOfferInformation: function (e) {
    var $data = e.currentTarget.dataset;
    console.log('$data:', $data.bean.steplist)
    var steplist = JSON.stringify($data.bean.steplist);
    wx.redirectTo({
      url: '../showOffer/showOffer?company=' + $data.bean.company + '&position=' + $data.bean.position + '&status=' + $data.bean.status + '&date_time=' + $data.bean.date_time + '&message=' + $data.bean.message + '&_id=' + $data.bean._id + '&bishi_date=' + $data.bean.bishi_date + '&yimian_date=' + $data.bean.yimian_date + '&ermian_date=' + $data.bean.ermian_date + '&sanmian_date=' + $data.bean.sanmian_date + '&simian_date=' + $data.bean.simian_date + '&hrmian_date=' + $data.bean.hrmian_date + '&OfferGet_date=' + $data.bean.OfferGet_date + '&stepsActiveIndex=' + $data.bean.stepsActiveIndex + '&status_index=' + $data.bean.status_index + '&steplist=' + steplist + '&newestStatus=' + $data.bean.newestStatus + '&priority=' + $data.bean.priority + '&newestDate=' + $data.bean.newestDate
    })
    console.log('../showOffer/showOffer?company=' + $data.bean.company + '&position=' + $data.bean.position + '&status=' + $data.bean.status + '&date_time=' + $data.bean.date_time + '&message=' + $data.bean.message + '&_id=' + $data.bean._id + '&bishi_date=' + $data.bean.bishi_date + '&yimian_date=' + $data.bean.yimian_date + '&ermian_date=' + $data.bean.ermian_date + '&sanmian_date=' + $data.bean.sanmian_date + '&simian_date=' + $data.bean.simian_date + '&hrmian_date=' + $data.bean.hrmian_date + '&OfferGet_date=' + $data.bean.OfferGet_date + '&stepsActiveIndex=' + $data.bean.stepsActiveIndex + '&status_index=' + $data.bean.status_index + '&steplist=' + steplist + '&newestStatus=' + $data.bean.newestStatus + '&priority=' + $data.bean.priority + '&newestDate=' + $data.bean.newestDate)
  },

  showQuestion: function (e) {
    wx.showModal({
      title: '待办流程数',
      content: '指的是所有流程中，仍有节点尚待完成的流程数目。待办流程数将于每日24:00更新。',
      showCancel: false,
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;

    db.collection('offerinformations').orderBy('priority', 'asc').orderBy('newestDate', 'asc').get({
        // 如果查询成功的话
        success: res => {
          this.setData({
            OfferInformation: res.data,
            NumberProcess: res.data.length,
            'OfferInformation.status': res.data.steplist[steplist.length].status,
          })

          var myDate = new Date();
          var currentDay = myDate.getDate();
          var currentMonth = myDate.getMonth() + 1;
          var currentYear = myDate.getFullYear();
          var currentDate = currentYear + "/" + currentMonth + "/" + currentDay;
          console.log('currentDate2222', currentDate);

          var index = 0;
          var bigindex = 0;
          while (index < res.data.length) {
            console.log('res.data[i].newestDate', currentDate);
            var oDate1 = new Date(res.data[index].newestDate);
            var oDate2 = new Date(currentDate);
            if (oDate1.getTime() >= oDate2.getTime()) {
              bigindex++;
            }
            index++;
          }

          console.log('bigindex', bigindex)
          this.setData({
            marklateIndex: bigindex,
          })
          console.log('marklateIndex', this.data.marklateIndex)
        }
      }),

      db.collection('offerinformations').where({
        newestStatus: 'Offer Get!'
      }).get({
        // 如果查询成功的话
        success: res => {
          console.log(res.data)
          this.setData({
            OfferNumber: res.data.length
          })
        }
      }),
      db.collection('offerinformations').where({
        newestStatus: _.nin(['Offer Get!', '流程结束', '递交简历'])
      }).get({
        // 如果查询成功的话
        success: res => {
          console.log(res.data)
          this.setData({
            BeingNumber: res.data.length,
          })
        }
      })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    var _this = this;

    db.collection('offerinformations').orderBy('priority', 'asc').orderBy('newestDate', 'asc').get({
        // 如果查询成功的话
        success: res => {
          console.log(res.data)
          this.setData({
            OfferInformation: res.data,
            markColorIndex: res.data.priority,
            NumberProcess: res.data.length,
          })
          var myDate = new Date();
          var currentDay = myDate.getDate();
          var currentMonth = myDate.getMonth() + 1;
          var currentYear = myDate.getFullYear();
          var currentDate = currentYear + "/" + currentMonth + "/" + currentDay;
          console.log('currentDate2222', currentDate);

          var index = 0;
          var bigindex = 0;
          while (index < res.data.length) {
            console.log('res.data[i].newestDate', currentDate);
            var oDate1 = new Date(res.data[index].newestDate.replace(/-/g,'/'));
            var oDate2 = new Date(currentDate);
            if (oDate1.getTime() >= oDate2.getTime()) {
              bigindex++;
            }
            index++;
          }

          console.log('bigindex', bigindex)
          this.setData({
            marklateIndex: bigindex,
          })
          console.log('marklateIndex', this.data.marklateIndex)
        }
      }),

      db.collection('offerinformations').where({
        newestStatus: 'Offer Get!'
      }).get({
        // 如果查询成功的话
        success: res => {
          console.log(res.data)
          this.setData({
            OfferNumber: res.data.length
          })
        }
      }),
      db.collection('offerinformations').where({
        newestStatus: _.nin(['Offer Get!', '流程结束'])
      }).get({
        // 如果查询成功的话
        success: res => {
          console.log(res.data)
          this.setData({
            BeingNumber: res.data.length,
          })
        }
      })
  }
})