// pages/search/car/car.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      search: ''
      , hasSearch: ''
      , lists: []
      , l: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.requestData();
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
        // if (that.data.page > that.data.pagination) {
        //     return false;
        // }


        // 显示加载图标
        wx.showLoading({
            title: 'loading...'       // loading 的提示文字
            , mask: false              // 显示一层阴影，不能点击其他地方
        });



        // 请求数据
        wx.request({
            url: 'https://www.autohome.com.cn/ashx/AjaxIndexCarFind.ashx',
            data: {
                type: 11
            },
            header: {
                // 'content-type': 'application/json'         // 默认值
                'content-type': 'text/plain;charset=gb2312'                        // 要修改为这个才能正常请求  
                // 'content-type': 'charset=utf-8'        
            },
            // method: 'POST',
            success: function (res) {
                console.log(res);

                if (res.statusCode === 200) {

                    //   that.data.page++;           // 加一页
                    wx.hideLoading();           // 需要主动调用才会关闭 loading 动画


                    data = res['data'];
                    // data = res['data']['data'];

                    that.setData({
                        hasSearch: true
                    });

                    // 计算当前搜索的页数，用于分页，只计算一次，当重新点击搜索按钮 会重新进入
                    //   if (!that.data.hasCount) {
                    //     that.setData({
                    //       hasSearch: true
                    //     });
                    //     that.data.hasCount = true;
                    //     that.data.pagination = Math.ceil(data['total'] / that.data.count);    // 计算总页数
                    //   }

                    // 数据处理
                    that.cb(data);

                }
            }
            , fail(e) {
                wx.hideLoading();           // 需要主动调用才会关闭 loading 动画

                that.setData({
                    hasSearch: 2
                    , loadTips: e
                });
                console.log(e);
            }
        });

    }
    // 用于处理请求的数据逻辑
    , cb(res) {
        // var book = res.book, lists = [0], i, posts = res.cartoon[0]['posts'];
        console.log(res);
        // res = res['data'];

        // JSON.parse(decodeURIComponent(JSON.stringify(res.data)))

        this.setData({
            lists: JSON.parse(decodeURIComponent(JSON.stringify(res.result.branditems)))   
        });


        // console.log(res);



    }


    , elClick(e) {
        console.log(e);
        // wx.navigateTo({
        //     url: '/pages/search/music/detail?hash=' + e.target.dataset.hash
        // });
    }



})