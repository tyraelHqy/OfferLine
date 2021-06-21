Component({
      options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
      },

      /**
      * 组件的属性列表
      */
      properties: {
        info: {
          type: String,
          value: "这里空空的，什么都没有哦~"
        },

        showInfo: {
          type: Boolean,
          value: true
        },
        info2: {
          type: String,
          value: "点击右下角“新增流程“，添加你的第一个流程吧!"
        },

        showInfo2: {
          type: Boolean,
          value: true
        },

        buttonTitle: {
          type: String,
          value: "点击添加新流程"
        },

        showButton: {
          type: Boolean,
          value: true
        }
      },
    })