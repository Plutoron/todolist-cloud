const app = getApp()
const regeneratorRuntime = require(`${app.RUNTIME}`)
const {
  formatNumber,
} = require(`${app.utils}`)
import io from 'io'
const db = wx.cloud.database()

Page({
  data: {
    list: [],
    todoList: [],
    doneList: [],
    curTextId: '',
  },
	onLoad() {
    wx.showLoading({
      title: '加载数据中',
      mask: true,
    })

    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })

    this.getList()
	},
  getList() {
    wx.cloud.callFunction({
      name: 'get-list',
      success: res => {
        console.log('get-list', res)
        wx.hideLoading()

        const {
          result: {
            data,
            errCode,
            errMsg,
          },
        } = res

        if (errCode) {
          app.message(errMsg)
        } else {
          this.setData({
            list: data,
          }, () => {
            this.splitList()
          })
        }
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
	splitList() {
		this.setData({
			todoList: this.data.list.filter(v => !v.completed),
			doneList: this.data.list.filter(v => v.completed),
		})
	},
  addTodo(e) {
    const {
      todo,
    } = e.detail

    const {
      list,
     } = this.data

    if (!todo) {
      wx.showToast({
        title: '不能添加空内容呦QAQ',
        icon: 'none',
      })
      return
    }

    if (list.some(v => v.text === todo)) {
      wx.showToast({
        title: '已经在列表里面喽QAQ',
        icon: 'none',
      })
      return
    }

    wx.cloud.callFunction({
      name: 'add-todo',
      data: {
        text: todo,
        completed: false,
      },
      success: res => {

        console.log('add-todo', res)
        this.getList()
      },
      fail: err => {
        console.error('[云函数] [add-todo] 调用失败', err)
      }
    })
  },
  bindstatus(e) {
    let {
      list,
    } = this.data

    const {
      id,
      completed,
    } = e.currentTarget.dataset

    wx.cloud.callFunction({
      name: 'update-todo',
      data: {
        id,
        completed: !completed,
      },
      success: res => {
        console.log('update-todo', res)

        this.getList()
      },
      fail: err => {
        console.error('[云函数] [update-todo] 调用失败', err)
      }
    })
  },
  binddel(e) {
    let {
      list,
    } = this.data

    const {
      id,
    } = e.currentTarget.dataset

    wx.cloud.callFunction({
      name: 'del-todo',
      data: {
        id,
      },
      success: res => {
        console.log('del-todo', res)

        this.getList()
      },
      fail: err => {
        console.error('[云函数] [del-todo] 调用失败', err)
      }
    })
  },
  bindtouchstart(e) {
    const {
      clientX,
    } = e.touches[0]
    this.setData({
      startX: clientX,
    })
  },
  bindtouchmove(e) {
    const {
      clientX,
    } = e.touches[0]

    const {
      id,
    } = e.currentTarget.dataset

    if (this.data.startX - clientX > 50) {
      this.setData({
        curTextId: id,
      })
    } else if (clientX - this.data.startX  > 50) {
      this.setData({
        curTextId: '',
      })
    }
  },
  bindpage(e) {
    this.setData({
      curTextId: '',
    })
  }
})