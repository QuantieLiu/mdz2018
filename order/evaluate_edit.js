// pages/order/order_detail.js
const app = getApp();
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: "",
    maxLength: 200,
    currenLen: 0,
    score:0,
    orderId: "",
    tempFilePaths: [],
    id:"",
  },
  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function (options) {
    this.setData({
      orderId: options.id,
    })

  },
  /**
   * input事件
   */
  bindRemarkInput: function (e) {
    var value = e.detail.value, len = parseInt(value.length);
    this.setData({
      currenLen: len,
      content: value,
    })
  },
  /**
   * 评分
   */
  touchStar: function (e) {
    var score=e.target.id;
    this.setData({
      score: score,
    })
  },
  /**
   * 删除图片
   */
  delPic: function (e) {
    var ind = e.target.id ? e.target.id :null ;
    var pics=this.data.tempFilePaths;
    if(pics.length>0 && ind !=null){
      pics.splice(ind,1);
      this.setData({
        tempFilePaths: pics,
      })
    }
  },
  /**
   * 选择图片上传
   */
  choosePic: function (e) {
    var instance=this;
    var pics = this.data.tempFilePaths;//临时存放图片路径
    if (pics.length > 8) {
      wx.showToast({
        title: '图片最多上传9张',
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.chooseImage({
        count: 9 - pics.length, // 最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function (res) {
          var imgsrc = res.tempFilePaths;
          pics = pics.concat(imgsrc);
          if (pics.length < 10) {
            instance.setData({
              tempFilePaths: pics
            });
          } else {
            wx.showToast({
              title: '图片最多上传9张',
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    }
  },
  /**
   * 删除图片
   */
  delPic: function (e) {
    var index = e.target.id;
    var pics = this.data.tempFilePaths;
    pics.splice(index,1);
    this.setData({
      tempFilePaths: pics,
    })
  },
  /**
   * 由于微信一次连接一张图片，第二张图开始支持图和id
   * 且需要在success中执行，否则id未返回，会报错 id too long to load
   * 保存评价
   */
  formSubmit: function (e) {
    var instance=this;
    var picsTimes = this.data.tempFilePaths.length;//请求upload的次数
    if (picsTimes > 0){
      this.uploadPic(e, picsTimes);
      //全都上传完，弹框提示成功
      wx.showToast({
        title: '评价提交成功',
        icon: 'success',
        duration: 2000
      })
      wx.navigateBack({
        delta: 1
      })
    }
  },
    /**
     * 第一次提交图片和form
     */
  uploadPic: function (e,  picsTimes){
    var instance = this;
      wx.uploadFile({
        url: app.globalData.baseURL + '/api/saveGoodsEvaluate.do?callback=callback',
        filePath: this.data.tempFilePaths[0],
        name: 'file',
        formData: {
          orderId: e.detail.value.orderId,
          goodsId: "",
          score: e.detail.value.score,
          content: e.detail.value.content,
        },
        method: "POST",
        header: { 'Content-Type': 'multipart/form-data' },
        success: function (res) {
          var data = util.parseJSON(res.data);
          if (data.hasOk && picsTimes>1) {
            for (var i = 1; i < picsTimes; i++){
              instance.uploadOnlyPic(i, data.bean.id)
            }
          }
        }
      })
  },
  /**
   * 第二次开始只上传图片
   */
  uploadOnlyPic: function (i,id) {
    wx.uploadFile({
      url: app.globalData.baseURL + '/api/saveGoodsEvaluate.do?callback=callback',
      filePath: this.data.tempFilePaths[i],
      name: 'file',
      formData: { id: id},
      method: "POST",
      header: { 'Content-Type': 'multipart/form-data' },
      success: function (res) {}
    })
  },




})
