// components/addcart/addcart.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

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
     * 点击购物车图片
     */
    clickCart(event){
      // console.log('0')  
      this.dispatch(0);
    },
    /**
     * 点击加购物车
     */
    clickAddCart(event){
      // console.log('1') 
      this.dispatch(1);

    },
    /**
     * 点击购买
     */
    clickBuy(event){
      // console.log('2') 
      this.dispatch(2);
     
    },

    /**
     * 触发事件的函数
     */
    dispatch(index){
      const myEventDetail = { index: index } // detail对象，提供给事件监听函数
      const myEventOption = {} // 触发事件的选项 bindAddCartClick
      this.triggerEvent('AddCartClick', myEventDetail, myEventOption)
    }
  }
})
