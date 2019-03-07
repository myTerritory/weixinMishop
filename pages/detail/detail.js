// pages/detail/detail.js
let httpService = require("../../utils/service.js");
let CacheCart = require('../../utils/cartcache.js').CacheCart;
let Good = require('../../utils/cartcache.js').Good;
let app=getApp();
let cachecart = new CacheCart();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailBean:null, 
    tabs: ['图文详情', '参数详情'],
    tabsIndex:0,
    userInfo:null,
    isLogin:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //页面加载时,先判断用户是是否已经授权
    this.setData({
      userInfo: app.globalData.userInfo
    })

    // console.log(options.goodId);
    //1.获取上一个页面传递过来的参数
    let goodId=options.goodId;
    //2.发起网络请求拿到商品详情页面数据
    httpService.getDetailBean(goodId)
    .then((res)=>{
      // console.log(res.data.data)
      this.setData({
        detailBean: res.data.data,
      })
    })
    .catch((error)=>{
       wx.showToast({
         title: '网络异常,请换一个网络好的环境',
       }) 
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
   * 处理底部购物车组件的点击事件
   */
  addCartClick:function(event){
    console.log(event.detail.index)
    let index = event.detail.index;
    //点击购物车
    if(index==0){

    //点击加购物车( 授权成功之后才能出发这个点击事件 )
    }else if(index == 1){

      let detailBean = this.data.detailBean; 
     //1.加购物车 this.data.detailBean
      //goodId, title, counts, price, imgurl, isSelect
      let good = new Good(detailBean.goodsid, detailBean.title, 1, detailBean.price, detailBean.banners[0],true);
      cachecart.addGood(good);
      wx.showToast({
        title: '加购物车成功',
        success:function(){
          wx.switchTab({
            url: '../cart/cart',
          })
        }
      })

     

    //点击立即购买  
    }else if(index == 2){

    }

  },


  /**
   * 处理tabs组件的点击事件
   */
  tabsClick:function(event){
    // console.log(event.detail); //detail  < == myEventDetail
    let index = event.detail.index;
    this.setData({
      tabsIndex: index
    })
  },

  /**
   * 做授权和登录
   */
  getUserInfo: function (event){
    let userInfo = event.detail.rawData;
    //授权成功
    if (userInfo) {
      let user = JSON.parse(userInfo);
      //1.授权成功将数据存到data中
      this.setData({
        userInfo: user,
      })
      // console.log(this.data.userInfo);
      //2.将数据存到app.js中
      app.globalData.userInfo = user;

      //3.登录的功能
      this.login();

    }

  },

  login: function () {
    let _this = this;
    wx.login({
      success: function (res) {
        //4.拿到code
        let code = res.code;
        //5.把code提交给后台服务器
        wx.request({
          url: 'http://47.93.30.78:8080/XiaoMiShop/mine?code=' + code,
          method: 'GET',
          success: function (res) {
            // console.log(res)
            //6.获取后端返回的 token , 个人中心的信息 ...
            let token = 'sdfsdfafsa'
            app.globalData.token = token;
            //7.记录登录状态( data / app.js )
            _this.setData({
              isLogin: true,
            })
            app.globalData.isLgoin = true;

          }
        })

      },
      fail: function (error) {
        wx.showModal({
          title: '登录提示',
          content: '登录失败!',
        })
      },
    })
  },


})