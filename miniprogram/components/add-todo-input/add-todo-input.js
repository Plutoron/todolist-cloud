Component({
	options: {
		addGlobalClass: true,
		multipleSlots: true,
	},
  methods: {
    // 内部方法建议以下划线开头
    _bindconfirm(e) {
      const {
        value,
      } = e.detail
      this.triggerEvent('confirm', {todo: value})
    },
  }
})
