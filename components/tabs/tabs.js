// components/tabs/tabs.js
Component({
  /**
   * 接收外部的样式类
   */
  externalClasses: ['tabs-text-active-class'],

  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex:0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 处理每一个item的点击事件
     */
    itemClick(event){
      // console.log(event.currentTarget.dataset.index);
      let index = event.currentTarget.dataset.index;
      //1.修改当前选中的索引
      this.setData({
        currentIndex: index
      })
      //2.触发事件
      const myEventDetail = { index: index} // detail对象，提供给事件监听函数
      const myEventOption = {} // 触发事件的选项 bindTabsClick
      this.triggerEvent('TabsClick', myEventDetail, myEventOption)
    }
  }
})
