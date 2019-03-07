// pages/mine/mine.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null, // 如果没有授权,就为null
    isLogin:false,
    mineBean:null, //如果没有登录就null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //当这个页面在加载的时候,判断用户是否已经授权过
    this.setData({
      userInfo:app.globalData.userInfo,
      isLogin: app.globalData.isLogin
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
    //代表已经授权过了
    if (app.globalData.userInfo){
        this.login();  //mineBean
    }
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
   * 点击模板授权的回调
   */
  authorizeClick: function (event){
   
    // console.log(event.detail.rawData); // 拿到用户信息(微信开放的数据)
    let userInfo = event.detail.rawData;
    //授权成功
    if (userInfo){
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

  login:function(){
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
              mineBean: res.data.data
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

  /**
   * 处理item的点击事件
   */
  itemClick:function(event){
    let index = event.currentTarget.dataset.index;
    //跳转到订单页面
    if(index==0){
       wx.navigateTo({
         url: '../order/order',
       }) 
    } else if (index == 1){

    }
  },



  
})