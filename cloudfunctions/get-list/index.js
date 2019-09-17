// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

/**
 * 获取所有当前目录下的内容
 * @returns {Array} 所有记录
 */
exports.main = async (event, context) => {
  const {
    OPENID: openid,
    APPID: appid,
    UNIONID: unionid,
  } = cloud.getWXContext()

  try {
    const res = await db.collection('todolist')
      .where({
        _openid: openid
      })
      .get()

    return res
  } catch (e) {
    console.log('error', e)
  }
}