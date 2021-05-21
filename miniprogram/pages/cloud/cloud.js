// // pages/cloud/cloud.js
// const db = wx.cloud.database();  // 初始化数据库

// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {

//   },

//   insert: function(){
//     db.collection('user').add({
//       data:{
//         name:'jack',
//         age:18
//       }
//     }).then(res => {
//       console.log(res);
//     }).catch(err=>{
//       console.log(err);
//     })
//   },

//   update: function(){
//     db.collection('user').doc('28ee4e3e60a0bf361934001d6ea4baa3').update({
//       data:{
//         age: 21
//       }
//     }).then(res=>{
//       console.log(res)
//     }).catch(err=>{
//       console.log(err)
//     })
//   },

//   search: function(){
//     db.collection('user').where({
//       name: 'jerry'
//     }).get().then(res=>{
//       console.log(res)
//     }).catch(err=>{
//       console.log(err)
//     })
//   },

//   delete: function(){
//     db.collection('user')
//     .doc('28ee4e3e60a0bf361934001d6ea4baa3')
//     .remove()
//     .then(res=>{
//       console.log(res)
//     }).catch(err=>{
//       console.log(err)
//     })
//   },

//   sum: function(){
//     wx.cloud.callFunction({
//       name: 'sum',
//       data:{
//         a:2,
//         b:3
//       }
//     }).then(res=>{
//       console.log(res);
//     }).catch(err=> {
//       console.log(err);
//     });
//   },

//   getOpenID: function(){
//     wx.cloud.callFunction({
//       name:'login'
//     }).then(res => {
//       console.log(res)
//     }).catch(err=> {
//       console.log(err);
//     });
//   },

//   deleteBatch: function(){
//     wx.cloud.callFunction({
//       name:'batchDelete'
//     }).then(res => {
//       console.log(res)
//     }).catch(err=> {
//       console.error(err);
//     });
//   },

//   uploadImage: function(){
//     wx.chooseImage({
//       count: 1,
//       sizeType: ['original', 'compressed'],
//       sourceType: ['album', 'camera'],
//       success (res) {
//         // tempFilePath可以作为img标签的src属性显示图片
//         const tempFilePaths = res.tempFilePaths
//         console.log(tempFilePaths);

//         wx.cloud.uploadFile({
//           // 指定上传到的云路径
//           cloudPath: new Date().getTime()+'.png',
//           // 指定要上传的文件的小程序临时文件路径
//           filePath: tempFilePaths[0],
//           // 成功回调
//           success: res => {
//             console.log('上传成功', res.fileID)
//             db.collection('images').add({
//               data: {
//                 fileID: res.fileID
//               }
//             }).then(res=>{
//               console.log(res);
//             }).catch(err=>{
//               console.error(err);
//             })
//           },fail: console.error
//         })
//       }
//     });
//   },

//   getFile: function(){
//     wx.cloud.callFunction({
//       name:'login'
//     }).then(res => {
//       db.collection('images').where({
//         _openid: res.result._openid
//       }).get().then(res2=>{
//         console.log(res2);
//         this.setData({
//           images: res2.data
//         })
//       })
//     }).catch(err=> {
//       console.log(err);
//     });
//   },

//   downloadFile: function(event){
//     wx.downloadFile({
//       fileID: event.target.dataset.fileID,
//       success :res => {
//         // 保存图片到手机相册
//         console.log(res.tempFilePath)
//         // 保存图片到手机相册
//         wx.saveImageToPhotosAlbum({
//           filePath: res.tempFilePath,
//           success(res){
//             wx.showToast({
//               title: '保存成功',
//             })
//           },
//         })
//       },
//       fail: console.error
//     })
//   }
// })

// index.js
// 获取应用实例
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
  }
})
