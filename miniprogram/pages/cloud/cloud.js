const app = getApp()

Page({
  data: {
    motto: '程序员小哥脱发开发中，敬请期待！',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  getOpenId() {
    wx.cloud.callFunction({
      name:"getopenid"
    }).then(res =>{
      console.log("获取openid成功",res)
    }).catch(res=>{
      console.log("获取openid失败",res)
    })
  },
  shouquan(){
    wx.requestSubscribeMessage({
      tmplIds: ['4QDVAESjTaXU6xJpHC1TmyKvc_D6b2k1xiaD_pkA_jo'],
      success(res){
        console.log('授权成功',res)
      },
      fail(res){
        console.log('授权失败',res)
      }
    })
  },
  sendOne(){
    wx.cloud.callFunction({
      name: "sendMessage",
      data:{
        openid:"o7O6f5d-4_yaBuxNXv8SYG-TT7nQ"
      }
    }).then(res =>{
      console.log("发送成功",res)
    }).catch(res=>{
      console.log("发送失败",res)
    })
  },
  onShow: function () {
    if(typeof this.getTabBar==='function' && this.getTabBar()){
      this.getTabBar().setData({
        selected:0
      })
    }
  }
})
