// components/categorybar/categorybar.js
Component({
  /**
   * 组件的属性列表
   * 接收外部的数据
   */
  properties: {
    categorys:{
      type:Array,
      value:[],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 处理items的点击事件
     */
    itemClick(event){
      let index = event.currentTarget.dataset.index;
      const myEventDetail = { index: index} // detail对象，提供给事件监听函数
      const myEventOption = {} // 触发事件的选项 bindItemClick
      this.triggerEvent('ItemClick', myEventDetail, myEventOption)
    } 

  }

  
})
