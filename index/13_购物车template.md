<li>关于模板引用可参考商品列表竖向滚动.md

<li>WXML

```
<!-- 引用template时必传的变量：...cartData,canBusiness,orderGoods,isShowCartDialog,width,currentTab -->
<!-- 其中...cartData 可直接使用里面的属性，不必通过.获取相应的属性 -->

<!-- 购物车template -->
<template name="cart">
  <!-- cart -->
  <view class="cart {{currentTab == 1?'':'hide'}}">
    <view class="cart-icon" bindtap='loadCartGoods'>
      <image class="ico-cart" src="{{goodsNum>0?'/pages/theme/images/cart.png':'/pages/theme/images/emptyCart.png'}}"></image>
      <text class="cart-num {{goodsNum>0?'':'hide'}}">{{goodsNum}}</text>
    </view>
    <view class="cart-tips">
      <view class="cart-noempty {{goodsNum>0?'':'hide'}}">
        <text class="cart-price {{short!=null&&short>0?'line-height-32':''}}">￥{{totalPrice}}</text>
        <text class="cart-origin {{short!=null&&short>0?'':'hide'}}">还差{{short}}元才可以配送！</text>
      </view>
			<view class="cart-empty {{goodsNum>0?'hide':''}}">购物车还是空空的哦~</view>
    </view>
    <view class="cart-btns">
      <!-- 是否有选商品，是否有配送金额的限制，是否达到配送金额 -->
			<button wx:if="{{ canBusiness && goodsNum>0 && !(short!=null&&short>0)}}" open-type="getUserInfo" bindgetuserinfo="bindGetUserInfo" class="submit-order" bindtap='loadOrderForm'>去下单</button>
      <button wx:else class="submit-order" style="background-color:#DFDFDF;font-weight:400;">去下单</button>
			<!-- <view wx:if="{{ canBusiness && goodsNum>0 && !(short!=null&&short>0)}}" class="submit-order" bindtap='loadOrderForm'>去下单</view>
      <view wx:else class="submit-order" style="background-color:#DFDFDF;font-weight:400;">去下单</view> -->
		</view>
  </view>
  <!-- cart dialog -->
  <view class="cart-dialog {{isShowCartDialog&&goodsNum>0?'':'hide'}}">
		<view class="remove-all" bindtap='removeAllGoods'>清空购物车</view>
    <scroll-view class="cart-list" scroll-y>
      <view class="goods-info" wx:for="{{orderGoods}}" wx:key="id" data-id="{{item.id}}">
        <text class="goods-name inline-block" style="width:{{width-140}}px">{{item.name}}</text>	
	    	<text class="goods-price inline-block">￥{{item.price}}</text>
        <!-- goods operation -->
				<view class="goods-operation inline-block">
						<view class="add-goods" bindtap='addCartGoods' data-id="{{item.id}}" data-num="{{item.goodsNum}}">
							<image class='icon i-add-goods' src="/pages/theme/images/add.png"></image>
						</view>
						<text class="goodsop-num">{{item.goodsNum}}</text>
            <view class="remove-goods" bindtap='removeCartGoods' data-id="{{item.id}}" data-num="{{item.goodsNum}}">
							<image class="icon i-remove-goods" src="/pages/theme/images/remove.png"></image>
						</view>
				</view>
        <!-- end goods operation -->
    	</view>
    </scroll-view>
	</view>
  <!-- mask -->
  <view class="mask {{isShowCartDialog&&goodsNum>0?'':'hide'}}" bindtap='tapMask'></view>
</template>
```

<li>js

