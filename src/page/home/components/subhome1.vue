<template>
	<div class="subhome">
		<swiper :banner = "list[1]" v-if="list[1]!==undefined"></swiper>
			<div class="b">
				<a  class="item">
	                <div class="text">
		                <div class="left" >
		                	<p class="title">9块9包邮</p>
		                	<p class="subTitle">每日白菜</p>
		                </div>
	                	<div class="m-pic">
	                		<img src="http://ms1.sqkb.com/dist/image/index/index-k9-man-e270a9a54c.jpg" alt="">
	                	</div>
	                </div>
	                
	            </a>
	            <a  class="item">
	                <div class="text" >
		                <div class="left">
		                	<p class="title">排行榜</p>
		                	<p class="subTitle">热卖&nbsp爆款</p>
		                </div>
	                  <div class="m-pic">
	                      <img src="http://ms1.sqkb.com/dist/image/index/index-rank-man-b6eb62a2d5.jpg" alt="">
	                    </div>
	                </div>
	            </a>	
			</div>
			<div class="c">
		            <div class="rank-shop" v-for="item of list[2]" v-if="list[2]!==undefined">
		              <div class="shop-left">
		              <img :src="item.pic" alt="">
		              </div>
		              <div class="shop-right">
		                <p class="title" >{{item.title}}</p>
		                <p class="detail">低价抢购</p>
		                <span class="iconfont" @click="addcart(item)">&#xe611;</span>
		                <div class="m-price">
		                  <span>原价¥{{item.coupon_info.raw_price}}</span>
		                  <span class="sold">月销{{item.coupon_info.month_sales|sale}}件</span>
		                </div>
		                <div class="b-price">
		                  <span class="quan-hou-icon"></span>
		                  <span class="price">¥{{item.coupon_info.zk_price}}</span>
		                  <span class="quan" v-if="item.coupon_info.ticket">{{item.coupon_info.ticket.coupon_price}}元券</span>
                  <span class="quan" v-else>{{item.coupon_info.discount}}折</span>
		                </div>
		                
		              </div>
		            </div>
			</div>
			
	</div>
</template>
<script type="">
import swiper from './swiper'
import Bus from '@/assets/js/bus.js'
import {mapMutations} from 'vuex'
export default {
	props:{
		list:Array
	},
	data (){
		return {
		}
	},
	components:{
		swiper
	},
	created(){
		
	},
	mounted(){
	},
	methods:{
		...mapMutations(['addGoods']),
		addcart(item){
			var idExist=this.$store.state.goodsList.find((list)=>{
					return item.topic_id==list.id
				})
			if(!idExist){
				var data={
					title:item.title,
					zk_price:item.coupon_info.zk_price,
					raw_price:item.coupon_info.raw_price,
					number:1,
					select:false,
					id:item.topic_id,
					pic:item.pic,
					select:true
				}
				this.addGoods(data)
			}else{
			    return alert("已加入购物车")
			}
		},
		getuser(){
			let ssp = sessionStorage.phone
				if(ssp){
					this.phone = ssp
				}else{
					this.$emit('watchChild')					
				}
		}
	},
  	filters:{
        sale:function(myInput,arg1){
            var result = myInput>10000?((myInput)/10000).toFixed(2)+"万":myInput
            return result;
        }
    }

}
</script>
<style lang="stylus" scoped>
	.b
		display:flex
		.text
			border:1px solid #eee
			border-top:none
			border-bottom:5px solid #eee
			height:1.9rem
			display:flex
			.left
				width:100%
				text-align:center
				.title
					padding-top:.3rem
					padding-bottom:.2rem
					font-size:.36rem
					color:#ff4900
				.subTitle
					font-size:.24rem
					color:#402933
			.m-pic
				width:100%
				height:1.8rem
				img
					background: center no-repeat
					background-size: cover
					width:80%
					height:100%
	.c
		.rank-shop
			height:2.5rem
			border-bottom:2px solid #f8f8f8
			position: relative
			padding-bottom: .1rem
			.shop-left
				width:33.3%
				height:100%
				float:left
				img
					background:center no-repeat
					background-size:cover
					width:100%
					height:100%
			.shop-right
				width:64.6%
				height:100%
				float:left
				padding:0 1%
				.title
					margin:.2rem 0
					font-weight:500
					font-size:.3rem
					color:#000
					display: -webkit-box;
					-webkit-box-orient: vertical
					-webkit-line-clamp: 2
					overflow: hidden
				.detail
					color:red
					font-size:.22rem
				.m-price 
					color:#999
					margin:10px 0
					span
						font-size:.22rem
					span.sold
						margin-left:1rem
				.b-price
					position:absolute
					bottom:.1rem
					width:60%
					.quan-hou-icon
						background:url(http://ms1.sqkb.com/dist/image/before/small_quan_hou-928357dceb.png) center no-repeat
						width: 0.8rem
						height: 0.3rem
						float: left
						background-size:.7rem .3rem
					.price
						color:#ff4e02
						font-size:.4rem
						font-weight:900
					.quan
						position:absolute
						right:0
						bottom:0
						font-size: .24rem
						height:.44rem
						line-height:.44rem
						background: url(http://ms1.sqkb.com/dist/image/before/quan_bg-1748afdb99.png) center no-repeat
						background-size:1.3rem .4rem
						width: 1.4rem
						color: #fff
						text-align: center
				.iconfont
					float:right
					margin-right:.6rem
					font-size:.6rem
					color:red

</style>