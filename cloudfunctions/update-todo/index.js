// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

/**
 * 更新todo记录
 * @param {string} id _id
 * @param {boolean} completed 是否完成
 * @returns {stats:{updated: number}} 更新多少条记录
 */
exports.main = async (event, context) => {
  const {
    OPENID: openid,
    APPID: appid,
    UNIONID: unionid,
  } = cloud.getWXContext()

  const {
    id,
    completed,
  } = event

  try {
    const res = await db.collection('todolist')
      .where({
        _id: id
      })
      .update({
        data: {
          completed
        },
      })

    return res
  } catch (e) {
    console.log('error', e)
  }
}