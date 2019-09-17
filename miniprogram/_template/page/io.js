const app = getApp()
const {
  ioContext
} = require(`${app.ioContext}`)

const io = {
  search: data => ioContext({
    url: 's',
    method: 'GET',
    data,
  }),
}

export default io