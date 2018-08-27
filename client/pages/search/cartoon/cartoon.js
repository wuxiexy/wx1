// pages/search/cartoon/cartoon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [
        { "book": 3, "id": 11073, "name": "排球", "thumb": "http://pic01.ishuhui.com/cartoon/book/thumb/3/rP2thPkxTa6Eph1qp9sS5B3J.jpg" },
        { "book": 1, "id": 11069, "name": "海賊王", "thumb": "http://pic01.ishuhui.com/cartoon/book/thumb/1/YDdFCpDpUAveOWJvxJRusmHb.jpg" },
        { "book": 2, "id": 11068, "name": "銀魂", "thumb": "http://pic01.ishuhui.com/cartoon/book/thumb/2/zsrxrmqJOE3Lh9prn7gDp5Zn.jpg" },
        { "book": 73, "id": 11066, "name": "白狼汐", "thumb": "http://pic01.ishuhui.com/cartoon/book/thumb/73/pAEr5QUdNXQblbtb0fEGb5cU.jpg" },
        { "book": 70, "id": 11065, "name": "镖人", "thumb": "http://pic01.ishuhui.com/cartoon/book/thumb/70/o3ymsa449mP_pg0Bk4_yqQR.jpg" },
        { "book": 37, "id": 11064, "name": "怕丢日记", "thumb": "http://pic01.ishuhui.com/cartoon/book/thumb/37/PGMWHkUnjmBKyXHNK7zWo2K6.jpg" },
        { "book": 29, "id": 11063, "name": "魔法婚约", "thumb": "http://pic01.ishuhui.com/cartoon/book/thumb/29/PIKDFwB0OcxyCpjJ4k4tBsm-.jpg" },
        { "book": 86, "id": 11062, "name": "Go!beat前进之拳", "thumb": "http://pic01.ishuhui.com/cartoon/book/thumb/86/C-NvzsBUik8p1YQuKfmCc-lf.jpg" },
        { "book": 75, "id": 11061, "name": "不妻而育", "thumb": "http://pic01.ishuhui.com/cartoon/book/thumb/75/hjVoMeRXxGLzYRnMRxQhua94.jpg" },
        { "book": 68, "id": 11060, "name": "欲望之扉", "thumb": "http://pic01.ishuhui.com/cartoon/book/thumb/68/ZFC-Wjw59MLCzzPJHZHlgY.jpg" }
    ]       // 因为鼠绘这个接口暂不支持 https ，所以只能先复制数据下来，
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }



    // 交互 
    , elClick(e){
        console.log(e.target.dataset.hash);
        wx.navigateTo({
            // url: '/pages/search/cartoon/detail/detail?hash=' + e.target.dataset.hash
            url: '/pages/search/cartoon/list/list?hash=' + e.target.dataset.hash            
        });
    }







})