<template>
	<div class="subhome">
	<div>
		<div class="category" >
			<div class="cate-img" v-for="item of list[0]" ><!-- v-if="list[0] !=undefined" -->
				<img :src="item.pic" alt="">
				<p class="cate-name">{{item.title}}</p>
			</div>
		</div>

		<div class="content">
			<div class="good" v-for="item of list[1]" :key="item.coupon_id">
				<img :src="item.thumbnail_pic" alt="">
					<div class="good-info">
						<div class="good-info-title">
							<p class="free-shipping"></p>
							<p class="title">{{item.title}}</p>
						</div>
						<div class="good-info-price">
							<span>原价¥{{item.raw_price}}</span>
							<span>月销{{item.month_sales|sale}}</span>
		                	<span class="iconfont" @touchstart="addCart(item)">&#xe611;</span>
						</div>
						<div class="good-info-coupon">
							<p class="coupon-price">券后¥<em class="sell-price">{{item.zk_price}}</em></p>
							<span class="quan" v-if="item.ticket">{{item.ticket.coupon_price}}元券</span>
							<span class="quan" v-else>{{item.discount}}折</span>
						</div>
					</div>
			</div>
			<div class="load" v-loading="loading"></div>
		</div>
		</div>
	</div>
</template>
<script type="">
import {mapMutations,mapActions} from 'vuex'
export default {
	props:{
		list:Array,
		loading:Boolean
	},
	data () {
		return {
		}
	},
	computed:{
		sale:function(){

		}
	},
	mounted () {
  	},
  	methods:{
		...mapActions(['addCart'])
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
	.subhome
		.category
			display:flex
			flex-wrap:wrap
			flex-direction:row
			border-bottom: 0.1rem solid #eee
			.cate-img
				width:25%
				text-align:center
				padding:.25rem 0
				img
					background:center no-repeat
					background-size:cover
					width:1rem
					display: inline-block
					height: 1rem
				.cate-name
					text-align:center
					color:red
		.content
			width:100%
			display:flex
			flex-wrap:wrap
			background:#eee
			.good
				width:49%
				height:5rem
				margin-bottom:.2rem
				background:white
				position:relative
			.good:nth-child(2n+1)
				margin-right:2%
			img
				background:center no-repeat
				background-size:cover
				width:100%
				height:3.2rem
			.good-info
				height:1.8rem
				padding:0.1rem .15rem 0
				.good-info-title
					.free-shipping
						background:url(http://ms1.sqkb.com/dist/image/before/free-icon2-80ce515b49.png) center no-repeat
						float:left
						height:.3rem
						width:.5rem
						background-size:100% auto
					.title
						padding:0px 5px
						font-size:.26rem
						text-align:left
						color:#000
						display:-webkit-box
						-webkit-box-orient: vertical
						-webkit-line-clamp: 2
						overflow: hidden
				.good-info-price
					position:absolute
					bottom:.75rem
					width:90%
					color:#999
					margin: 5px 0
					height: .28rem
					span
						font-size:.22rem
						float:left
					span.iconfont
						color:red
						float:right
						font-size:.5rem
				.good-info-coupon
					position:absolute
					bottom:.1rem
					width:90%
					.coupon-price
						color:#fb0505
						float:left
						font-size:.2rem
						em
							font-weight:800
							font-size:.4rem
							margin-left:.1rem
					.quan
						float: right
						font-size: .24rem
						height:.44rem
						line-height:.44rem
						background: url(http://ms1.sqkb.com/dist/image/before/quan_bg-1748afdb99.png) center no-repeat
						background-size:1.3rem .4rem
						width: 1.4rem
						color: #fff
						text-align: center
			.load
				padding-top:2rem
				width: 100%
</style>