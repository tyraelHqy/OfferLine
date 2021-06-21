// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: event.openid,
      page: 'pages/base/base',
      data: {
        phrase1: {
          value: '面试'
        },
        thing4: {
          value: 'xxxx'
        },
        time6: {
          value: '2020-11-11'
        },
        thing3: {
          value: 'xxxx'
        },
      },
      template_id: '4QDVAESjTaXU6xJpHC1TmyKvc_D6b2k1xiaD_pkA_jo'
    })
    console.log(result)
    return result
  }catch(err){
    console.log(err)
    return err
  }
}