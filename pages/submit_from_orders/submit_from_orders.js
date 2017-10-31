// pages/submit_from_orders/submit_from_orders.js

var common = require("../../utils/util.js");
var app = getApp();
const imgurl = app.globalData.imgUrl;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgurl: imgurl,
        orderAddress: {},
        orderGoodList: [],
        from_:'to_pay', //默认来自‘去支付’
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var order_id = options.order_id
        var address_id = options.address_id
        this.getOrderAddress(address_id)
        this.getOrderGoodList(order_id)
        if(options.from_=='look_detail'){//
            this.setData({
                from_:options.from_,
            })
        }
        
    },
    //取商家订单的商品
    getOrderGoodList: function (order_id) {
        var that = this
        common.httpG('dingdan/read', {
            order_id: order_id,
        }, function (data) {
            if (data.code == 0) {
                that.setData({
                    orderGoodList: data.data
                })
            }
        })

    },
    //取商家订单的地址
    getOrderAddress: function (address_id) {
        var that = this
        
        common.httpG('address/read', {
            address_id: address_id,
        }, function (data) {
            if (data.code == 0) {
                that.setData({
                    orderAddress: data.data
                })
            }
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
})