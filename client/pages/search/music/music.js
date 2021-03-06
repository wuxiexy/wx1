// pages/search/music/music.js
const util = require('../../../utils/util.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchType: true        // 查找类型 true:singer，false:song
    , searchActive: true    // tab 选中与否


    , singerUrl: 'https://songsearch.kugou.com/song_search_v2'
    , songUrl: 'https://songsearch.kugou.com/song_search_v2'
    , url: ''

    , search: '周杰伦'                // 搜索字段
    , hasSearch: false

    , page: 1                    // 当前页数
    , count: 10                    // 一次load多少条数据
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
    this.requestData();               // 查找数据  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }





  // 交互
  , changeSearch(e){
    // console.log(e);    
    // console.log(e.target.dataset);

    // searchType: true       // 查找类型 true:singer，false:song
    var type = e.target.dataset.type === "0" ? true : false;
    this.setData({
      searchType: type,
      searchActive: type
    });
  }


  // 保存输入框的值
  , searchInput(e) {
    // console.log(e);
    this.setData({
      search: e.detail.value
    })
  }


  // 把数据参数初始化
  , searchBtn(){

    this.data.url = this.data.singerUrl;

    this.data.page = 1;
    this.setData({
      lists:[]
    });
    this.data.hasCount = false;    
    this.requestData();

  }




  // request 
  // 这里只做一些常规的逻辑处理，
  // 判断是否加载完毕，显示加载动画，加载数据，调用提供的方法处理数据
  // this.data 要求的一些默认参数：
  // page：当前页数（默认1）
  // count：总页数（默认1）
  // search：要搜索的东西
  // hasCount：是否已经计算总页数
  // hasSearch：有查找到数据
  , requestData() {
    var that = this
      , data
      ;


    // 判断是否加载完毕，（是否还有页数，默认有一页，初始化用）
    if (that.data.page > that.data.pagination) {
      return false;
    }


    // 显示加载图标
    wx.showLoading({
      title: 'loading...'       // loading 的提示文字
      , mask: false              // 显示一层阴影，不能点击其他地方
    });



    // https://songsearch.kugou.com/song_search_v2?keyword=%E9%99%88%E5%A5%95%E8%BF%85&page=1&pagesize=100&userid=-1&clientver=&platform=WebFilter&tag=em&filter=2&iscorrection=1&privilege_filter=0%EF%BC%9B

    // =1&=100&=-1&clientver=&platform=WebFilter&tag=em    &filter=2&iscorrection=1&privilege_filter=0%EF%BC%9B

    // 请求数据
    wx.request({
      url: that.data.url,
      data: that.urlData(),
      header: {
        // 'content-type': 'application/json'         // 默认值
        'content-type': 'json'                        // 要修改为这个才能正常请求          
      },
      success: function (res) {
        // console.log(res);

        if (res.statusCode === 200) {

          that.data.page++;           // 加一页
          wx.hideLoading();           // 需要主动调用才会关闭 loading 动画
          // console.log(res);

          // data = res['data'];
          data = res['data']['data'];

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



  }


  // url data
  , urlData(){

    // 歌手
    return {
      keyword: this.data.search,
      // page: (this.data.page - 1) * this.data.count,
      page: this.data.page,
      pagesize: this.data.count,
      userid: '-1',
      clientver: '',
      platform: 'WebFilter',
      tag: 'em',
      filter: '2',
      iscorrection: '1',
      privilege_filter: '0'
    }
  }





  // 用于处理请求的数据逻辑
  ,cb(res) {
    console.log(res);
    // res = res['data'];

    // console.log(this.data.lists);    
    // <text>{{ item.SingerName }}< /text>
    // < text > {{ item.AlbumName }}</text>
    // < text > {{ item.Duration }}</text>


    var SingerName, Duration,lists=[], time='',name=this.data.search;
    lists = res['lists'].map((c)=>{
      return {
        FileName: c.FileName.replace(/<em.*?>(.*?)<\/em>/ig, name)    // 歌曲名
        , AlbumName: c.AlbumName                                      // 专辑
        , Duration: util.secondToMinute(c.Duration)                   // 时长
        , FileHash: c.FileHash                                        // 歌曲id
      }
    });
    console.log(lists);
    this.data.lists.push(...lists);         // 记得展开 push 进 lists

    this.setData({
      lists: this.data.lists
    });


    // console.log(res);


  }

  , elClick(e){
    console.log(e);
    wx.navigateTo({ 
      url: '/pages/search/music/detail?hash='+e.target.dataset.hash 
    });
  }

})