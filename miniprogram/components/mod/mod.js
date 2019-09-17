Component({
	options: {
		addGlobalClass: true,
		multipleSlots: true,
	},
  properties: {
    outerNum: {
      type: Number,
      value: 5,
    }
  },
  data: {
    innerNum: 666
  },
  methods: {
    _myClick(e) {
      let {innerNum} = this.data 
      this.setData({
        innerNum: innerNum + 10,
      })
      const myEventDetail = {
        innerNum: innerNum + 10
      } // detail对象，提供给事件监听函数
      this.triggerEvent('fun', myEventDetail)
    },
  }
})