```
// 引用模板的js页面需要实现 changeGoodsNumToZero 和 changeGoodsNum 方法
// 引用模板的js 的data：currendTab=1，可写死在页面上面

const app = getApp();
var storage = require('../../../utils/storage.js');
var util = require('../../../utils/util.js');
var cartEvent = {
  /**
   * 打开提交订单form
   */
  loadOrderForm: function (e) {
    if (app.globalData.userInfo && app.globalData.userInfo.phone) {
      wx.navigateTo({
        url: "/pages/order/order"
      })
    } else {
      app.globalData.nextPage = "/pages/order/order";
      wx.navigateTo({
        url: "/pages/login/login"
      })
    }
  },
  /**
   * 购物车商品添加
   */
  addCartGoods: function (e) {
    var instance = this;
    var goodsId = e.currentTarget.dataset.id;
    var goodsNum = parseInt(e.currentTarget.dataset.num) + 1;
    storage.orderGoods.getData(goodsId, function (data) {
      data.goodsNum = goodsNum;
      storage.orderGoods.addData(data, goodsId, function () {
        instance.renderCart();
      });
    });
    // 由实际业务页面js去实现
    if (this.changeGoodsNum instanceof Function) {
      this.changeGoodsNum(goodsId, goodsNum);
    }
  },
  /**
   * 购物车商品删除
   */
  removeCartGoods: function (e) {
    var instance = this;
    var goodsId = e.currentTarget.dataset.id;
    var goodsNum = parseInt(e.currentTarget.dataset.num) - 1;
    if (goodsNum <= 0) {
      goodsNum = 0;
      storage.orderGoods.removeData(goodsId, function () {
        instance.renderCart();
      });
    } else {
      storage.orderGoods.getData(goodsId, function (data) {
        data.goodsNum = goodsNum;
        storage.orderGoods.addData(data, goodsId, function () {
          instance.renderCart();
        });
      });
    }
    // 由实际业务页面js去实现
    if (this.changeGoodsNum instanceof Function) {
      this.changeGoodsNum(goodsId, goodsNum);
    }
  },
  /**
   * 清除购物车的所有商品
   */
  removeAllGoods: function (e) {
    var instance = this;
    storage.orderGoods.removeData(null, function () {
      if (instance.changeGoodsNumToZero instanceof Function) {
        instance.changeGoodsNumToZero();
      }
      instance.setData({
        goodsNum: 0, //用于清除商品页面的商品数量
        isShowCartDialog: false
      });
      instance.renderCart();
    });
  },
  /**
   * 渲染购物车
   */
  renderCart: function (callback) {
    var instance = this;
    storage.orderGoods.getData(null, function (orderGoods) {
      var goodsNum = 0;
      var totalPrice = 0;
      var goodsList = [];
      if (orderGoods) {
        for (var key in orderGoods) {
          var data = orderGoods[key];
          if (data.goodsNum){
            goodsList.push(data)
            goodsNum = goodsNum + parseInt(data.goodsNum);
            totalPrice = util.numberUtil.add(totalPrice, util.numberUtil.mul(parseFloat(data.price), parseInt(data.goodsNum)));
          }
        }
      }
      if (app.globalData.shop && app.globalData.shop.isLimit && app.globalData.shop.limitMoney) {
        var short = util.numberUtil.sub(app.globalData.shop.limitMoney, totalPrice);
        instance.setData({
          cartData: { goodsNum: goodsNum, totalPrice: totalPrice, short: short },
          orderGoods: goodsList
        });
      } else {
        instance.setData({
          cartData: { goodsNum: goodsNum, totalPrice: totalPrice },
          orderGoods: goodsList
        });
      }
      if (callback && typeof (callback) == "function"){
        callback(goodsList);
      }
    });
  },
  /**
   * 显示购物车的商品信息
   */
  loadCartGoods: function (e) {
    if (this.data.cartData && this.data.cartData.goodsNum > 0 && !this.data.isShowCartDialog) {
      this.setData({
        isShowCartDialog: true
      })
    } else {
      this.setData({
        isShowCartDialog: false
      })
    }
  },
  /**
   * 点击遮罩层
   */
  tapMask: function (e) {
    this.setData({
      isShowCartDialog: false
    })
  }
}

export default cartEvent;
```

<li>WXSS

```
.hide {
  display: none !important;
}

.cart {
  height: 50px;
  position: fixed;
  bottom: 0px;
  width:100%;
  z-index:4;
  background:#fff;
}

.cart-icon {
  display: inline-block;
  vertical-align: middle;
}

.cart-tips {
  display: inline-block;
  vertical-align: middle;
}

.cart-btns {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
}

.cart-btns>.submit-order {
  background-color: #ffd161;
  color: #333;
  font-weight: 700;
  width: 100px;
  display: block;
  height: 50px;
  text-align: center;
  line-height: 50px;
}

.cart-icon {
    position: relative;
    top: -12px;
    left: 12px;
    margin-right: 20px;
}

.cart-num {
    border-radius: 50% 50%;
    background-color: #ff6900;
    width: 18px;
    height: 18px;
    line-height: 18px;
    font-size: 12px;
    text-align: center;
    position: absolute;
    top: 2px;
    right: 0;
    color: #fff;
}

.cart-empty {
  line-height: 50px;
  font-size: 13px;
  color: #888;
}

.cart-noempty {
  height:50px;
}

.cart-price{
  line-height: 40px;
  color: #333;
  font-weight: 700;
  font-size: 18px;
}

.ico-cart {
  display: block;
  width: 50px;
  height: 57px;
}

.line-height-32{
  line-height: 25px;
}

.cart-origin{
  font-size: 11px;
  color: #666;
  display: block;
}

.cart-dialog {
    position: fixed;
    bottom: 50px;
    left: 0px;
    width: 100%;
    z-index: 3;
    background-color: white;
}

.cart-dialog .remove-all {
    height: 30px;
    line-height: 30px;
    text-align: right;
    background: #f4f4f4;
    padding: 0 5px;
    font-size: 12px;
}

.cart-dialog  .cart-list .goods-info{
    position: relative;
    padding:10px 0px;
    border-bottom: 1px solid #f4f4f4;
    width: 100%;
    font-size: 13px;
}

.cart-dialog  .cart-list .goods-name {
    margin-left: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.cart-dialog  .cart-list .goods-price {
    vertical-align: middle;
}

.cart-dialog  .cart-list .goodsop-num{
  line-height: 23px;
}

.cart-list{
    height:220px;
}
.goods-operation {
  display: inline-block;
  position: absolute;
  right: 5px;
}

.add-goods {
  text-align: left;
}

.add-goods, .remove-goods {
  float: right;
}

.remove-goods {
  right: 58px;
}

.i-add-goods {
  width: 23px;
  height: 23px;
}

.i-remove-goods {
  width: 23px;
  height: 23px;
}

.goodsop-num{
  float:right;
  min-width:20px;
  text-align:center;
  font-size:16px;
}

.mask {
    position: fixed;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.35);
}

.inline-block {
    display: inline-block;
    vertical-align: middle;
}

```
