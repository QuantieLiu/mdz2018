// pages/order/order_detail.js
const app = getApp();
var util = require('../../../utils/util.js');
Page({


  /**
   * 页面的初始数据
   */
  data: {
    remark: "",
    maxLength: 100,
    currenLen: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var remark = e.remarkText == "undefined" ? null : e.remarkText;
    this.setData({
      remark: remark,
    });
    //修改备注时显示字数
    if (remark) {
      this.setData({
        currenLen: parseInt(remark.length),
      })
    }
  },

  /**
   * 返回到订单确认页面
   */
  backToOrder: function (e) {
    var remark = this.data.remark;
    if (remark != "" && !util.RegeMatch(remark)) {
      wx.showToast({
        title: '备注输入不合法字符，请重新输入',
        icon: 'none',
        duration: 2000
      })
    } else {
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];  //上一个页面
      prevPage.setData({
        remark: remark,
      });
      wx.navigateBack({
        delta: 1
      })
    }


  },

  /**
   * input事件
   */
  bindRemarkInput: function (e) {
    var value = e.detail.value, len = parseInt(value.length);
    this.setData({
      currenLen: len,
      remark: value,
    })
  },



})
