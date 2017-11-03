// pages/goodDetail/goodDetail.js
var common = require("../../utils/util.js");
var app = getApp();

const imgurl = app.globalData.imgUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: imgurl,
    clock: '',
    timer: null,
    endTime: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var t_id = options.t_id;
    this.getList(t_id);
  },

  getList: function (t_id) {
    var that = this;
    common.httpG('group/pnuminfo', { t_id: t_id }, function (data) {
      that.setData({
        getList: data.data,
        endTime: data.data.end_time
      })
      that.countDown();
    })
  },

  countDown() {
    var that = this;
    let now_time = Math.floor(new Date().getTime() / 1000);  // 获取当前时间戳（毫秒）
    let total_micro_time = that.data.endTime - now_time;  // 后台返回的时间戳 — 当前时间戳 = 剩余的时间戳
    console.log(total_micro_time);
    let dateClock = that.dateFormate(total_micro_time)    // 调用日期格式化函数
    that.data.timer = setTimeout(() => {                  // 每隔一秒调用一次定时器，递归
      that.setData({
        clock: dateClock
      })
      that.countDown();
    }, 1000)
    if (total_micro_time <= 0) {                          // 当剩余时间戳为0时，倒计时结束
      clearTimeout(that.data.timer);                      // 清除定时器
      that.setData({                                      //改写前端模版数据渲染
        clock: '活动已截止'
      })
    };
  },

  dateFormate(opt) {
    let day = Math.floor(opt / 3600 / 24);
    let hr = Math.floor(opt / 3600 % 24);
    let min = Math.floor(opt / 60 % 60);
    let sec = Math.floor(opt % 60);
    return common.formatNumber(day) + '天' + ':' + common.formatNumber(hr) + '小时' + ':' + common.formatNumber(min) + '分' + ':' + common.formatNumber(sec) + '秒';
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
    var that = this;
    clearTimeout(that.data.timer); 
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
})