#### scroll-view 竖向滚动，横向3个商品居中等间隔显示

<li>hhhhh<li> 

## WXML

  <!-- 促销商品列表 -->
  <view class='active-view'>
        <scroll-view scroll-y='true' style="padding-left: 2.5%;">
          <view wx:for="{{activeList}}" wx:key="id" id="{{item.id}}" class="recomm-tag">
            <image src="{{item.goodsImgURL}}" mode='aspectFill' binderror="errImg" data-errorimg="{{index}}" bindtap='goodsDetail' data-id="{{item.goodsId}}" data-num="{{item.goodsNum}}"></image>
            <view class="recomm-goods-name">{{item.goodsName}}</view>
            <view class='recomm-goods-cont'>
              <view class="recomm-goods-price">¥{{item.goodsPrice}}</view>
              <view class="btn-comm {{item.goodsNum>0?'':'hide'}}" bindtap='removeRecommendGoods' data-index="{{index}}" data-id="{{item.goodsId}}" data-num="{{item.goodsNum==null?0:item.goodsNum}}">
                <image class="icon i-recomm" src="/pages/theme/images/remove.png"></image>
              </view>
              <text class="goodsop-num {{item.goodsNum>0?'':'hide'}}" data-num="{{item.goodsNum==null?0:item.goodsNum}}">{{item.goodsNum==null?0:item.goodsNum}}</text>
              <view class="btn-comm" bindtap='addRecommendGoods' data-index="{{index}}" data-id="{{item.goodsId}}" data-num="{{item.goodsNum==null?0:item.goodsNum}}" data-name="{{item.goodsName}}" data-price="{{item.promotion == 1?item.promotionPrice:item.goodsPrice}}">
                <image class='icon i-recomm' src="/pages/theme/images/add.png"></image>
              </view>
            </view>
          </view>
        </scroll-view>
  </view>
  
  ## WXSS
  
  .active-view{
  margin-top: 2%;
  background-color: #fff;
  font-size: 14px;
}

.recomm-tag{
  width:30%;
  height:160px;
  display:inline-block;
  margin-right:2.5%;
}

.active-view .recomm-tag>image {
  width: 100px;
  height: 100px;
  border-radius: 3px;
  margin:0 10px;
}
.recomm-goods-name{
  line-height: 25px;
  font-weight:700;
  color:#333;
  text-align:left;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  margin:0 5px;
}

.recomm-goods-cont{
  line-height: 25px;
  display: flex;
  margin:5px;
}

.recomm-goods-price{
  flex: 1;
  color: #fb4e44;
}

.i-recomm{
  width:20px;
  height:20px;
}

.btn-comm{
  margin-top:2px;
}
  
