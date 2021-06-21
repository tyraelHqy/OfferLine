
Component({
  data: {
    selected:2,    
    "color": "#ccc",
    "selectedColor": "#008020",
    "list": [
      {
        "pagePath": "/pages/cloud/cloud",
        "text": "社区",
        "iconPath": "/images/Offer分享社群 黑.png",
        "selectedIconPath": "/images/Offer分享社群 绿.png"
      },
      {
        "heigher": true,
        "pagePath": "/pages/newOffer/newOffer",
        "iconPath": "/images/新增 黑.png",
        "selectedIconPath": "/images/新增 墨绿.png"
      },
      {
        "pagePath": "/pages/base/base",
        "text": "我的",
        "iconPath": "/images/我的 黑.png",
        "selectedIconPath": "/images/我的 绿.png"
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      this.setData({
        selected:data.index
      })
      wx.switchTab({url})
    }
  }
})