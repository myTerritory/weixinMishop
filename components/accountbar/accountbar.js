// components/accountbar/accountbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    summary:Number,
  },

  /**
   * 组件的初始数据
   */
  data: {
    isChecked:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {

    isSelect: function (isSelect){
      this.setData({
        isChecked: isSelect
      })
    },

    /**
     * 全选 和 取消全选
     */
    selectAll(event){
      //如果value这个数组为空,代表是 取消全选
      // console.log(event.detail.value);
      let arrs = event.detail.value[0];
      //全选
      if(arrs){
        // console.log('全选')
        this.dispath(0,true)
      //取消全选    
      }else{
        // console.log('取消全选')
        this.dispath(0,false)
      }
    },

    /**
     * 点击结算
     * */  
    clickAccount(event){
      //  console.log('s') 
       this.dispath(1)
    },

    /**
     * 分发事件的函数
     */
    dispath(index,isSelectAll){
      const myEventDetail = { index: index, isSelect: isSelectAll} // detail对象，提供给事件监听函数
      const myEventOption = {} // 触发事件的选项 bindAccountBarClick
      this.triggerEvent('AccountBarClick', myEventDetail, myEventOption) 
    } 
  }
})
