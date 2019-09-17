// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

/**
 * 添加todo记录
 * @param {string} text 内容
 * @param {boolean} completed 是否已完成
 * @returns {Array} 新的所有记录
 */
exports.main = async (event, context) => {
  const {
    OPENID: openid,
    APPID: appid,
    UNIONID: unionid,
  } = cloud.getWXContext()

  const {
    text,
    completed,
  } = event

  try {
    const res = await db.collection('todolist')
      .add({
        data: {
          _openid: openid,
          text,
          completed
        }
      })

    return res
  } catch (e) {
    console.log('error', e)
  }
}