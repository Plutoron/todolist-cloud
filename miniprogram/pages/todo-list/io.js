const app = getApp()
const {
  ioContext
} = require(`${app.ioContext}`)

const io = {
  // 需要修改header的话，通过data.header 进行修改
  search: data => ioContext({
    url: 's',
    method: 'POST',
    header: {
      'content-type': '333',
    },
    data,
  }),
}

export default io