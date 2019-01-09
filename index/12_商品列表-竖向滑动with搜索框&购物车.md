<li>WXML

```
<!-- <view class="tab-search" bindtap='gotoSearch'>输入商品名称搜索</view> -->
  <view class="tab-search">
    <view style="width: 80%;">
      <input class='edit' type="text" name="goodName" id="goodName" maxlength="25" value="{{goodName}}" bindconfirm="quickSearch" bindinput="bindNameInput" placeholder="输入商品名称搜索" />
    </view>
    <view class="search-button"  bindtap='gotoSearch'>搜索</view>
  </view>

        <!-- goods  -->
        <scroll-view class='mainwrap' scroll-y='true' style="height:{{height-50-50}}px;width:{{width-10}}px;margin:5px;" bindscrolltolower='gotoSearch'>
          <view wx:for="{{goodsList}}" wx:key="goodsId" id="goods-{{item.goodsId}}" class="goods-item" data-price="item.goodsPrice">
            <!-- goods img -->
            <view wx:if="{{!item.canSale}}" class="goods-pic-wrap" data-id="{{item.goodsId}}" data-num="{{item.goodsNum}}" bindtap='goodsDetail'>
              <image src="{{item.goodsImgURL}}" mode='aspectFill' binderror="errImg" data-errorimg="{{index}}"></image>
              <text class="goods-empty">已售罄</text>
              <view class="withe-mask"></view>
            </view>
            <view wx:if="{{item.canSale}}" class="goods-pic-wrap" data-id="{{item.goodsId}}" data-num="{{item.goodsNum}}" bindtap='goodsDetail'>
              <image src="{{item.goodsImgURL}}" mode='aspectFill' binderror="errImg" data-errorimg="{{index}}"></image>
            </view>
            <!-- goods content -->
            <view class="goods-content-wrap" style="width:{{width-145}}px;">
              <view data-id="{{item.goodsId}}" bindtap='goodsDetail'>
                <text class="goods-name">{{item.goodsName}}</text>
                <text class="goods-sale">已售:{{item.saleNum}}</text>
              </view>
              <view wx:if="{{item.promotion == 1}}" class="goods-price-region">
                <text class="goods-price">¥ {{item.promotionPrice}}</text>
                <text class="goods-del-price ">¥ {{item.goodsPrice}}</text>
              </view>
              <view wx:if="{{item.promotion != 1}}" class="goods-price-region">
                <text class="goods-price">¥ {{item.goodsPrice}}</text>
              </view>
              <!-- goods operation -->
              <view wx:if="{{item.canSale}}" class="goods-operation">
                <view class="add-goods" bindtap='addGoods' data-index="{{index}}" data-id="{{item.goodsId}}" data-num="{{item.goodsNum==null?0:item.goodsNum}}" data-name="{{item.goodsName}}" data-price="{{item.promotion == 1?item.promotionPrice:item.goodsPrice}}" data-img="{{item.goodsImgURL}}">
                  <image class='icon i-add-goods' src="/pages/theme/images/add.png"></image>
                </view>
                <text class="goodsop-num {{item.goodsNum>0?'':'hide'}}" data-num="{{item.goodsNum==null?0:item.goodsNum}}">{{item.goodsNum==null?0:item.goodsNum}}</text>
                <view class="remove-goods {{item.goodsNum>0?'':'hide'}}" bindtap='removeGoods' data-index="{{index}}" data-id="{{item.goodsId}}" data-num="{{item.goodsNum==null?0:item.goodsNum}}">
                  <image class="icon i-remove-goods" src="/pages/theme/images/remove.png"></image>
                </view>
              </view>
              <!-- end goods operation -->
            </view>
            <!-- end goods content -->
          </view>
        </scroll-view>


  <import src="../../template/cart/cart.wxml"/>
  <template is="cart" data="{{currentTab,...cartData,canBusiness,orderGoods,width,isShowCartDialog}}"></template>
```

<li>WXSS

