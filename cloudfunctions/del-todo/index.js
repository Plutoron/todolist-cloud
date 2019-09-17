// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

/**
 * 删除todo记录
 * @param {string} id _id
 * @returns {stats:{removed: number}} 删除的个数
 */
exports.main = async (event, context) => {
  const {
    OPENID: openid,
    APPID: appid,
    UNIONID: unionid,
  } = cloud.getWXContext()

  const {
    id,
  } = event

  try {
    const res = await db.collection('todolist')
      .where({
        _id: id
      })
      .remove()

    return res
  } catch (e) {
    console.log('error', e)
  }
}