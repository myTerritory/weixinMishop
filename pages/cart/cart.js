// pages/cart/cart.js
let CacheCart = require('../../utils/cartcache.js').CacheCart;
let cachecart = new CacheCart();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartlist:[],
    summary:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData();
  },

  /**
   * 初始化购物车的数据,刷新界面
   */
  initData:function(){
    let goods = cachecart.getGoods();
    this.setData({
      cartlist: goods,
      summary: cachecart.getAccount()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
     this.initData(); 
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 切换到home页面
   */
  goToHome:function(){
    wx.switchTab({
      url: '../index/index',
    })
  },

  /**
   * 监听accountBar组件的点击事件
   */
  accountBarClick:function(event){
    console.log(event.detail)
    let index = event.detail.index;
    let isSelect = event.detail.isSelect;
    if (index == 0){
      cachecart.selectAllGoods(isSelect)
    }

    //刷新界面
    this.initData();
  },

  /**
   * 当用户点击了checkbox的时候会回调
   */
  selectGoods:function(event){
    console.log(event.detail.value); //["2000", "1000"]
    cachecart.selectOnlySelect(event.detail.value);

    //判断是否已经勾上了所有的商品
    let isAllSelect=cachecart.isAllSelect();
    let accountbar = this.selectComponent("#account-bar")
    accountbar.isSelect(isAllSelect);
    //重新刷新页面
    this.initData();
  }


})