```

@import "../../theme/css/font.wxss";
@import "../../theme/css/iconfont.wxss";
@import "../../template/cart/cart.wxss";

page {
  height: 100%;
  background: #f0f2f5;
  overflow: hidden;
}

/* 顶部搜索框-开始 */
.tab-search{
  /* border-radius:20px; */
  height:30px;
  margin:2%;
  width:96%;
  font-size:13px;
  line-height:35px;
  color:#666;
  background-color:#fff;
  display:flex;
  flex-direction:row;
  border-radius: 3px;
}

.edit{
  border:0px;
  height:26px;
  margin:2px;
  border-radius:26px;
  /* background-color:#f0f2f5; */
  padding-left:14px;
}

.search-button{
   text-align:center; 
   width:20%;
  line-height:30px;
  font-size:14px;
}
/* 顶部搜索框-结束 */

/* 商品列表-开始 */
.goodswrap .mainwrap {
  position: relative;
  min-width: 220px;
  display: inline-block;
  vertical-align: top;
  margin:5px 5px 5px 0;
}

.goodswrap .mainwrap.mainwrap-fixed{
  margin-top: 20px;
}

.goods-item {
  padding:2%;
  width:96%;
  display:flex;
  background-color: #fff;
  margin-bottom:2%;
  height:90px;
}

.goodswrap .mainwrap .goods-item:last-child{
  margin-bottom: 40px;
}

.goods-item .goods-pic-wrap{
  display: inline-block;
  vertical-align: middle;
  width: 80px;
  position: relative;
}

.goods-item .goods-pic-wrap>image {
  width: 80px;
  height: 80px;
  border-radius: 3px;
}

.goods-item .goods-pic-wrap>.goods-empty {
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 60px;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  z-index: 99;
  display: block;
  text-align: center;
  font-size: 12px;
  height: 20px;
  line-height: 20px;
  background: rgba(1, 1, 1, 0.65);
  color: #fff;
}

.goods-item .goods-pic-wrap>.withe-mask {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 60px;
  height: 40px;
  z-index: 9;
  background: rgba(255, 255, 255, 0.3);
}

.goods-item .goods-content-wrap {
  display: inline-block;
  vertical-align: middle;
  margin-left: 5px;
}

.goods-item .goods-name {
  font-size: 14px;
  font-weight: 700;
  color: #333;
  overflow: hidden;
  text-overflow:ellipsis;
  word-break: break-all;
  display: -webkit-box;
  -webkit-box-orient: vertical;    /* 竖直方向的超出和隐藏 */
  -webkit-line-clamp: 2;    /* 设定行数为2 */
  /* width: 96%;
  line-height: 25px;
  white-space:nowrap;
  display:block; */
}

.goods-item .goods-sale {
  font-size: 12px;
  color: #fff;
  line-height: 15px;
  display: block;
}

.goods-item .godds-price-region {
  font-size: 0;
  height: 23px;
  line-height: 23px;
  float: none;
  display: inline-block;
}

.goods-item .goods-price {
  font-size: 16px;
  color: #fb4e44;
  font-weight: 700;
}

.goods-item .goods-price-region {
  display: inline-block;
}


/* 商品列表-结束 */
```

<li>js

