<template>
	<div class="cart">
		<div class="title">购物车</div>
		<div class="wrapper" ref="bscroll">
			<div class="item-wrapper">
				<div class="no-goods" v-if="goodsList==''">购物车空无一物，赶紧逛逛吧...</div>
					<div class="item-goods" v-for="item of goodsList">
						<i class="el-icon-delete del" @click="del(item.id)"></i>
						<div class="goods-img">
						<el-checkbox label="" class="cbox" :checked="true" @change="toggleSelect(item.id)"></el-checkbox>
							<img :src="item.pic" alt="">
					</div>
					<div class="goods-content">
						<span class="g-title">{{item.title}}</span>
						<p class="g-price1">原价¥{{item.raw_price}}</p>
						<p class="g-price2">¥<em>{{item.zk_price}}</em></p>
						<el-input-number class="input-number" v-model="item.number" @change="changeNumber(item.id,$event)" :min="1" :max="10" size="small" ></el-input-number>
					</div>
				</div>
			</div>
		</div>
		<div class="pay">
			<div class="clear" @click="clearGoods()">清空购物车</div>
			<div class="total">合计:<span>¥{{totalPrice}}</span></div>
			<div class="go-pay">去结算</div>
		</div>
	</div>
</template>
<script >
import BScroll from "better-scroll"
import { mapState,mapMutations,mapGetters } from 'vuex'
export default {
	name:'Cart',
	data() {
      return {
      };
    },
    computed:{
		...mapState(['goodsList']),
		...mapGetters(["totalPrice"])
	},
    methods: {
    	...mapMutations(['deleteGoods','updateGoods','clearGoods']),
    	findPosition(id){
		      return this.goodsList.findIndex(item=>{
		          return item.id==id
		       })
		 },
    	del(id){
		    var i=this.findPosition(id);
		    this.deleteGoods(i)
		},
		toggleSelect(id){
		     var i=this.findPosition(id);
		     var select=this.goodsList[i].select;
		     this.$store.commit("updateGoods",{
		          index:i,
		          key:"select",
		          value:!select
		     });          
		},
		changeNumber(id,val){
		      var i=this.findPosition(id)
		        this.updateGoods({
		            index:i,
		            key:"number",
		            value:val
		       })
		  }
	},
	mounted(){
	    this.$nextTick(() => {
	        let bscrollDom = this.$refs.bscroll;
	        this.aBScroll = new BScroll(bscrollDom,{click: true})
		    }) 
		}
}
</script>
<style lang="stylus" scoped>
.cart
	.title
		height:.8rem
		font-size:.4rem
		position:fixed
		top:0
		left:0
		width:100%
		background:white
		text-align:center
		line-height:.8rem
		font-weight:800
		z-index:1000
		box-shadow: 0 1px 20px #eee
	.wrapper
		width: 100%;
		height: 650px;
		overflow: hidden;
		.item-wrapper
			padding:.9rem 0 1rem
			.no-goods
				text-align:center
				padding-top:40%
			.item-goods
				position:relative
				border-bottom:1px solid #eee
				padding:.3rem
				display:flex
				flex-direction: row
				i.del
					position:absolute
					right:.2rem
					font-size:.4rem
					top:0
					color:red
				.goods-img
					width:2rem
					height:2rem
					position:relative
					.cbox
						position:absolute
						left:0
						top:0
					img
						background-size:cover
						background: center no-repeat
						width:100%
						height:100%
				.goods-content
					position:relative
					width:70%
					padding:.15rem
					.g-title
						font-size:.34rem
					.g-price1
						position:absolute
						bottom:.8rem
						text-decoration:line-through
						line-height:.5rem
					.g-price2
						position:absolute
						bottom:.1rem
						color:red
						em
							font-size:.5rem
					.input-number
						position:absolute
						bottom:.3rem
						right:.2rem
	.pay
		position:fixed
		bottom:1.2rem
		background-color:#eee
		line-height:1rem
		width:100%
		display:flex
		flex-direction:row
		z-index:1000
		.clear
			min-width:20%
			float:left
			background-color:green
			color:white
			text-align:center
		.total
			flex:1
			font-size:.4rem
			span
				font-weight:700
		.go-pay
			min-width:30%
			float:right
			background-color:red
			text-align:center
			color:white
			font-size:.35rem
</style>
