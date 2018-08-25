// pages/search/movie/movie.js
const util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topNum: 0,
    search: '',                 // 要搜索的城市
    hasSearch: false,           // 用于显示搜索到的电影的内容
    title: '',                  // 搜索之后的头部

    page: 1,                    // 当前页数
    count: 5                    // 一次load多少条数据
    , pagination: 1             // 总页数，（总数/每次load多少条）
    , hasCount: false           // 用于判断是否计算了总页数
    , lists: []                 // 所有数据
    , total: 0                  // 搜到的电影总数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    // var that = this;

    // console.log('loading');
    // that.data.page += 1;
    // console.log(that.data.page);


    // // 设置最多50条数据，这个要根据统计的来计算
    // if ((that.data.page - 1) * 10 > 20) {
    //   wx.hideLoading();            // 需要主动调用才会关闭        
    //   return false;
    // }


    // // 显示加载图标
    // wx.showLoading({
    //   title: '加载中...'           // loading 的提示文字
    //   , mask: true                 // 
    // });

    // setTimeout(function () {
    //   // 弹出请求结果 icon
    //   wx.showToast({
    //     title: '加载完成'
    //     , image: ''                // 自定义提示图标
    //     , icon: 'success'          // 图标，有效值 "success", "loading", "none"
    //   });
    // }, 800);

    this.requestData();               // 查找数据

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },




  // =================================================
  // 一些交互



  // 保存输入框的值
  searchInput(e){
    // console.log(e);
    this.setData({
      search: e.detail.value
    })
  },



  // 搜索按钮
  movieSearch() {
    // 当前热映电影搜索
    // 每次点击按钮都要初始化一下基础数据

    var that = this
      // , mn = this.data.search       // 城市名字
      // , hasCount = false            // 用于处理重复计算
    ;


    if (this.data.search){

      console.log(this.data.search);
      
      console.log(that.data.hasSearch);
      
      that.data.hasCount = false;       // 每次点击按钮都要重新计算当前查找的数据的总页数
      that.data.page = 1;               // 重置为第一页
      that.data.lists = [];             // 数据置空
      console.log();    
      

      this.requestData();               // 查找数据
      
    }
  
  },



  

  // request 
  // 这里只做一些常规的逻辑处理，
  // 判断是否加载完毕，显示加载动画，加载数据，调用提供的方法处理数据
  // this.data 要求的一些默认参数：
  // page：当前页数（默认1）
  // count：总页数（默认1）
  // search：要搜索的东西
  // hasCount：是否已经计算总页数
  // hasSearch：有查找到数据
  requestData(){
    var that = this
        , data
    ;


    // 判断是否加载完毕，（是否还有页数，默认有一页，初始化用）
    if(that.data.page>that.data.pagination){
      return false;
    }


    // 显示加载图标
    wx.showLoading({
      title: 'loading...'       // loading 的提示文字
      , mask: true              // 显示一层阴影，不能点击其他地方
    });



    // 请求数据
    wx.request({
      url: 'https://api.douban.com/v2/movie/in_theaters',
      data: {
        apikey: '0b2bdeda43b5688921839c8ecb20399b',
        city: that.data.search,
        start: (that.data.page - 1) * that.data.count,
        count: that.data.count
      },
      header: {
        // 'content-type': 'application/json'         // 默认值
        'content-type': 'json'                        // 要修改为这个才能正常请求          
      },
      success: function (res) {

        if (res.statusCode===200){

          that.data.page++;
          wx.hideLoading();           // 需要主动调用才会关闭 loading 动画
          console.log(res);

          data = res['data'];

          // 计算当前搜索的页数，用于分页，只计算一次，当重新点击搜索按钮 会重新进入
          if (!that.data.hasCount) {
            that.setData({
              hasSearch: true
            });
            that.data.hasCount = true;
            that.data.pagination = Math.ceil(data['total'] / that.data.count);    // 计算总页数
          }

          // 数据处理
          that.cb(data);

        }
      }
    });



  },


  // 用于处理请求的数据逻辑
  cb(res){
    // console.log(res);
    // res = res['data'];
    // console.log(this.data.lists);    
    this.data.lists.push(...res['subjects']);         // 记得展开 push 进 lists

    this.setData({
      title: res['title'],
      lists: this.data.lists     
    });


    // console.log(res);
  },





  toTop(){
    // util.toTop();
    this.setData({
      topNum: this.data.topNum = 0
    });
  }


  


})