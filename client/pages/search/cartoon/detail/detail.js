// pages/search/cartoon/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        search: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        this.data.search = options.hash;
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

        // http://wwwapi.kugou.com/yy/index.php?r=&callback=&hash=&album_id=9605024&_=1535336213803





        // http://www.ishuhui.com/cartoon/num/1-0-n-101


        // console.log('https://www.ishuhui.com/cartoon/book/' + that.data.search);
        // 请求数据
        wx.request({
            // url: 'https://api.ishuhui.com/cartoon/book_ish/ver/8a518961/id/' + that.data.search + '.json',
            // url: 'https://ac.qq.com/ComicView/index/id/505430/cid/933',
            url: 'https://ac.qq.com/ComicView/index/id/505430/cid/930',
            data: {
                r: 'play/getdata'
                , callback: 'jQuery19107614731916265496_1535336213801'
                , hash: '9FBBC350B1E95C11CCC6BC60B362AF6D'
                , album_id: '9605024'
                , _: '1535336213803'
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