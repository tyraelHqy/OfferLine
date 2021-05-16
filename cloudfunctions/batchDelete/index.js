// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('offerinformations').where({
      company: event.company,
      position: event.position,
      status: event.status,
      date_time: event.date_time,
      message: event.message,
    }).remove();
  }catch(e){
    console.error(e);
  }
}