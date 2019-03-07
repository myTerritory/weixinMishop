// 1.导入 fetch 函数
// let fetch = require('../../utils/fetch.js').fetch;

//2.导入的是一个对象
let httpService = require('../../utils/service.js');
let app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    homeBean:null,
    userInfo:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
    })

    let _this=this;

    //1.发起网络请求获取数据
    // wx.request({
    //   url: 'http://47.93.30.78:8080/XiaoMiShop/home',
    //   success:function(res){
    //       console.log(res.data.data)
    //       _this.setData({
    //         homeBean: res.data.data,
    //       })
    //   },
    //   fail:function(error){
    //     wx.showToast({
    //       title: '网络异常,请检查网络连接',
    //     })
    //   }
    // })

    //2.使用fetch函数发起网络请求
    // fetch({
    //   url:'http://47.93.30.78:8080/XiaoMiShop/home'
    // }).then((res)=>{
    //    console.log(res.data.data)  
    // }).catch((error)=>{
    //   console.log(error)
    // })

    //3.使用httpService获取首页的数据
    httpService.getHomeBean()  //返回的结果是promise对象
      .then((res)=>{
          this.setData({
            homeBean: res.data.data,
          })
      })
      .catch((error)=>{
        console.log(error)
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
    //判断是否已经授权过
    if (app.globalData.userInfo){
        this.setData({
          userInfo: app.globalData.userInfo
        })
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
   * 首页点击授权
   */
  bindgetuserinfo:function(event){
      // console.log(event.detail.rawData); // 拿到用户信息(微信开放的数据)
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
            app.globalData.isLogin = true;

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
   * 触发自定义categorybar组件item的点事件
   */
  categoryItemClick:function(event){
    console.log(event.detail); // detail ==> myEventDetail
    let index = event.detail.index;
    //... todo
    
      
  },


  /**
   * 处理商品列表的点击事件
   */
  goodItemClick:function(event){
    //1.获取到点击的商品的id
    let goodId = event.currentTarget.dataset.goodid;
    //2.跳转到商品的详情页面
    wx.navigateTo({
      url: '../detail/detail?goodId=' + goodId,
    })
  },



})