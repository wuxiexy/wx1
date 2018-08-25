// pages/search/music/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasSearch: 1      // 用于判断
    // , tips: '歌曲id有误'



    , search: ''                // 搜索字段
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
    // 能获取到【wx.navigateTo】跳转带过来的参数， tips：其他方式跳转过来的应该也一样
    console.log(options);     
    if (options.hash){
      
      // // 显示加载图标
      // wx.showLoading({
      //   title: 'loading...'       // loading 的提示文字
      //   , mask: false              // 显示一层阴影，不能点击其他地方
      // });
      this.data.search = options.hash;
      this.requestData();

    } else {
      this.setData({
        hasSearch: 2
      });
    }
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
  
  }







  // 交互
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
      url: 'http://www.kugou.com/yy/index.php?r=play/getdata&hash=5FCE4CBCB96D6025033BCE2025FC3943&album_id=1645030&_=1497972864535',
      data: {
        hash: that.data.search
      },
      header: {
        // 'content-type': 'application/json'         // 默认值
        'content-type': 'json'                        // 要修改为这个才能正常请求          
      },
      success: function (res) {
        console.log(res);

        // if (res.statusCode === 200) {

        //   that.data.page++;           // 加一页
        //   wx.hideLoading();           // 需要主动调用才会关闭 loading 动画
        //   // console.log(res);

        //   // data = res['data'];
        //   data = res['data']['data'];

        //   // 计算当前搜索的页数，用于分页，只计算一次，当重新点击搜索按钮 会重新进入
        //   if (!that.data.hasCount) {
        //     that.setData({
        //       hasSearch: true
        //     });
        //     that.data.hasCount = true;
        //     that.data.pagination = Math.ceil(data['total'] / that.data.count);    // 计算总页数
        //   }

        //   // 数据处理
        //   that.cb(data);

        // }
      }
    });

  }
  // 用于处理请求的数据逻辑
  , cb(res) {
    console.log(res);
    // res = res['data'];

    // console.log(this.data.lists);    
    // <text>{{ item.SingerName }}< /text>
    // < text > {{ item.AlbumName }}</text>
    // < text > {{ item.Duration }}</text>


    var SingerName, Duration, lists = [], time = '', name = this.data.search;
    lists = res['lists'].map((c) => {
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














})