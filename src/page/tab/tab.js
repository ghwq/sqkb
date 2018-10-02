<template>
	<div class="tab">
		<ul>
		<router-link :to="{name:'Home'}" tag="li" exact> 
		    <div> 
		     <i class="iconfont ">&#xe62e;</i> 
		    </div>
		    <div>主页</div> 
		</router-link>
		<router-link :to="{name:'Cart'}" tag="li"> 
		    <div><sup class="el-badge__content is-fixed" style="" v-if="goodsNumber>0">{{goodsNumber}}</sup> 
		     <i class="iconfont ">&#xe611;</i> 
		    </div> 
		    <div>购物车</div>
		    
		</router-link>
		</ul>
	</div>
</template>
<script>
import Home from '@/page/home/home'
import Cart from '@/page/cart/cart'
import { mapGetters } from 'vuex'
	export default {
		computed:{
			...mapGetters(["goodsNumber"])
		}
	}
</script>
<style lang="stylus" scoped>
.active
	color: #D0021B
.tab
	position:fixed
	bottom:0
	left:0
	width:100%
	background-color: #fff
	box-shadow: 0 0px 10px #5d5b5b
	z-index:1001
	ul
		display:table
		width:100%
		li
			text-align: center
			font-size: 16px
			display: table-cell
			padding: 8px 12px
			cursor: pointer
			div
				font-size:.3rem
				position:relative
				i
					font-size.6rem


</style>
