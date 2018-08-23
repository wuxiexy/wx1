// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '我是一条小青龙，我有许多小秘密 ',
    page: 1,                                // 当前页数
    count: 5                              // 假设总页数
    , lists: []                             // 所有数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading();          // 显示加载动画   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 页面初始化加载完毕

    // console.log(options);
    var i
      , that = this
      , currentPageIndex = (that.data.page - 1) * 10
      ;

    for (i = 0; i < 10; i++) {
      that.data.lists.push(that.data.text + (currentPageIndex + i));
    }

    that.setData({
      lists: that.data.lists
    });

    wx.hideNavigationBarLoading();    // 因为 onready 时候开启了加载动画，是加载完成之后要关闭
    console.log(2); 
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("页面切换--显示");  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("页面切换--隐藏");  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log(3);    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   * https://developers.weixin.qq.com/miniprogram/dev/framework/config.html
   */
  onPullDownRefresh: function () {
    setTimeout(function(){
      wx.stopPullDownRefresh();
    },2000);
  },

  /**
   * 页面上拉触底事件的处理函数
   * document
   * 【https://developers.weixin.qq.com/miniprogram/dev/api/api-react.html#wxshowloadingobject】
   */
  onReachBottom: function () {
    // https://developers.weixin.qq.com/miniprogram/dev/api/api-react.html
    var that = this
    ;

    that.data.page += 1;     // 第一页在页面 onLoad 的时候已经加载，所以每次 onReachBottom 事件都是加载下一页

    // 显示加载图标
    wx.showLoading({
      title: '加载中...'          // loading 的提示文字
      , mask: true                 // 
    })
    
    // 设置最多50条数据
    if ((that.data.page - 1) * 10>50){
      wx.hideLoading();         // 需要主动调用才会关闭        
      return false
    }

    // 测试上拉加载
    // 虚拟网络延迟，这里假设加载成功
    setTimeout(function () {
      wx.hideLoading();         // 需要主动调用才会关闭  

      // -----------------------------------------------------------
      var i
        , currentPageIndex = (that.data.page - 1) * 10
        ;

      for (i = 0; i < 10; i++) {
        that.data.lists.push(that.data.text + (currentPageIndex + i));
      }

      that.setData({
        lists: that.data.lists
      });
      // -----------------------------------------------------------


      // 弹出请求结果 icon
      wx.showToast({
        title: '加载完成'
        , image: ''               // 自定义提示图标
        , icon: 'success'            // 图标，有效值 "success", "loading", "none"
      })  

      console.log(that.data.page);

    }, 800);




    // 开发打开下面这个
    // 页数+1
    // page = page + 1;      // 默认是第一页
    // wx.request({
    //   url: "",
    //   method: "GET",
    //   // 请求头部
    //   header: {
    //     'content-type': 'application/text'
    //   },

    //   // 请求成功
    //   success: function (res) {
      
    //     // 设置数据
    //     that.setData({

    //     })
    //     // 隐藏加载框
    //     // wx.hideLoading();
    //   }

    //   // 请求失败
    //   , fail: function (){
    //     // 弹出请求结果 icon
    //     wx.showToast({
    //       title: '请求失败',
    //       icon: 'fail',
    //       duration: 1
    //     })

    //     wx.hideLoading();         // 需要主动调用才会关闭
    //   }
      
    //   , complete: function(){
    //     // 弹出成功 icon
    //     wx.showToast({
    //       title: 'complete',
    //       icon: 'complete',
    //       duration: 2000
    //     })

    //     wx.hideLoading();         // 需要主动调用才会关闭
    //   }

    // })


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})