```
// pages/order/order_detail.js
const app = getApp();
var util = require('../../../utils/util.js');
var storage = require('../../../utils/storage.js');
import cart from '../../template/cart/cart';
var index = {

  /**
   * 页面的初始数据
   */
  data: {
    width: 300,       //屏幕宽度
    goodName: '',     //搜索的商品名称
    oldGoodName: '',     //上一次搜索的商品名称
    goodsList: [],    //商品列表
    pageSize: 10,     //分页数据
    pageNo: 1,        //当前列表页码
    total: 0,         //当前商品查询结果总数
    canBusiness: false, //门店是否在营业，默认false不营业，cart.js赋值，util.js依据后台的时间判断
    hasHide: false,   //是否隐藏过
    currentTab: 1,
    cartData: {},     //购物车里的数据
    orderGoods: [],   //当前选择的下单商品
    isShowCartDialog: false, //是否显示购物车的商品
  },
  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function (options) {
    var instance = this;
    //渲染购物车
    this.renderCart();
    //判断是否营业中
    this.renderBudinessTime();
    wx.getSystemInfo({
      success: (res) => {
        instance.setData({
          height: res.windowHeight,
          width: res.windowWidth,
        });
      }
    });
  },
  /**
   * enter键搜索
   */
  quickSearch: function (e) {
    if (e.detail.value != "" || typeof (e.detail.value) == "undefined"){
      this.setData({
        goodName: e.detail.value
      })
      this.gotoSearch();
    }
  },
  /**
   * 添加商品
   */
  addGoods: function (e) {
    var instance = this;
    var goodsId = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var goods = this.data.goodsList[index];
    var goodsNum = goods.goodsNum ? goods.goodsNum : 0;
    var obj = "goodsList[" + index + "].goodsNum";
    var data = {};
    data[obj] = ++goodsNum //我们构建一个对象
    this.setData(data); //修改数据源对应的数据
    var goodsData = {
      id: goodsId,
      name: goods.goodsName,
      price: goods.promotion == 1 ? goods.promotionPrice : goods.goodsPrice,
      goodsNum: goodsNum,
      goodsImg: goods.goodsImgURL
    };
    storage.orderGoods.addData(goodsData, goodsId, function () {
      instance.renderCart();
    });
    this.changeGoodsNum(goodsId, goodsNum);
  },
  /**
   * 移除商品
   */
  removeGoods: function (e) {
    var instance = this;
    var goodsId = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var goods = this.data.goodsList[index];
    var goodsNum = goods.goodsNum ? goods.goodsNum : 0;

    var obj = "goodsList[" + index + "].goodsNum";
    var data = {};
    data[obj] = --goodsNum //我们构建一个对象
    this.setData(data); //修改数据源对应的数据

    if (goodsNum > 0) {
      var goodsData = {
        id: goodsId,
        name: goods.goodsName,
        price: goods.promotion == 1 ? goods.promotionPrice : goods.goodsPrice,
        goodsNum: goodsNum,
        goodsImg: goods.goodsImgURL
      };
      storage.orderGoods.addData(goodsData, goodsId, function () {
        instance.renderCart();
      });
    } else {
      storage.orderGoods.removeData(goodsId, function () {
        instance.renderCart();
      });
    }
    this.changeGoodsNum(goodsId, goodsNum);
  },
  /**
   * 向后台请求
   */
  gotoSearch: function () {
    var goodsName = this.data.goodName; //'果';
    var flag=true;//默认要请求
    //搜索框不能为空
    if (!goodsName || goodsName == "" || typeof (goodsName) == "undefined" ) {
      flag=false;
    }
    //获取查询页数
    var pageNo = 1;
    var goodsList = this.data.goodsList;
    if (this.data.oldGoodName != goodsName && this.data.oldGoodName != "" ) {
      //查询商品名称不同了
      goodsList = [];
    }
    if (goodsList.length > 0) {
      var currentNum = goodsList.length; //目前该分类下加载的商品数
      if (currentNum < this.data.total) {
        pageNo = Math.ceil(currentNum / this.data.pageSize) + 1; //下一页页码
      } else {
        flag = false;
      }
    }
    if (flag){
      var instance = this;
      instance.setData({
        oldGoodName: goodsName,
      });
      wx.request({
        url: app.globalData.baseURL + '\listGoods.do?callback=callback',
        method: "post",
        data: { params: goodsName, pageNo: pageNo, perPageSize: instance.data.pageSize },
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          var data = util.parseJSON(res.data).bean;
          goodsList = goodsList.concat(data.rows); //两个数组合并不能直接push
          instance.renderGoodList(goodsList);
          instance.setData({
            total: data.total,
          });
        },
      });
    }
  },
  /**
   * 渲染商品数量
   * 若商品列表做成模板，可考虑抽取到template中
   */
  renderGoodList: function (goodsList) {
    var instance = this;
    if (goodsList.length > 0) {
      storage.orderGoods.getData(null, function (orderGoods) {
        if (orderGoods) {
          for (var i in goodsList) {
            var id = goodsList[i].goodsId;
            if (orderGoods.hasOwnProperty(id)) {
              goodsList[i].goodsNum = orderGoods[id].goodsNum;
            }
          }
        } else {
          for (var i in goodsList) {
            goodsList[i].goodsNum = 0;
          }
        }
        instance.setData({goodsList: goodsList,})
      });
    } else {
      this.setData({goodsList: []})
    }
  },
  /**
   * 商品名称-input框
   */
  bindNameInput: function (e) {
    this.setData({
      goodName: e.detail.value
    })
  },
  /**
  * 商品详情
  */
  goodsDetail: function (e) {
    var goodsNum = e.currentTarget.dataset.num ? e.currentTarget.dataset.num : 0;
    wx.navigateTo({
      url: "/pages/goods/goods?goodsId=" + e.currentTarget.dataset.id + "&goodsNum=" + goodsNum
    })
  },
  /**
   * 挑转其他页面
   */
  onHide: function () {
    this.setData({
      hasHide: true
    })
  },
    /**
   * 从其他页面回来
   */
  onShow: function () {
    //
    if (this.data.hasHide) {
      this.renderGoodList(this.data.goodsList);
      //渲染购物车
      this.renderCart();
    }
  },
  /**
    *  缓存的商品数量更改后，把页面的goodsNum也更改一下
    *  购物车的删除商品-按钮
    *  从cart.js调用
    */
  changeGoodsNum: function (goodsId, goodsNum) {
    var goodsList = this.data.goodsList;
    if (goodsList) {
      for (var i in goodsList) {
        if (goodsList[i].goodsId == goodsId) {
          goodsList[i].goodsNum = goodsNum;
          break;
        }
      }
      this.setData({ goodsList: goodsList });
    }
  },
  /**
   * 清空购物车数量的具体实现
   * 从cart.js调用
   */
  changeGoodsNumToZero: function () {
    //商品列表
    var goodsList = this.data.goodsList;
    for (var key in goodsList) {
      goodsList[key].goodsNum = 0;
    }
    this.setData({
      goodsList: goodsList,
    });
  },
}

for (var key in cart) {
  index[key] = cart[key];
}

Page(index);
```
