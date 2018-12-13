// pages/order/order_detail.js
const app = getApp(); 
var util = require('../../utils/util.js');
import logistics from '../template/logistics/logistics';
var index = {


  /**
   * 页面的初始数据
   */
  data: {
    logisObj: {},//物流信息对象
    isShowLogis: false,//是否显示物流信息，默认false不显示
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var orderId = options.id;
    this.getOrderDetailById(orderId);
  },
  /**
   * 加载订单数据
   */
  getOrderDetailById: function (orderId) {
    var instance = this;
    wx.request({
      url: app.globalData.baseURL + "/api/wshop/shopselforder/loadOrderDetail.do?callback=callback",
      method: "GET",
      data: {
        id: orderId,
      },
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        var data = res.data.replace(/callback\(/g, '');
        data = data.replace(/}\)/g, '}');
        data = JSON.parse(data).bean;
        var orderMoney = util.numberUtil.add(data.freightMoney, data.totalSaleMoney);
        var logisObj = JSON.parse(data.logisticsRemark);
        instance.setData({
          order: data,
          logisObj: logisObj,
        });

      }
    })
  },
  /**
    * 生命周期函数--监听页面加载
    */
  backToList: function () {
    wx.navigateBack({
      delta: 1
    })
  },


}




//亮点：把template的js引入到本页面，this即可使用，不要用logistics对象，否则，template里面无法获取本页面的data和其他方法
for (var key in logistics) {
  index[key] = logistics[key];
}

Page(index);
