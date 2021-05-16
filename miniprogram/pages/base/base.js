const db = wx.cloud.database({});
const _ = db.command
const cont = db.collection('offerinformations');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    NumberProcess: 13,
    OfferNumber: 1,
    BeingNumber: 0,
    OfferInformation: [{
      company: '腾讯',
      position: '产品经理',
      status:'提交简历',
      message:'',
    }, {
      company: '阿里巴巴',
      position: '后台开发',
      status:'二轮面试',
      message:'',
    }, {
      company: '网易',
      position: '游戏策划',
      status:'笔试',
      message:'28面试',
    },{
      company: '火星移民',
      position: '驾驶员',
      status:'失败',
      message:'太傻',
    }]
  },

  createInformation() {
    wx.navigateTo({
      url: '../editOffer/editOffer'
    })
  },

  editOfferInformation:function(e) {
    var $data = e.currentTarget.dataset;
    console.log($data.bean)
    console.log($data.bean.company)
    wx.navigateTo({
      url: '../editOffer/editOffer?company='+$data.bean.company+'&position='+$data.bean.position+'&status='+$data.bean.status+'&date_time='+$data.bean.date_time+'&message='+$data.bean.message
    })
    console.log('../editOffer/editOffer?company='+$data.bean.company+'&position='+$data.bean.position+'&status='+$data.bean.status+'&date_time='+$data.bean.date_time+'&message='+$data.bean.message)

  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    db.collection('offerinformations').get({
      // 如果查询成功的话
      success: res => {
        console.log(res.data)
        this.setData({
          OfferInformation: res.data,
          NumberProcess: res.data.length
        })
      }
    }),
    db.collection('offerinformations').where({
      status: '获得Offer'
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
      status: _.nin(['已结束','获得Offer'])
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this;
    db.collection('offerinformations').get({
      // 如果查询成功的话
      success: res => {
        console.log(res.data)
        this.setData({
          OfferInformation: res.data,
          NumberProcess: res.data.length
        })
      }
    }),
    db.collection('offerinformations').where({
      status: '获得Offer'
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
      status: _.nin(['已结束','获得Offer'])
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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})